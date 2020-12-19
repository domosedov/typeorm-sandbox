import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { City } from "./City";
import { User } from "./User";

export enum Gender {
  NONE = "Не указан",
  MEN = "Мужской",
  WOMEN = "Женский",
  ANOTHER = "Другой"
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  // @Column()
  // middleName: string;

  // @Column()
  // lastName: string;

  // @Column({
  //   type: "enum",
  //   enum: Gender,
  //   default: Gender.NONE,
  // })
  // gender: Gender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => City, (city) => city.profile)
  city: City;
}
