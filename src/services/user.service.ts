import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from "src/modules/user/dto/create.user.dto";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) {}

    async getUserByUsername(username: string): Promise<any> {
        try {
            const userRecord = await this.userRepository.findOne({
                where: {
                    username: username
                }
            });
            if (!userRecord) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return userRecord;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(body: CreateUserDto) {
        const newUser = await this.userRepository.create(body);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async validateUser(username: string, password: string) {
        const user = await this.getUserByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
          }
          return null;
    }

}