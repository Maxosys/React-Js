const express = require('express');
const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/users/',
  filename: function(req, file, cb){
   
    var user_id = req.body.user_id;
    var finalfilename = user_id+'_userpic.jpg';

    //cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    cb(null,finalfilename);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init app
const app = express.Router();


// Public Folder
app.use(express.static('./public'));


app.post('/', (req, res) => {
    console.log('handling upload image');
  upload(req, res, (err) => {
    if(err){
      console.log('first err', err);
      res.send({
        msg: err
      });
    } else {
      if(req.file == undefined){
        console.log('Error: No File Selected!')
        res.send({
          msg: 'Error: No File Selected!'
        });
      } else {
        console.log('File Uploaded!')
        res.send({
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

module.exports = app;