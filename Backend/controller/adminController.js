import { db } from "../connect.js";

export const getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching users", error: err });
    }
    res.json(results);
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, username, role, password } = req.body;
  const query =
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, username = ?, role = ?, password = ? WHERE id = ?";
  db.query(
    query,
    [firstname, lastname, email, username, role, password, id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating user", error: err });
      }
      res.json({ message: "User updated successfully." });
    }
  );
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting user', error: err });
      }
      res.json({ message: 'User deleted successfully.' });
    });
  };