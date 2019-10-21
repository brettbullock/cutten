import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm'

import { 
  UserRecord
} from './UserRecord';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => UserRecord, userRecord => userRecord.user)
  userRecords: UserRecord[];
}