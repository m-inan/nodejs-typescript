import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';

import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { app } from './app';
import { resolvers } from './resolvers';

const typesArray = loadFilesSync(join(__dirname, './schemas'));
const typeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

function main() {
	const PORT = 4000;
	const server = new ApolloServer({ schema });

	server.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`Server Started PORT ${PORT}`);
	});
}

main();
