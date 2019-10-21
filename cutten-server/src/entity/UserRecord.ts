import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne
} from 'typeorm'

import { 
  User
} from './User';

import {
  FileRecord
} from './FileRecord'

@Entity()
export class UserRecord {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => User, user => user.userRecords)
  user: number;

  @Column()
  date: string;

  // each file  will have multiple user records, but a single userRecord row in the
  // db can only be associated to one file
  @OneToMany(type => FileRecord, fileRecord => fileRecord.userRecords)
  fileRecord: FileRecord;

  @Column()
  kCount: number;

  @Column()
  messagesPerDay: number; 
}