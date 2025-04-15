import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { Mention } from '../entities/mention.entity';

@Injectable()
export class KeywordTrackingService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Mention)
    private readonly mentionRepository: Repository<Mention>,
  ) {}

  async processStories(ids: Array<number>) {
    const results = await this.storyRepository.manager.query<
      Array<{
        storyId: number;
        keyword: string;
        count: number;
      }>
    >(`
        SELECT 
            s.id AS "storyId",
            k.word AS keyword,
            (SELECT COUNT(*) 
            FROM regexp_matches(
                LOWER(s.title),
                LOWER(k.word),
                'g'
            )) AS count
        FROM story s
        CROSS JOIN keyword k
        WHERE s.id IN (${ids.join(',')})
        AND LOWER(s.title) LIKE '%' || LOWER(k.word) || '%'
      `);

    console.log('PROCESSED AND SAVING TO DB', results);

    const mentions = results.map((r) =>
      this.mentionRepository.create({
        count: r.count,
        keyword: r.keyword,
        story: {
          id: r.storyId,
        },
      }),
    );

    if (mentions.length > 0) {
      await this.mentionRepository.save(mentions);
    }
  }
}
