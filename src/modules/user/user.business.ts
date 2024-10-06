import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create.user.dto";
import { UserService } from "src/services/user.service";

@Injectable()
export class UserBusiness {
    @Inject() private readonly userService: UserService;

    async getUserByUsername(username: string) {
        return this.userService.getUserByUsername(username);
    }

    async createUser(body: CreateUserDto) {
        return this.userService.createUser(body);
    }
}