import multer from 'multer';
import path from 'path';

const storage = (folder) =>{
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `uploads/${folder}`));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extension = path.extname(file.originalname);
            cb(null, uniqueSuffix + extension)
        }
    });
};

const profileUpload = multer({ storage: storage('profiles') });

const productUpload = multer({ storage: storage('products') });

const documentUpload = multer({ storage: storage('documents') });

export { profileUpload, productUpload, documentUpload };