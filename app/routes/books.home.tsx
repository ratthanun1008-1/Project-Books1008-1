import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function BooksHome() {
  const [bookData, setBookData] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/getBooksFromDB");
        if (res.ok) {
          const json = await res.json();
          setBookData(json);
          setBookCount(json.length);
        } else {
          alert("Failed to load data.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while loading the data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location]); // โหลดใหม่ทุกครั้งที่เปลี่ยนหน้า

  const handleDelete = async (bookId) => {
    if (confirm(`ยืนยันการลบหนังสือรหัส --> ${bookId}?`)) {
      try {
        const res = await fetch(`http://localhost:3000/api/deleteBook/${bookId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const json = await res.json();
          alert(json.message);
          setBookData((prev) => prev.filter((b) => b.id !== bookId));
          setBookCount((prev) => prev - 1);
        } else {
          alert("Failed to delete data.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the data.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 
              50.5908ZM9.08144 50.5908C9.08144 73.1895 .4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 
              9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 
              1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 
              9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 
              39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="m-5 p-3 text-center text-md">
        <Link to="/books/home" className="hover:bg-green-100 py-2 px-4 rounded mx-1">
          Home
        </Link>
        <Link to="/books/add-book" className="hover:bg-green-100 py-2 px-4 rounded mx-1">
          Add New Book
        </Link>
      </p>
      <div>
        <h1 className="text-center text-2xl p-5">รายการหนังสือ</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ลำดับ</th>
              <th className="px-6 py-3">ชื่อเรื่อง</th>
              <th className="px-6 py-3">ผู้เขียน</th>
              <th className="px-6 py-3">ราคา</th>
              <th className="px-6 py-3">ประเภท</th>
              <th className="px-6 py-3">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {bookData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center px-6 py-4">
                  --ไม่มีหนังสือในร้าน--
                </td>
              </tr>
            ) : (
              bookData.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.bookName}</td>
                  <td className="px-6 py-4">{item.bookAuthor}</td>
                  <td className="px-6 py-4">{item.bookPrice}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
              <Link to={`/books/view-book/${item.id}`} className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mx-1">ดูรายละเอียด</Link>
              <Link to={`/books/edit-book/${item.id}`} className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mx-1">แก้ไข</Link>
              <Link to= "#" onClick={(e) => {e.preventDefault(); handleDelete(item.id);}} 
              className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mx-1">ลบ</Link>
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan={6} className="px-6 py-4 text-right">
                จำนวน {bookCount} รายการ
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
