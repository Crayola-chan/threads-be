import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type UserDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  text: string;

  @Prop()
  likes: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) // Reference to the User who created the comment
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }) // Reference to the parent comment, if any
  parent: Comment | null;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
