import { Controller, Post, Get, Body, Request, UseGuards } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./authentication.guard";

@Controller()
export class AuthenticationController {
    @Inject() private readonly authenticationService: AuthenticationService
    constructor() {

    }

    @Post('/auth/register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authenticationService.register(registerDto);
    }

    @Post('/auth/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authenticationService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get('/auth/profile')
    getProfile(@Request() req) {
    return req.user; //test auth
    }
}