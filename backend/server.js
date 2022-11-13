import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users.js';
import auth from './routes/auth.js';

mongoose
	.connect(process.env.DB_URI)
	.then(() => console.log('Connected to Database..'))
	.catch((error) => console.log('Failed to connect to Database..'));

const app = express();

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listing on port ${port}...`));
