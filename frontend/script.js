const API = "http://localhost:5000";

async function loadDashboard() {
  try {
    const res = await fetch(`${API}/dashboard`);
    const data = await res.json();

    document.getElementById("income").innerText = data.income;
    document.getElementById("expense").innerText = data.expense;
    document.getElementById("balance").innerText = data.balance;

    loadIncome();
    loadExpense();
  } catch (error) {
    alert("Unable to load dashboard");
    console.error(error);
  }
}

async function loadIncome() {
  try {
    const res = await fetch(`${API}/income`);
    const data = await res.json();

    const table = document.getElementById("incomeTable");
    table.innerHTML = "";

    data.forEach((item) => {
      table.innerHTML += `
        <tr>
          <td>${item.income_id}</td>
          <td>${item.source}</td>
          <td>₹ ${item.amount}</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadExpense() {
  try {
    const res = await fetch(`${API}/expenses`);
    const data = await res.json();

    const table = document.getElementById("expenseTable");
    table.innerHTML = "";

    data.forEach((item) => {
      table.innerHTML += `
        <tr>
          <td>${item.expense_id}</td>
          <td>${item.title}</td>
          <td>₹ ${item.amount}</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

async function addMember() {
  const name = document.getElementById("name").value.trim();
  const flat_no = document.getElementById("flat").value.trim();

  if (!name || !flat_no) {
    alert("Please enter name and flat number");
    return;
  }

  await fetch(`${API}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, flat_no })
  });

  alert("Member added successfully");
  document.getElementById("name").value = "";
  document.getElementById("flat").value = "";
}

async function addExpense() {
  const title = document.getElementById("etitle").value.trim();
  const amount = document.getElementById("eamount").value.trim();

  if (!title || !amount) {
    alert("Please enter title and amount");
    return;
  }

  await fetch(`${API}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount })
  });

  alert("Expense added successfully");
  document.getElementById("etitle").value = "";
  document.getElementById("eamount").value = "";
  loadDashboard();
}

async function addIncome() {
  const source = document.getElementById("isource").value.trim();
  const amount = document.getElementById("iamount").value.trim();

  if (!source || !amount) {
    alert("Please enter source and amount");
    return;
  }

  await fetch(`${API}/income`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, amount })
  });

  alert("Income added successfully");
  document.getElementById("isource").value = "";
  document.getElementById("iamount").value = "";
  loadDashboard();
}

loadDashboard();