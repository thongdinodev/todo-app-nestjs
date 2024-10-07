import { UserService } from "src/services/user.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto"; 
import * as bcrypt from "bcrypt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.validateUser(username, pass);
        if (user) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async register(registerData: RegisterDto) {
        const existingUser = await this.userService.findOne(registerData.username);
        if (existingUser) {
            throw new HttpException('Username is already registered, pls use another', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(registerData.password, 12);
        try {
            const newUser: User = ({ ...registerData, password: hashedPassword });
            await this.userService.createUser(newUser);
            newUser.password = undefined;
            return newUser;
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginDto: LoginDto): Promise <{ token: string }> {
        const { username, password } = loginDto;

        try {
            const user = await this.userService.findOne(username);

            if (!user) {
                throw new HttpException('username or password is invalid', HttpStatus.UNAUTHORIZED);
            }

            const isCorrectPassword = await this.isValidPassword(password, user.password);

            if (!isCorrectPassword) {
                throw new HttpException('username or password is invalid', HttpStatus.UNAUTHORIZED);
            }

            const payload = { id: user.id, username: user.username};

            const token = this.jwtService.sign(payload);

            return { token };
            
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async isValidPassword(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}