import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const amounts = transactions.map((t) => t.amount);

  const balance = amounts.reduce((acc, item) => acc + item, 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <h2>Balance: ₹ {balance}</h2>

      <div className="summary">
        <div>
          <h4>Income</h4>
          <p className="money plus">₹ {income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">₹ {expense}</p>
        </div>
      </div>

      <h3>Add Transaction</h3>
      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount (+ income, - expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <h3>History</h3>
      {transactions.map((t) => (
        <div
          key={t.id}
          className={`transaction ${t.amount > 0 ? "plus" : "minus"}`}
        >
          <span>{t.text}</span>
          <span>
            ₹ {t.amount}
            <button onClick={() => deleteTransaction(t.id)}>X</button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;