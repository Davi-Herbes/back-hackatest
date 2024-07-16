import { Module } from '@nestjs/common';
import { UsersImagesService } from './users-images.service';
import { UsersImagesController } from './users-images.controller';

@Module({
  controllers: [UsersImagesController],
  providers: [UsersImagesService],
})
export class UsersImagesModule {}
