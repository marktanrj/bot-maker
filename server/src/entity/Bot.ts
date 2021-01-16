import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Bot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jsonData!: string;

  @ManyToOne((type) => User, (user) => user.bots)
  user!: User;
}
