import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        const extNameFile = path.extname(file.originalname)

        // console.log({ scustomStore: file, extNameFile });

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, "local" + "-" + uniqueSuffix + extNameFile);
    },
});

export const uploadDiskLocal = multer({ storage: storage });
