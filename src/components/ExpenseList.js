import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

function ExpenseList({ expenses, clearItems, handleDelete, handleEdit }) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              key={expense.id}
              expense={expense}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          Clear Expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}

export default ExpenseList;
