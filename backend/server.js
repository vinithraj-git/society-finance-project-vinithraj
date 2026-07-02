const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Dashboard
app.get("/dashboard", (req, res) => {
  const incomeQuery = "SELECT IFNULL(SUM(amount), 0) AS totalIncome FROM income";
  const expenseQuery = "SELECT IFNULL(SUM(amount), 0) AS totalExpense FROM expenses";

  db.query(incomeQuery, (err, incomeResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.query(expenseQuery, (err, expenseResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const income = Number(incomeResult[0].totalIncome || 0);
      const expense = Number(expenseResult[0].totalExpense || 0);

      res.json({
        income,
        expense,
        balance: income - expense
      });
    });
  });
});

// Add member
app.post("/members", (req, res) => {
  const { name, flat_no } = req.body;

  if (!name || !flat_no) {
    return res.status(400).json({ message: "Name and Flat No are required" });
  }

  const sql = "INSERT INTO members (name, flat_no) VALUES (?, ?)";
  db.query(sql, [name, flat_no], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Member added successfully" });
  });
});

// Get members
app.get("/members", (req, res) => {
  db.query("SELECT * FROM members ORDER BY member_id DESC", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

// Add expense
app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ message: "Title and Amount are required" });
  }

  const sql =
    "INSERT INTO expenses (title, amount, expense_date, description) VALUES (?, ?, CURRENT_DATE, '')";

  db.query(sql, [title, amount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Expense added successfully" });
  });
});

// Get expenses
app.get("/expenses", (req, res) => {
  db.query("SELECT * FROM expenses ORDER BY expense_id DESC", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

// Add income
app.post("/income", (req, res) => {
  const { source, amount } = req.body;

  if (!source || !amount) {
    return res.status(400).json({ message: "Source and Amount are required" });
  }

  const sql =
    "INSERT INTO income (source, amount, income_date, description) VALUES (?, ?, CURRENT_DATE, '')";

  db.query(sql, [source, amount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Income added successfully" });
  });
});

// Get income
app.get("/income", (req, res) => {
  db.query("SELECT * FROM income ORDER BY income_id DESC", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});