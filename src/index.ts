import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { City } from "./entity/City";
import { Profile } from "./entity/Profile";
import { Role, User } from "./entity/User";

async function main() {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "domosed",
      password: "2001",
      database: "typeorm_sandbox_1",
      synchronize: true,
      dropSchema: true,
      logging: true,
      entities: [User, Profile, City],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
    });
  } catch (err) {
    console.log("Не удалось соединиться с БД");
    console.error(err);
  }

  const cityRepo = getRepository(City);
  const cities = [
    {name: 'Москва'},
    {name: 'Химки'}
  ]
  const cititesQuery = await cityRepo.save(cities);

  console.log(cititesQuery);
  

  const userRepository = getRepository(User);
  const user = new User();
  user.email = 'domosedov.dev@gmail.com';
  user.phone = '89883809188'
  user.login = 'domosed';
  user.password = '2001';
  user.role = Role.ADMIN;

  const newUser = await userRepository.save(user);

  console.log(newUser);

  const profileRepo = getRepository(Profile);
  const profile = profileRepo.create(
    {
      firstName: "Alex",
      city: {
        id: 2
      },
      user: {
        id: 1
      }
    }
  );

  const newProfile = await profileRepo.save(profile)
  
    console.log(newProfile);
    
  const queryProfile = await profileRepo.findOne({
    where: {
      id: 1
    },
    relations: ["city", "user"]
  })

  console.log(queryProfile)
  
}

main().catch((err) => {
  console.log(err);
});
