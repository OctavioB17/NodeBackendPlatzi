import { Container } from "inversify";
import { IIdGenerator } from "../services/interfaces/IIdGenerator";
import { UTIL_TYPES } from "../../types";
import UuidGenerator from "../services/utils/UuidGenerator";

const utilContainer = new Container()

utilContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator);

export default utilContainer
