import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://threads-user:AyZ2hn4mNDo6T9fm@cluster1.p06babq.mongodb.net/threads?retryWrites=true&w=majority&appName=Cluster1',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
