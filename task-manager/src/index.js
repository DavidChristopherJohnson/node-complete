const express = require('express');
const TasksRouter = require('./routers/tasks');
const UsersRouter = require('./routers/users');

const app = express();
const port = process.env.port || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        //if (!file.originalname.endsWith('.pdf')) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File must be a word document'));
        }

        cb(undefined, true);

        //Throw error            -  cb(new Error('file must be a PDF'));
        //Accept upload          -  cb(undefined, true);
        //Silently Reject upload -  cb(undefined, false);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    });
});

app.use(express.json());
app.use(TasksRouter);
app.use(UsersRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
