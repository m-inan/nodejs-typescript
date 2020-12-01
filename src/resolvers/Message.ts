import { Resolver, Query } from 'type-graphql';
import { Message } from 'models/Message';

@Resolver(Message)
export class MessageResolver {
	@Query(() => Message)
	message() {
		return {
			text: 'Hello World',
		};
	}
}
