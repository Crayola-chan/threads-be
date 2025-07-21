import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto); // Create a new comment
  }

  @Get()
  findAll(@Query() queryParams) {
    // Handle optional query parameters
    if (queryParams.parentId) {
      try {
        return this.commentsService.getCommentsByParentId(queryParams.parentId); // Fetch comments by parent ID
      } catch (e) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(e.message),
          description: 'Some error description',
        });
      }
    }
    return this.commentsService.getTopLevelComments(); // Fetch top-level comments by default
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
