import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
 
export default function ViewBook () {
  const { bookId } = useParams();
  const [relStatus, setStatus] = useState(true);
  const [bookData, setBookData] = useState({});
 
  useEffect(() => {
    if(relStatus){
      try {
          const fetchData = async () => {
            const data = await fetch(`http://localhost:3000/api/getOneBook/${bookId}`);
            if (data.ok) {
              const json = await data.json();
              setBookData(json);
            } else {
              alert('Failed to loaded data.');
            }
          }
 
          fetchData().catch(console.error);
        } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading the data.');
        }
        setStatus(false);
        }
     }, [relStatus, bookId]);
 
    if (relStatus || !bookData.bookName) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-gray-500">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }
 
    return (<>
    <p className="m-5 p-3 text-center text-md">
    <Link to="/books/home" className="hover:bg-green-100 py-2 px-4 rounded mx-1">Home</Link>
    <Link to="/books/add-book" className="hover:bg-green-100 py-2 px-4 rounded mx-1">Add New Book</Link>
    </p>
    <div>
    <h1 className="text-center text-2xl p-5">รายระเอียดหนังสือ</h1>
    <a href="#" className="mx-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <img className="rounded-t-lg" src={`http://localhost:3000/public/${bookData.bookImage}`}/>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name: {bookData.bookName}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
          Author: {bookData.bookAuthor}
    </p>
    <p className="font-normal text-gray-700 dark:text-gray-400">
          Price: {bookData.bookPrice}
    </p>
    <p className="font-normal text-gray-700 dark:text-gray-400">
          Category: {bookData.category}
    </p>
    </a>
    </div>
    <br />
    <Link to="/books/home" className="bg-yellow-100 p-2 ms-2">Back</Link>
</>);
}