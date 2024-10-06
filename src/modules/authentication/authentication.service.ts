import { UserService } from "src/services/user.service";
import { RegisterDto } from "./dto/register.dto"; 
import * as bcrypt from "bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";

export class AuthenticationService {
    constructor(
        private readonly userService: UserService
    ) {}

    

    async register(registerData: RegisterDto) {
        const existingUser = await this.userService.getUserByUsername(registerData.username);
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

    async login(loginData: LoginDto) {

    }

    async isValidPassword(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}