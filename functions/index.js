const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
const { getAllHabits, getHabitsByCategory, getHabitsByUserId } = require("./handlers/habits");
const { getAllCategories, createCategory } = require("./handlers/categories");
const { getAllJournals, createJournal } = require("./handlers/journals");
const { createFocusMode } = require("./handlers/focus");
const {
  getAllTodos,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
  addSubTask,
  updateSubTask,
  doneSubTask,
  getTodayAllTodos,
} = require("./handlers/todos");

admin.initializeApp();
app.use(cors());

// Habits
app.get("/habits", getAllHabits);
app.get("/habits/:categoryName", getHabitsByCategory);
app.get("/habits/user/:userId", getHabitsByUserId);
// app.post("/habits/user/:userId", createUserHabit);

// Categories
app.get("/categories", getAllCategories);
app.post("/categories", createCategory);

// Todos
app.get("/todos", getAllTodos);
app.get("/todos/today", getTodayAllTodos);
app.get("/todos/:todoId", getOneTodo);
app.post("/todos", createTodo);
app.patch("/todos/:todoId", updateTodo);
app.delete("/todos/:todoId", deleteTodo);
// SubTask
app.post("/todos/:todoId/subtask", addSubTask);
app.patch("/todos/:todoId/subtask/:subTaskId", updateSubTask);
app.put("/todos/:todoId/subtask/:subTaskId", doneSubTask);

// Journal
app.get("/journals", getAllJournals);
app.post("/journals", createJournal);

// Focus
// app.get("/journals", getAllJournals);
app.post("/focus", createFocusMode);


exports.api = functions.https.onRequest(app);

exports.deleteDoneTaskEveryDay = functions.pubsub.schedule('35 16 * * *').onRun(context => {
  console.log('This will be run every 4:35 !');
  return null;
});