const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"content")//the folder in which i need to put all the files
    },
    fileName: (req, file, cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {fileSize:100000 * 10},
    fileFilter: (req,file,cb)=>{
        const fileTypes = /jpg|png|mp4|mkv|flv|mov|wmv|gif/;
        console.log('file',file.mimetype,file.originalname);
        // const mimeType = fileTypes.test(file.mimeType);
        // //checking the extension
        // const extname = fileTypes.text(path.extname(file.originalname));
        // if(mimeType && extname){
        //     return cb(null,true);
        // }
        
        return cb(null,true);
        // cb("Only Images supported");
    }
}).single("content");

module.exports = upload;