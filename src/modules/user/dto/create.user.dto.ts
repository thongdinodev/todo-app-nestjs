import { Expose } from "@nestjs/class-transformer";

export class CreateUserDto {
    username: string;
    password: string;
}