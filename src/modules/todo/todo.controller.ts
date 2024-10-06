import { Controller, Get, Post, Patch, Delete, Body, Param, Inject, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create.todo.dto";
import { UpdateTodoDto } from "./dto/update.todo.dto";
import { TodoBusiness } from "./todo.business";
import { AuthGuard } from "../authentication/authentication.guard";

@Controller()
export class TodoController {
    @Inject() private readonly todoBusiness: TodoBusiness
    constructor() {
        //super();
    }

    @UseGuards(AuthGuard)
    @Get('/todos')
    async getAllTodos() {
        return await this.todoBusiness.getAllTodos();
    }

    @UseGuards(AuthGuard)
    @Get('/todos/:id')
    async getDetailTodo(@Param('id') id: number) {
        return await this.todoBusiness.getDetailTodo(id);
    }

    @UseGuards(AuthGuard)
    @Post('/todos')
    async postTodo(@Body() createTodoDto: CreateTodoDto ) {
        return await this.todoBusiness.postTodo(createTodoDto);
    }

    @UseGuards(AuthGuard)
    @Patch('/todos/:id')
    async UpdateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
        return await this.todoBusiness.UpdateTodo(id, updateTodoDto);
    }

    @UseGuards(AuthGuard)
    @Delete('/todos/:id')
    async deleteTodo(@Param('id') id: number) {
        return await this.todoBusiness.deleteTodo(id)
    }
}