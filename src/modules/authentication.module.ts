import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication/authentication.service";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./authentication/constants";
import { AuthenticationController } from "./authentication/authentication.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5m' },
          }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})

export class AuthenticationModule {}