import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";

export default function EditBook() {
    const [inputId, setInputId] = useState(0);
    const [inputImage, setInputImage] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");
    const [inputPrice, setInputPrice] = useState(0);
    const [inputCategory, setInputCategory] = useState("");
    let navigate = useNavigate();
    
    const { bookId } = useParams();

    useEffect(() => {
  const fetchData = async () => {
    try {
      const resBook = await fetch(`http://localhost:3000/api/getOneBook/${bookId}`);

      if (!resBook.ok) {
        alert("API returned an error: " + resBook.status);
        return;
      }

      // ถ้า response ไม่มีเนื้อหาเลย จะไม่พัง
      const text = await resBook.text();
      if (!text) {
        alert("API returned empty response");
        return;
      }

      const data = JSON.parse(text); // แปลงเป็น JSON เอง
      setInputId(data.id);
      setInputImage(data.bookImage);
      setInputName(data.bookName);
      setInputAuthor(data.bookAuthor);
      setInputPrice(data.bookPrice);
      setInputCategory(data.category);

    } catch (error) {
      alert("Error fetching data: " + error);
    }
  };
  fetchData();
}, []);

const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const resAddBook = await fetch('http://localhost:3000/api/updateBook', 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ bookId: inputId, bookImage: inputImage, bookName: inputName, bookAuthor: inputAuthor, bookPrice: inputPrice, category: inputCategory })
            }
        );
        const result = await resAddBook.json();
        alert('Update book ID: ' + result.message);
        navigate('/books/home');
        } catch (error) {
            alert('Error submitting data: ' + error);
        }
    };
    return (
        <>
        <form onSubmit={handleSubmit} className="p-5">
            <label>แก้ไข้ข้อมูลหนังสือ</label><br />
            <input type="hidden" value={inputId}/>
            <label>รูปภาพ</label>
            <input type="text" 
            value={inputImage}
            onChange={(e) => setInputImage(e.target.value)}
            className ="border"
            /><br />
            <label>ชื่อหนังสือ</label>
            <input type="text" 
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className ="border"
            /><br />
            <label>ชื่อผู้แต่ง</label>
            <input type="text" 
            value={inputAuthor}
            onChange={(e) => setInputAuthor(e.target.value)}
            className ="border"
            /><br />
            <label>ราคา</label>
            <input type="number" 
            value={inputPrice}
            onChange={(e) => setInputPrice(Number(e.target.value))}
            className ="border"
            /><br />
             <label>ประเภท</label>
            <input type="text" 
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
            className ="border"
            /><br />
            <button type="submit" className="border p-2 bg-blue-300">Update Book</button>
        </form><br />
        <Link to="/books/home" className="bg-yellow-100 p-2 ms-2 ms-2">Back</Link>
        </>
    );
}