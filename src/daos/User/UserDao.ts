import { IUser, User } from "@entities";

export interface IUserDao {
  getAll: () => IUser[];
  add: (user: IUser) => void;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class UserDao implements IUserDao {
  user: IUser[];
  constructor() {
    this.user = new Array<IUser>();
    this.user.push(new User("test", "test@mail.com"));
  }
  /**
   *
   */
  public getAll(): IUser[] {
    // TODO
    return this.user;
  }

  /**
   *
   * @param user
   */
  public add(user: IUser) {
    this.user.push(new User(user));
  }

  /**
   *
   * @param user
   */
  public async update(user: IUser): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    // TODO
    return {} as any;
  }
}
