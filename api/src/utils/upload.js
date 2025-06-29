import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';

/*
  Usage: import upload from '../utils/upload.js';
  router.post('/products', upload.array('images', 6), async (req,res)=>{})
*/

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const handleFiles = async (files) => {
  const useCloud = Boolean(process.env.CLOUDINARY_CLOUD_NAME);
  const urls = [];

  for (const file of files) {
    if (useCloud) {
      const res = await cloudinary.v2.uploader.upload_stream({ resource_type: 'image', folder: 'freshcut' }, (error, result) => {
        if (error) throw error;
        return result;
      });
    } else {
      const dir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const filename = uuidv4() + path.extname(file.originalname);
      const dest = path.join(dir, filename);
      fs.writeFileSync(dest, file.buffer);
      urls.push(`/uploads/${filename}`);
    }
  }
  return urls;
};

export default upload;