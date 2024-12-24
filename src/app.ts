import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { getEnv } from './common/utils/helpers.utils';
import router from './routes/index.routes';
import { join } from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/thumbnails', express.static(join(__dirname, '..', 'public', 'thumbnails')));
app.use('/api', router);

const PORT = getEnv('PORT');

app.listen(PORT, () => {
  console.log(`Server is running on ${getEnv('BASE_URL')}:${PORT}`);
});
