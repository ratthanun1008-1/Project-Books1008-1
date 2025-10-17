import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function AddBook() {
    const [inputImage, setInputImage] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");
    const [inputPrice, setInputPrice] = useState(0);
    const [inputCategory, setInputCategory] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        // alert('Title: ${inputTitle}, Author: ${inputAuthor}');
        e.preventDefault();
        try {
            //Add a new book APIs
            const resAddBook = await fetch('http://localhost:3000/api/insert', 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ bookImage: inputImage, bookName: inputName, bookAuthor: inputAuthor, bookPrice: inputPrice, category: inputCategory })
            }
        );
        const result = await resAddBook.json();
        alert('Add a new book: ' + result.message);
        navigate('/books/home');
        } catch (error) {
            alert('Error submitting data: ' + error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
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
            <Link to="/books/home" className="hover:bg-green-100 py-2 px-4 rounded mx-1">Home</Link>
            <button type="submit" className="border p-2 bg-blue-300">Add Book</button>
        </form>
    );
}