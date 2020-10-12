import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compress from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
	type Message {
		text: String!
	}
	type Query {
		message: Message!
	}
`;

const resolvers = {
	Query: {
		message: () => ({
			text: 'Hello World!',
		}),
	},
};

function main() {
	/**
	 * Express instance
	 * @public
	 */
	const app = express();
	const PORT = 4000;

	const server = new ApolloServer({ typeDefs, resolvers });

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

	server.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`Server Started PORT ${PORT}`);
	});
}

main();
