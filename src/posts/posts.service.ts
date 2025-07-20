import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  createPost(title: string, content: string, userId: string) {
    const newPost = new this.postModel({ title, content, userId });
    return newPost.save();
  }

  getAllPosts() {
    return this.postModel.find();
  }
}
