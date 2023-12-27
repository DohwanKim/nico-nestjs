import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar', array: true })
  genres: string[];
}
