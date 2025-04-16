import { Container } from "inversify";
import IEncriptionServices from "../services/interfaces/IEncryptionServices";
import { ENCRYPTION_TYPES } from "../../types";
import EncryptionServices from "../services/EncryptionServices";
import HashCode from "../../app/use-cases/encryption/HashCode";
import CompareHash from "../../app/use-cases/encryption/CompareHash";
import IHashCode from "../../app/interfaces/encryption/IHashCode";
import ICompareHash from "../../app/interfaces/encryption/ICompareHash";

const encryptionContainer = new Container();

encryptionContainer.bind<IEncriptionServices>(ENCRYPTION_TYPES.IEncryptionServices).to(EncryptionServices)
encryptionContainer.bind<IHashCode>(ENCRYPTION_TYPES.IHashCode).to(HashCode)
encryptionContainer.bind<ICompareHash>(ENCRYPTION_TYPES.IHashCompare).to(CompareHash)

export default encryptionContainer