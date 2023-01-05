const multer = require("multer");

var path = require("path");

var upload = multer({ storage: storage });

const express = require("express");

const bodyparser = require("body-parser");

var docxConverter = require("docx-pdf");

const app = express();

app.post("/docxtopdf", upload.single("file"), (req, res) => {
  let outputpath = Date.now() + "output.pdf";
  docxConverter('input_demo.docx', 'output_demo.pdf', function(err, result) {
    if (err) {
      console.log(err);
    }
    res.download('output_demo.pdf', () => {

    })
  });
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


app.use(express.static("uploads"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(5196, () => {
  console.log("App is listening on port 5196");
});

