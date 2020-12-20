import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class Metro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Profile, (profile) => profile.metro)
  profile: Profile;
}
