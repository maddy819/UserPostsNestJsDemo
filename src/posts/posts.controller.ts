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

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @PostReq()
  create(@Req() req, @Body() body: { title: string; content: string }) {
    return this.postService.createPost(
      body.title,
      body.content,
      req.user.userId,
    );
  }

  @Get()
  getAll() {
    return this.postService.getAllPosts();
  }
}
