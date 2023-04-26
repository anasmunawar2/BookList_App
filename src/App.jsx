import { useState, useEffect } from "react";

import "./App.css";
import View from "./components/View";

const getDatafromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [books, setBooks] = useState(getDatafromLS());
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [serial, setSerial] = useState("");

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    let book = {
      title,
      author,
      serial,
    };

    setBooks([...books, book]);
    setTitle("");
    setAuthor("");
    setSerial("");
  };

  const deleteBook = (serial) => {
    const filteredBooks = books.filter((element, index) => {
      return element.serial !== serial;
    });
    setBooks(filteredBooks);
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <div className="wrapper">
      <h1>BookList App</h1>
      <p>Add your favourite Books here!</p>

      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddBookSubmit}
          >
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br></br>
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
            <br></br>
            <label>Serial#</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setSerial(e.target.value)}
              value={serial}
            />
            <br></br>
            <button type="submit" className="btn btn-primary btn-md">
              Add Book
            </button>
          </form>
        </div>
        <div className="view-container">
          {books.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Serial#</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View books={books} deleteBook={deleteBook} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setBooks([])}
              >
                Remove All!
              </button>
            </>
          )}
          {books.length < 1 && <div>Your List is Empty!</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
