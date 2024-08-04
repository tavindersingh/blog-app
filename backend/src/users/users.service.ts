import { Repository } from "typeorm";
import { hashPassword } from "../helpers/encrypt";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";
import createHttpError from "http-errors";
import { dataSource } from "../config/database";

export class UsersService {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw createHttpError(400, "Email already exists");
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    return this.repository.save({
      email: createUserDto.email,
      hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }
}
