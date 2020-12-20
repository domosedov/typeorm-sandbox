import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { City } from "./City";
import { Mark } from "./Mark";
import { Metro } from "./Metro";
import { Place } from "./Place";
import { Student } from "./Student";
import { Subject } from "./Subject";
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
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];

  @ManyToMany(() => Place)
  @JoinTable()
  places: Place[];

  @ManyToMany(() => Mark)
  @JoinTable()
  marks: Mark[];

  @ManyToOne(() => City, (city) => city.profile)
  city: City;

  @ManyToOne(() => Metro, (metro) => metro.profile)
  metro: Metro;
}
