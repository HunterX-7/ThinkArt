import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import thinkRoutes from './routes/thinkRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/think', thinkRoutes);

app.get('/', async(req, res) => {
    res.send('Hello from ThinkArt');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(5050, () => console.log('Server has started on port http://localhost:5050'));
    } catch (error) {
        console.log(error);
    }
}

startServer();