const app = require('express');
const pool = require('./../../dbconfig/db')
const userRouter = app.Router();

//get All users
userRouter.get("/", (req, res) => {
    pool.query('select id,name,task_id,email,username from user', (err, data) => {
        if (err) {
            res.status(400).json({ msg: "something went wrong" });
        } else {
            res.status(200).json({ data: data });
        }

    })
});

//create task
userRouter.post("/", (req, res) => {
    pool.query(
        `insert into user (name, task_id,username,password) values(?,?,?,?);`,
        [
            req.body.name,
            req.body.task_id,
            req.body.username,
            req.body.password,
        ],
        (error, results) => {
            if (error) {
                res.status(400).json({ msg: "something went wrong" });
            } else {
                res.status(200).json({ res: results });
            }
        }
    );
});

//update task
userRouter.patch("/", (req, res) => {
    pool.query(
        `update user set name=?, task_id=? where id = ?`,
        [
            req.body.name,
            req.body.task_id,
            req.body.id,
        ],
        (error, results) => {
            if (error) {
                res.status(400).json({ msg: "something went wrong" });
            } else {
                res.status(200).json({ res: results });
            }
        }
    );
});


module.exports = userRouter;
