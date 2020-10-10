import { ApolloServer, gql } from 'apollo-server';

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
	const server = new ApolloServer({ typeDefs, resolvers });

	server.listen();
}

main();
