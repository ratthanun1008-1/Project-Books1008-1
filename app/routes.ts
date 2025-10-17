import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [index("routes/home.tsx"),
    route("books/home", "./routes/books.home.tsx"),
    route("books/add-book", "./routes/books.add-book.tsx"),
    route("books/edit-book/:bookId", "./routes/books.edit-book.$bookId.tsx"),
    route("books/view-book/:bookId", "./routes/books.view-book.$bookId.tsx")
] satisfies RouteConfig;
