import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/app.config';
import connectDatabase from './database/database';
import { errorHandler } from './middlewares/errorHandler';
import { HTTPSTATUS } from './config/http.config';

const app = express();
// const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: config.APP_ORIGIN,
		credentials: true,
	})
);

app.get('/', (req: Request, res: Response) => {
	res.status(HTTPSTATUS.OK).json({
		message: 'Hello from express!',
	});
});

app.use(cookieParser());

app.use(errorHandler);

app.listen(config.PORT, async () => {
	console.log(
		`Server is listening on port ${config.PORT} in ${config.NODE_ENV}`
	);
	await connectDatabase();
});
