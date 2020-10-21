const { db } = require("./../firebase");

exports.getAllJournals = (req, res) => {
  db.collection("journals")
    .get()
    .then((data) => {
      let journals = [];
      data.forEach((doc) => {
        journals.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          imageUrl: doc.data().imageUrl,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });
      return res.status(200).json(journals);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong...!" });
    });
};

exports.createJournal = (req, res) => {
  const newCategory = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    createdAt: new Date().toISOString()
  };

  db.collection("journals")
    .add(newCategory)
    .then((doc) =>
      res.status(201).json({ message: `Journal ${doc.id} created...!` })
    )
    .catch((err) => console.error(err));
};
