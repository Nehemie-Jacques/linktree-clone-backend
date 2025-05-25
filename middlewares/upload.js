import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: 'uploads/avatars',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const uploads = multer({ storage });

export default uploads;