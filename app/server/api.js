import express from 'express';
import cors from 'cors';

import admin from 'firebase-admin';
import serviceAccount from './firebase/project-book1008-1-firebase.json' with { type: 'json'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

app.use('/public', express.static('public'));

//Get data from Books collection
async function fetchDataDB() {
    const result = [];
    const booksRef = db.collection('Menu');
    const booksSnap = await booksRef.get();
    booksSnap.forEach(doc => {
        result.push({
         id: doc.id,
         ...doc.data()
      });
    });
    return result; //JSON.stringify(result)
}

// http://localhost:3000/api/getBooksFromDB
app.get('/api/getBooksFromDB', (req, res) => {
    res.set('Content-type', 'application/json');
    fetchDataDB().then((jsonData) => {
        res.json(jsonData);
    }).catch((error) => {
        res.json(error);
    });
});

// Object array ---> Database (JSON)
let books = [
    { id: 1, title: "Web Technology", author: "Beritokai 1"},
    { id: 2, title: "Network IT", author: "ต้องใจ แย้มผกา"},
];

// http://localhost:3000
app.get('/', (req, res) =>{
    res.send('Hello World!')
})

async function addBook(bookData) {
  const newBookRef = db.collection('Menu').doc();
  const docRef = db.collection('Menu').doc(newBookRef.id);
  await docRef.set(bookData); // let bookObj = {_bookData, bookId: newBookRef.id}
  console.log('Book added!'); // ทดสอบการทำงานฟังก์ชัน
}

app.post('/api/insert', (req, res) => {
  try {
    const { bookImage, bookName, bookAuthor, bookPrice, category } = req.body;
    console.log(bookImage, bookName, bookAuthor, bookPrice, category);
    const newBook = { bookImage, bookName, bookAuthor, bookPrice, category };
    // books.push(newBook);
    addBook(newBook);
    res.status(201).json({ success: true, message: 'Form submitted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

async function fetchOneBook(bookId) {
  const result = [];
  const booksRef = db.collection('Menu');
  const snapshot = await booksRef.get();
  snapshot.forEach(doc => {
    if (doc.id === bookId) {
      result.push({
        id: doc.id,
        ...doc.data()
      });
    }
  });
  return result;
}

app.get('/api/getOneBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.set('Content-Type', 'application/json');
  fetchOneBook(bookId).then((jsonData) => {
    res.status(200).json(jsonData[0]);
  }).catch((error) => {
    res.send({ success: false, message: error.message });
  });
});

async function updateBook(bookId, bookData) {
  const docRef = db.collection('Menu').doc(bookId);
  await docRef.update(bookData);
}

app.post('/api/updateBook', (req, res) => {
  try {
    const { bookId, bookImage, bookName, bookAuthor, bookPrice, category } = req.body;
    console.log("Update Data: ", bookId, bookImage, bookName, bookAuthor, bookPrice, category);
    updateBook(bookId, { bookImage, bookName, bookAuthor, bookPrice, category });
    res.status(200).json({ success: true, message: 'Book updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

async function deleteBook(bookId) {
  const docRef = db.collection('Menu').doc(bookId);
  await docRef.delete();
}
 
// URL: http://localhost:3000/api/deleteBook/xxx
app.delete('/api/deleteBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  deleteBook(bookId);
  res.status(200).json({ success: true, message: 'Book deleted successfully.' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})