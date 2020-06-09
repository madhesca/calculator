import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";

// const initialExpenses = [
//   { id: 1, charge: "rent", amount: 1600 },
//   { id: 2, charge: "car payment", amount: 400 },
//   { id: 3, charge: "credit card bill", amount: 1200 },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "amount",
    text: "",
  });

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("useEffect called");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const clearItems = () => {
    console.log("All Items are cleared");
    setExpenses([]);
    handleAlert({ type: "success", text: "All items were deleted" });
  };

  const handleEdit = (id) => {
    const expenseEdit = expenses.find((item) => item.id === id);
    const { charge, amount } = expenseEdit;
    setAmount(amount);
    setCharge(charge);
    setEdit(true);
    setId(id);
  };

  const handleDelete = (id) => {
    console.log("Item Deleted", id);
    const singleDelete = expenses.filter((expense) => {
      return expense.id !== id;
    });
    setExpenses(singleDelete);
    handleAlert({ type: "success", text: "succesfully deleted the item" });
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      return setAlert({ type: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });

        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: "success", text: "Successfully Edited expense" });
      } else {
        const singleExpense = { id: Math.random(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Successfully Added expense" });
      }
    } else {
      return handleAlert({
        type: "danger",
        text: "Fields should not be emptied",
      });
    }

    setCharge("");
    setAmount("");
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total Spending:
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
