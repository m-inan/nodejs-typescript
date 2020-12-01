import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { MessageResolver } from 'resolvers/Message';
import { app } from './app';

const PORT = 4000;

async function main() {
	const schema = await buildSchema({
		resolvers: [MessageResolver],
		emitSchemaFile: true,
	});

	const server = new ApolloServer({ schema });

	server.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`Server Started PORT ${PORT}`);
	});
}

main();
