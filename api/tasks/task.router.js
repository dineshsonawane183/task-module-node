const app = require('express');
const pool = require('./../../dbconfig/db');
const router = app.Router();
var dateFormat = require('dateformat');
//get All tasks
router.get("/", (req, res) => {
    let off = req.query.offset?parseInt(req.query.offset):6;
    let limit = req.query.limit?parseInt(req.query.limit):20;
    const firstParam = !req.query.limit ? 0 :limit * off;  
    
    pool.query('select * from task limit ?,?', [firstParam,off] ,(err, data) => {
        if (err) {
            res.status(400).json({ msg: "something went wrong" });
        } else {
            res.status(200).json({ data: data });
        }

    })
});
router.get("/totaltasks", (req, res) => {
    
    pool.query('select count(*) as total from task limit 1' ,(err, data) => {
        if (err) {
            res.status(400).json({ msg: "something went wrong" });
        } else {
            res.status(200).json(data);
        }

    })
});

//create task
router.post("/", (req, res) => {
    const arr = [
        req.body.name,
        req.body.description,
        req.body.status,
        req.body.assignedTo,
        dateFormat(new Date(req.body.due_date),'yyyy-mm-dd'),
    ];
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
