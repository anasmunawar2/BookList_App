import React from "react";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
const View = ({ books, deleteBook }) => {
  return books.map((book) => (
    <tr key={book.serial}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.serial}</td>
      <td className="delete-btn">
        <Icon icon={trash} onClick={() => deleteBook(book.serial)} />
      </td>
    </tr>
  ));
};

export default View;
