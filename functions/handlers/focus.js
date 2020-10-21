const { db } = require("./../firebase");

exports.getAllFocusByUserID = (req, res) => {
  
};

exports.createFocusMode = (req, res) => {
  const newFocusMode = {
      userId: req.body.userId,
      duration: req.body.duration,
      createdAt: new Date().toISOString(),
  }

  db.collection("focus")
  .add(newFocusMode)
  .then((doc) =>
      res.status(201).json({ message: `Focus session ${doc.id} created...!` })
    )
    .catch((err) => console.error(err));
};

