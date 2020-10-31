import { QueryResolvers } from 'generated/graphql';

export const Query: QueryResolvers = {
	message: () => ({
		text: 'Hello Wrold!',
	}),
};

export const resolvers = {
	Query,
};
