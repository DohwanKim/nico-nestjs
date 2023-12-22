import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'string', array: true })
  genres: string[];
}
