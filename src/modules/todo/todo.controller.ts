import { Controller, Get, Post, Patch, Delete, Body, Param, Inject, UseGuards, Req } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create.todo.dto";
import { UpdateTodoDto } from "./dto/update.todo.dto";
import { TodoBusiness } from "./todo.business";
import { AuthGuard } from "../authentication/authentication.guard";
import { Request } from "express";
import { Todo } from "./entities/todo.entity";
import { User } from "../user/entities/user.entity";

@Controller()
export class TodoController {
    @Inject() private readonly todoBusiness: TodoBusiness
    constructor() {
        //super();
    }

    @Get('/todos')
    async getAllTodos() {
        return await this.todoBusiness.getAll();
    }

    @UseGuards(AuthGuard)
    @Get('/todos/me')
    async getAllTodosUser(
        @Req() req: Request
    ) {
        const user: User = req.user;
        return await this.todoBusiness.getAllTodosUser(user);
    }

    //@UseGuards(AuthGuard)
    @Get('/todos/:id')
    async getDetailTodo(@Param('id') id: number) {
        return await this.todoBusiness.getDetailTodo(id);
    }

    @UseGuards(AuthGuard)
    @Post('/todos')
    async postTodo(
        @Body() createTodoDto: CreateTodoDto,
        @Req() req: Request
    ): Promise<Todo> {  
        const user: User = req.user;      
        return await this.todoBusiness.postTodo(createTodoDto, user);
    }

    @UseGuards(AuthGuard)
    @Patch('/todos/:id')
    async UpdateTodo(
        @Param('id') id: number, 
        @Body() updateTodoDto: UpdateTodoDto,
        @Req() req: Request
    ) {
        const user: User = req.user;
        return await this.todoBusiness.UpdateTodo(id, updateTodoDto, user);
    }

    @UseGuards(AuthGuard)
    @Delete('/todos/:id/soft-delete')
    async softDeleteTodo(
        @Param('id') id: number,
        @Req() req: Request
    ) {                
        const user: User = req.user;
        return await this.todoBusiness.softDeleteTodo(id, user);
    }
}