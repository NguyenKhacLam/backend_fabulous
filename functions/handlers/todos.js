const { db } = require("./../firebase");

exports.getAllTodos = (req, res) => {
  db.collection("todos")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          status: doc.data().status,
          subTasks: doc.data().subTask,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });
      return res.status(200).json(todos);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong...!" });
    });
};

exports.getTodayAllTodos = (req, res) => {
  db.collection("todos")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          status: doc.data().status,
          subTasks: doc.data().subTask,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });

      todos = todos.filter((todo) => {
        let today = new Date().toISOString().split("T")[0];
        return todo.createdAt.split("T")[0] === today;
      });

      return res.status(200).json(todos);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong...!" });
    });
};

exports.createTodo = (req, res) => {
  const newTodo = {
    title: req.body.name,
    description: req.body.description,
    status: req.body.status,
    subTasks: req.body.subTask,
    userId: req.body.userId,
    reminder: null,
    createdAt: new Date().toISOString(),
  };

  db.collection("todos")
    .add(newTodo)
    .then((doc) =>
      res.status(201).json({ message: `Todo ${doc.id} created...!` })
    )
    .catch((err) => console.error(err));
};

exports.getOneTodo = (req, res) => {
  let todoData = {};
  db.doc(`/todos/${req.params.todoId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "No todo found...!" });
      }
      todoData = doc.data();
      todoData.todoId = doc.id;
      return res.status(201).json(todoData);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.updateTodo = (req, res) => {
  const updatedTodo = {
    title: req.body.title,
    description: req.body.description,
    reminder: null,
  };

  db.doc(`/todos/${req.params.todoId}`)
    .update(updatedTodo)
    .then(() => res.status(200).json({ message: "Updated successfully!" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.deleteTodo = (req, res) => {
  const document = db.doc(`todos/${req.params.todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "No todo found." });
      }
      return document.delete();
    })
    .then(() => {
      return res.status(200).json({ message: "Delete successfully!" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.addSubTask = (req, res) => {
  const newSubTask = {
    id: new Date().getTime(),
    title: req.body.title,
    status: false,
  };

  const document = db.doc(`/todos/${req.params.todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "No todo found...!" });
      }
      let subTaskList = [];
      doc.data().subTasks.map((item) => {
        subTaskList.push(item);
      });
      return subTaskList;
    })
    .then((subTaskList) => {
      subTaskList.push(newSubTask);
      return document.update({ subTasks: subTaskList });
    })
    .then(() => {
      return res.status(200).json({ message: "Add SubTask Successfully!" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.updateSubTask = (req, res) => {
  const document = db.doc(`/todos/${req.params.todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "No todo found...!" });
      }
      let subTaskList = [];
      doc.data().subTasks.map((item) => {
        subTaskList.push(item);
      });
      return subTaskList;
    })
    .then((subTaskList) => {
      let subTask = subTaskList.filter((task) => {
        return task.id === parseInt(req.params.subTaskId);
      });
      subTask[0].title = req.body.newTitle;
      return document.update({ subTasks: subTaskList });
    })
    .then(() => {
      return res.status(200).json({ message: "Update SubTask Successfully!" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.doneSubTask = (req, res) => {
  const document = db.doc(`/todos/${req.params.todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "No todo found...!" });
      }
      let subTaskList = [];
      doc.data().subTasks.map((item) => {
        subTaskList.push(item);
      });
      return subTaskList;
    })
    .then((subTaskList) => {
      let subTask = subTaskList.filter((task) => {
        return task.id === parseInt(req.params.subTaskId);
      });
      subTask[0].status = !subTask[0].status;
      return document.update({ subTasks: subTaskList });
    })
    .then(() => {
      return res.status(200).json({ message: "Update SubTask Successfully!" });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
