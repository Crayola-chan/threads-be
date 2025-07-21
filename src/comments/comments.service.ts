import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text: createCommentDto.text,
      user: createCommentDto.userId,
      parent: createCommentDto.parent || null, // Handle optional parent comment
      likes: createCommentDto.likes || 0, // Default likes to 0 if not provided
    });
    return createdComment.then((doc) => {
      return doc.populate(['user', 'parent']);
    });
  }

  findAll() {
    return this.commentModel.find().populate(['user', 'parent']).exec();
  }

  getTopLevelComments() {
    return this.commentModel
      .find({
        parent: null, // Fetch only top-level comments
      })
      .populate(['user', 'parent'])
      .exec();
  }

  getCommentsByParentId(parentId: string) {
    return this.commentModel
      .find({
        parent: parentId, // Fetch only comments with the specified parent ID
      })
      .populate(['user', 'parent'])
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
