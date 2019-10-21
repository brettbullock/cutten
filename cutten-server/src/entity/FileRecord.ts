import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm'

import { 
  UserRecord
} from './UserRecord';

@Entity()
export class FileRecord {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
  
  @Column()
  date: string;
  
  @Column()  
  messageCount: number;

  // each file will have multiple user records. User record includes stats
  // from each user
  @ManyToOne(type => UserRecord, userRecord => userRecord.fileRecord)
  userRecords: UserRecord[];
}