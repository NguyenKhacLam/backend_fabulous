const { db } = require("./../firebase");

exports.getAllCategories = (req, res) => {
  db.collection("categories")
    .get()
    .then((data) => {
      let categories = [];
      data.forEach((doc) => {
        categories.push({
          id: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
        });
      });
      return res.status(200).json(categories);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong...!" });
    });
};

exports.createCategory = (req, res) => {
  const newCategory = {
    name: req.body.name,
    image: req.body.image,
    createdAt: new Date().toISOString(),
  };

  db.collection("categories")
    .add(newCategory)
    .then((doc) =>
      res.status(201).json({ message: `Category ${doc.id} created...!` })
    )
    .catch((err) => console.error(err));
};
