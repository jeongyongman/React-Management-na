const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
// console.log(conf.host);
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const exp = require('constants');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM customer",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// app.use(cors());
// app.use(express.json());

app.use("/image", express.static("./upload")); 

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER (id,image,name,birthday,gender,job) VALUES (null,?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let params = [image, name, birthday, gender, job];
  // console.log(params);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
    // console.log("입력완료***********************************************")
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));