import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import combinedDocs from './docs/index.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/index.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send(
    `<h1 style="text-align: center; color: #CCD6F6; margin-top: 20vh; background: #0A192F; padding: 150px;">Welcome to info Web apis!</h1>`
  );
});

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 MongoDB connection established successfully');
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err}`);
    process.exit(1);
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedDocs));
app.use('/api/v1', router);

export default app;