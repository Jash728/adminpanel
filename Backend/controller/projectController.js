import { db } from "../connect.js";

export const uploadDocument = (req, res) => {
  const { docname } = req.body; 
  const userId = req.user.id; 
  const query = 'INSERT INTO documents (docname, user_id) VALUES (?, ?)';

  
  if (!docname) {
      return res.status(400).json({ message: 'Document name is required.' });
  }

  db.query(query, [docname, userId], (err, result) => {
      if (err) {
          console.error('Error uploading document:', err);
          return res.status(500).json({ message: 'Error uploading document', error: err.message });
      }
      res.json({ message: 'Document uploaded successfully.' });
  });
}




export const createIssue= (req, res) => {
    const {description} = req.body;
    const query = 'INSERT INTO issues (description, issueuser_id) VALUES (?, ?)';
    const userId = req.user.id;

    db.query(query, [description, userId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating issue', error: err });
        }
        res.json({ message: 'Issue created successfully.' });
      });

}

export const getDocuments = (req, res) => {
  const userId = req.user.id; 
  const query = 'SELECT * FROM documents WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching documents', error: err });
    }
    res.json(results);
  });
};

export const getIssues = (req, res) => {
  const userId = req.user.id; 

  const query = 'SELECT * FROM issues WHERE issueuser_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching issues', error: err });
    }
    res.json(results);
  });
};