import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  createPost(
    title: string,
    content: string,
    userId: string,
  ): Promise<PostDocument | null> {
    try {
      if (!title || !content || !userId) {
        throw new Error('Title, content, and userId are required');
      }

      if (content.length < 100) {
        throw new Error('Content should be at least 100 characters');
      }

      const newPost = new this.postModel({ title, content, userId });
      return newPost.save();
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  getAllPosts(): Promise<PostDocument[]> {
    try {
      return this.postModel.find();
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }
}
