import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { STORIES_CREATED_EVENT } from 'src/constants';
import { StoriesCreatedEventDto } from 'src/dtos/stories-created-event.dto';
import { KeywordTrackingService } from './keyword-tracking.service';

@Controller()
export class KeywordTrackingController {
  constructor(
    private readonly keywordTrackingService: KeywordTrackingService,
  ) {}

  @EventPattern(STORIES_CREATED_EVENT)
  async handleStoriesCreated(data: StoriesCreatedEventDto) {
    await this.keywordTrackingService.processStories(data.ids);
  }
}
