const { db } = require("./../firebase");
const admin = require("firebase-admin");

exports.getAllHabits = async (req, res) => {
  db.collection("habits")
    .get()
    .then(async (data) => {
      // use Promise.all to wait for all promises in array to resolve or reject.
      const habits = await Promise.all(
        data.docs.map(async (doc) => {
          // map over data to convert each doc into a promise that will resolve to the value of the habit object.
          const singleRow = doc.data();
          const habit = {
            id: doc.id,
            name: singleRow.name,
            description: singleRow.description,
            imageUrl: singleRow.imageUrl,
            categories: {},
            createdAt: singleRow.createdAt,
          };
          if (singleRow.categories) {
            try {
              // wait for the promise returned from singleRow.categories.get(), then set habit.categories using resolved value
              const res = await singleRow.categories.get();
              habit.categories = res.data();
            } catch (err) {
              console.log(err);
            }
          }
          return habit;
        })
      );
      return res.json(habits);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong...!" });
    });
};

exports.getHabitsByCategory = (req, res) =>{
  db.collection("habits")
    .get()
    .then(async (data) => {
      // use Promise.all to wait for all promises in array to resolve or reject.
      const habits = await Promise.all(
        data.docs.map(async (doc) => {
          // map over data to convert each doc into a promise that will resolve to the value of the habit object.
          const singleRow = doc.data();
          const habit = {
            id: doc.id,
            name: singleRow.name,
            description: singleRow.description,
            imageUrl: singleRow.imageUrl,
            categories: {},
            createdAt: singleRow.createdAt,
          };
          if (singleRow.categories) {
            try {
              // wait for the promise returned from singleRow.categories.get(), then set habit.categories using resolved value
              const res = await singleRow.categories.get();
              habit.categories = res.data();
            } catch (err) {
              console.log(err);
            }
          }
          return habit;
        })
      );

      return res.json(habits.filter(habit => habit.categories.name === req.params.categoryName));
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong...!" });
    });
}

exports.getHabitsByUserId = (req, res) => {
  db.collection("user_habit")
  .doc(req.params.userId)
  .get()
  .then((doc) => {
    return res.status(200).json(doc.data().habits.filter(item => item.todayStatus === false));
  })
  .catch(err =>{
    console.error(err);
    return res.status(500).json({ message: "Something went wrong...!" });
  });
}

// exports.createUserHabit = (req, res) => {
//   const newUserHabit = {
//     name: req.body.name,
//     createdAt: new Date().toISOString()
//   }

//   db.collection("user_habit")
//   .where("userId","==",req.params.userId)
//   .get()
//   .then(data => {
//     if (data.exists) {
//       return db.collection("user_habit").add({
//         userId: req.params.userId,
//         habit: [newUserHabit]
//       }).then((data)=>{
//         return res.status(200).json({ message: `Habit ${data.id} created!`})
//       }).catch
//     }

//     // return db.collection("user_habit").doc(admin.firestore.FieldPath).update({
//     //   habits: admin.firestore.FieldValue.arrayUnion(newUserHabit)
//     // }).then((doc)=>{
//     //   return res.status(200).json({ message: `Habit ${doc.id} updated!`})
//     // })
//     console.log(admin.firestore.FieldPath)
//     data.forEach(doc => {
//       db.collection("user_habit").doc(doc.id).update({
//           habits: admin.firestore.FieldValue.arrayUnion({

//           })
//         }).then((doc)=>{
//           return res.status(200).json({ message: `Habit ${doc.id} updated!`})
//         }).catch((err)=>{console.error(err)})
//     })
//   })
//   .catch((err) => {
//     console.error(err);
//     return res.status(500).json({ message: "Something went wrong...!" });
//   });
// }

