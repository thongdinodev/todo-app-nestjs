import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "src/services/user.service";
import { UserBusiness } from "./user/user.business";
import { User } from "./user/entities/user.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [
        UserBusiness,
        UserService
    ],
})
export class UserModule {}