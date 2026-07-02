const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", // Your MySQL password
    database: "society_finance"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Error:", err);
        return;
    }
    console.log("✅ MySQL Connected");
});

module.exports = db;