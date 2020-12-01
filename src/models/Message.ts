import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Message {
	@Field()
	text: string;
}
