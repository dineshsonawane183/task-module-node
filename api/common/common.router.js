const app = require('express');
const pool = require('../../dbconfig/db');
const e = require('cors');
const router = app.Router();
const { sign } = require("jsonwebtoken");
router.post("/login", (req, res) => {
    pool.query(
        `select id,name,task_id,email,username from user where username = ? and password = ?`,
        [
            req.body.username,
            req.body.password,
        ],
        (error, results) => {
            if (error) {
                res.status(400).json({ msg: "something went wrong" });
            } else {
                if (results.length >= 1) {
                    const jsontoken = sign({ result: results }, "qwe1234", {
                        expiresIn: "1h"
                      });
                    res.status(200).json({ status: "success", data: results[0] ,token: jsontoken});
                } else {
                    res.status(401).json({ status: "failure", msg: "invalid username/password" });
                }
            }
        }
    );
});

module.exports = router;
