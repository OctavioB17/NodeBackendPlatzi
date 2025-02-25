import { inject } from "inversify";
import { ICreateUser } from "../../app/interfaces/users/ICreateUser";
import { UserDTO } from "../../app/dtos/UserDTO";
import { Response, Request } from "express";

export default class UserController {
  constructor(@inject("ICreateUser") private createUser: ICreateUser) {}

  async register(req: Request, res: Response) {
    try {
      const userDTO = req.body as unknown as UserDTO;
      const user = await this.createUser.execute(userDTO);
      if (user) {
        res.status(201).json(user)
      } else {
        res.status(400).json({ error: 'Can not create user' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Server E' })
    }
  }
}
