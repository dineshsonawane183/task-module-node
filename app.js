require("dotenv").config();
const cors = require('cors');
const express = require("express");
const path = require("path");

const taskRouter = require("./api/tasks/task.router.js");
const userRouter = require("./api/users/user.router.js");
const commonRouter = require("./api/common/common.router.js");

const app = express();

app.use(cors());
app.options('*', cors());

//body paser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);
app.use('/', commonRouter)

app.post('login', (req, res) => {

})
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});
