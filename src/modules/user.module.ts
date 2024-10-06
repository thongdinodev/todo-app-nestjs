import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "src/services/user.service";
import { UserBusiness } from "./user/user.business";
import { User } from "./user/entities/user.entity";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [
        UserBusiness,
        UserService,
        JwtService
    ],
    exports: [UserService],
})
export class UserModule {}