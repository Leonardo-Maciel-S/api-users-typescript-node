import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await MongoClient.db
      .collection<IUser>("users")
      .find({})
      .toArray();

    return [
      {
        id: "qweq",
        firstName: "Leonardo",
        lastName: "Maciel",
        email: "teste@teste.com",
        password: "123456",
      },
    ];
  }
}
