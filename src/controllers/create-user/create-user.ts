import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class MongoCreateUserController implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<IUser> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<IUser, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("Usuário não cadastrado");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
