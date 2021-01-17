import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Bot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  jsonData!: string;

  @Column()
  token: string;

  @ManyToOne((type) => User, (user) => user.bots)
  user!: User;
}
