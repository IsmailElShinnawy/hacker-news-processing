import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mention {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storyId: number;

  @Column()
  keyword: string;

  @Column()
  count: number;
}
