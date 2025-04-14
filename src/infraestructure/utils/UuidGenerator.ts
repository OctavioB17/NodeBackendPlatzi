import { IIdGenerator } from "../../domain/services/utils/IIdGenerator";
import { v4 as uuidv4 } from 'uuid';

export default class UuidGenerator implements IIdGenerator {
  generate(): string {
      return uuidv4();
  }
}
