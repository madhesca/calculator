import React, { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "amount",
    text: ""
  });

  const handleCharge = e => {
    setCharge(e.target.value);
    console.log("charge", e.target.value);
  };

  const handleAmount = e => {
    setAmount(e.target.value);
    console.log("amount", e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      return setAlert({ type: false });
    }, 3000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
    } else {
      return handleAlert({ type: "danger", text: "Fields should not be emptied" });
    }

    handleAlert({ type: "success", text: "Successfully added expense" });
    setCharge("");
    setAmount("");
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} />
        <ExpenseList expenses={expenses} />
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
