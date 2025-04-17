import { injectable } from "inversify";
import IEncriptionServices from "../interfaces/IEncryptionServices";
import bcrypt from 'bcrypt';

@injectable()
export default class EncryptionServices implements IEncriptionServices {
  async hash(toHash: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(toHash, saltRounds)
  }

  async compare(toCompare: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(toCompare, hash)
  }
}
