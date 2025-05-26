import { MongoClient } from "./../../database/mongo";
import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { IUser } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map((user) => MongoClient.map(user));
  }
}
