import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async delete(id: string): Promise<IUser> {
    const user = await MongoClient.db
      .collection<Omit<IUser, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (!deletedCount) {
      throw new Error("Usuário não deletado");
    }

    const { _id, ...rest } = user;

    return { ...rest, id: _id.toHexString() };
  }
}
