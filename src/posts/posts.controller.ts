import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostDto } from './post.dto';
import { Post as Poste } from './post.schema';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('posts') // This decorator is used to group the endpoints in Swagger documentation
@ApiBearerAuth() // This decorator adds the Bearer token authentication to the Swagger documentation
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiOkResponse({
    description: 'Returns the created post',
    type: Poste,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body: PostDto): Promise<Poste | null> {
    return this.postService.createPost(
      body.title,
      body.content,
      req.user.userId,
    );
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    description: 'Returns a list of all posts',
    type: [Poste],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Poste[]> {
    return this.postService.getAllPosts();
  }
}
