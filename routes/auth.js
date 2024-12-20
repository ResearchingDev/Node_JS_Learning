const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const db = require("../db"); // Import the db connection
const JWT_SECRET = process.env.JWT_SECRET;
router.post("/login", (req, res) => {
  const { email, age } = req.body;
  // Ensure that email and age are provided
  if (!email || !age) {
    return res.status(400).json({ message: "Email and age are required" });
  }
  const query = "SELECT * FROM users WHERE email = ? AND age = ?";
  db.query(query, [email, age], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database query error" });
    }
    if (results.length == 0) {
      return res.status(500).json({ message: "Invalid Crendential" });
    } else {
        const user = results[0];
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        console.log(results);
        res.json({ message: 'Login successful',token:token , user: user });
    }
  });
});
module.exports = router;
