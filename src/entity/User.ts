import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bot } from "./Bot";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany((type) => Bot, (bot) => bot.user)
  bots!: Bot[];
}
