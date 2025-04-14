import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from '../entities/story.entity';
import { KeywordTrackingController } from './keyword-tracking.controller';
import { KeywordTrackingService } from './keyword-tracking.service';
import { Mention } from '../entities/mention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Mention])],
  controllers: [KeywordTrackingController],
  providers: [KeywordTrackingService],
})
export class KeywordTrackingModule {}
