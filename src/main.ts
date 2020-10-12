import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compress from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

function main() {
	/**
	 * Express instance
	 * @public
	 */
	const app = express();
	const PORT = 4000;

	// request logging. dev: console | production: file
	app.use(morgan('combined'));

	// parse body params and attache them to req.body
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
	// gzip compression
	app.use(compress());

	// secure apps by setting various HTTP headers
	app.use(helmet());

	// cookie parser
	app.use(cookieParser());

	// enable CORS - Cross Origin Resource Sharing
	app.use(
		cors({
			credentials: true,
		})
	);

	// static files
	app.use(express.static('static'));

	app.get('/', (_req: Request, res: Response) => {
		res.json({
			success: true,
			message: 'Rest Api Express',
		});
	});

	app.listen(PORT, () => {
		console.log(`Server Started PORT ${PORT}`);
	});
}

main();
