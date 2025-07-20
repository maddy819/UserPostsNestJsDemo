import {
  Controller,
  Post as PostReq,
  Body,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostDto } from './post.dto';
import { PostDocument } from './post.schema';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @PostReq()
  create(@Req() req, @Body() body: PostDto): Promise<PostDocument | null> {
    return this.postService.createPost(
      body.title,
      body.content,
      req.user.userId,
    );
  }

  @Get()
  getAll(): Promise<PostDocument[]> {
    return this.postService.getAllPosts();
  }
}
