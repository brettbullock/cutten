import {
  Entity, Column, PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Record {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
  
  @Column()
  date: string;
  
  @Column()  
  messageCount: number;
}