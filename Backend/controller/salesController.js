import { db } from "../connect.js";

export const addLead = (req, res) => {
    const { customer_name, customer_email } = req.body;
    const userId = req.user.id; 
    
    const query = 'INSERT INTO sales (customer_name, customer_email, salesuser_id) VALUES (?, ?, ?)';
    
    db.query(query, [customer_name, customer_email, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding lead', error: err });
      }
      res.json({ message: 'Lead added successfully.' });
    });
  };