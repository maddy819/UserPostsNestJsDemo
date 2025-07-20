import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vickya819:Shubham9713@cluster0.ddait.mongodb.net/user_posts?retryWrites=true&w=majority&appName=Cluster0',
    ), // Update with your connection
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
