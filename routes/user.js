const express = require('express');
const jwt = require('jsonwebtoken');
const db = require("../db"); // Import the db connection

const router = express.Router();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer
    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
          }
    req.user = user;
    });
    next();
};
router.post('/',authenticateToken,(req,res)=>{
    console.log(req.user);
    console.log(req.body);
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const query = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
    db.query(query,[name,email,age],(err,result) => {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ message: 'Error inserting user' });
          }
        res.status(201).json({ message: 'User created', id: result.insertId });

    });
});

// Get all users (CRUD - Read)
router.get('/', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err.message);
        return res.status(500).json({ message: 'Error fetching users' });
      }
      res.json(results);
    });
  });
  
  // Get a specific user by ID (CRUD - Read)
  router.get('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching user:', err.message);
        return res.status(500).json({ message: 'Error fetching user' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(results[0]);
    });
  });
  
  // Update user (CRUD - Update)
  router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
  
    const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(query, [name, email, age, id], (err, results) => {
      if (err) {
        console.error('Error updating user:', err.message);
        return res.status(500).json({ message: 'Error updating user' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated' });
    });
  });
  
  // Delete user (CRUD - Delete)
  router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting user:', err.message);
        return res.status(500).json({ message: 'Error deleting user' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    });
  });
module.exports = (db) => router;