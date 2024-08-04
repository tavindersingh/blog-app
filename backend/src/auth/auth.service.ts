import createHttpError from "http-errors";
import { generateToken } from "../helpers/tokens";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dtos/login.dto";
import { SignupDto } from "./dtos/signup.dto";
import { comparePassword } from "../helpers/encrypt";

export class AuthService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.create(signupDto);

    const accessToken = generateToken({
      id: user.id,
    });

    return { accessToken };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const isPasswordValid = await comparePassword(
      loginDto.password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      throw createHttpError(400, "Invalid email or password");
    }

    const accessToken = generateToken({
      id: user.id,
    });

    return { accessToken };
  }
}
