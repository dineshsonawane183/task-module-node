const app = require('express');
const pool = require('./../../dbconfig/db');
const router = app.Router();
var dateFormat = require('dateformat');
//get All tasks
router.get("/", (req, res) => {
    pool.query('select * from task', (err, data) => {
        if (err) {
            res.status(400).json({ msg: "something went wrong" });
        } else {
            res.status(200).json({ data: data });
        }

    })
});

//create task
router.post("/", (req, res) => {
    console.log(req.body);
    const arr = [
        req.body.name,
        req.body.description,
        req.body.status,
        req.body.assignedTo,
        dateFormat(new Date(req.body.due_date),'yyyy-mm-dd'),
    ];
    console.log(arr)
    pool.query(
        `insert into task (name, description, status, assignedTo, due_date) values(?,?,?,?,?);`,
        arr,
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
router.patch("/", (req, res) => {
    pool.query(
        `update task set name=?, description=?, status=?, assignedTo=?,due_date = ?,updated_date = now() where id = ?`,
        [
            req.body.name,
            req.body.description,
            req.body.status,
            req.body.assignedTo,
            dateFormat(new Date(req.body.due_date),'yyyy-mm-dd'),
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


module.exports = router;
