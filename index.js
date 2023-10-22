const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const UserSchema = new mongoose.Schema({
  username: { type: String },
});
const User = mongoose.model('User', UserSchema);

const ExerciseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },
  date: Date,
});
const ExerciseTrack = mongoose.model('ExerciseTrack', ExerciseSchema);

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
// console.log(mongoose.connection.readyState);
app.post("/api/users", async (req, res) => {
  // const user=req.body;
  const userobj = new User({ username: req.body.username });
  try {
    const user = await userobj.save();
    res.json(user);
    console.log(user)
  } catch (error) {
    console.error(error);
  }
});
app.get("/api/users", async (req, res) => {
  const users = await User.find({}).select();
  if (!users) {
    res.send("No users found")
  }
  else {
    res.send(users)
  }
});
app.post("/api/users/:_id/exercises", async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("user not found");
    }
    else {
      const exerciseObj = new ExerciseTrack({
        user_id: id,
        description,
        duration,
        date: date ? new Date(date) : new Date()
      });
      const exercise = await exerciseObj.save();
      console.log("User was save to", user._id)
      res.json({
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date:exercise.date.toDateString(),
        _id: user._id,
      })


    }
  } catch (err) {
    console.log(err)
    res.send("error occurred!!")
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const id = req.params._id;
  const { from, to, limit } = req.query;
  const userId = await User.findById(id);
  if (!userId) {
    console.log("User not found!!")
    res.status(404).send("user not found");
    return
  }
  console.log("User Found:",userId) // Debug Log
  const dateFilter = {};

  if (from) {
    dateFilter['$gte'] = new Date(from);
  }
  if (to) {
    dateFilter['$lte'] = new Date(to);
  }

  const filter = { user_id:id };
  if (from || to) {
    filter.date = dateFilter;
  }
  
  console.log("DateFilter:", dateFilter); // Debug Log
  console.log("Filter:", filter); // Debug Log
  const exercises = await ExerciseTrack.find(filter).limit(+limit||500);
  // console.log("Exercises:", exercises); // Debug Log

  const log = exercises.map((e) => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString()
  }))
  // console.log("Log:", log); // Debug Log
  res.json({
    usename: userId.username,
    _id: userId._id,
    count: exercises.length,
    log,
  })

})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
