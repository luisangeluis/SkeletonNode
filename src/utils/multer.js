const multer =require('multer');
const path =require('path');

const storage =multer({
  destination:()=>{
    cb(null,path.resolve('uploads/'))
  },
  filename:()=>{
    cb(null,Date.now()+'-'+file.originalname)
  }
})

const upload =multer({storage});

exports.upload =upload;

