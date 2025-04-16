import { v4 as uuidv4 } from 'uuid';
import { IIdGenerator } from '../interfaces/IIdGenerator';

export default class UuidGenerator implements IIdGenerator {
  generate(): string {
      return uuidv4();
  }
}
