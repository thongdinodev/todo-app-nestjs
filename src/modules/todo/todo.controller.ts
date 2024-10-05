import { Controller, Get, Post, Patch, Delete, Body, Param, Inject } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create.todo.dto";
import { UpdateTodoDto } from "./dto/update.todo.dto";
import { TodoBusiness } from "./todo.business";

@Controller()
export class TodoController {
    @Inject() private readonly todoBusiness: TodoBusiness
    constructor() {
        //super();
    }

    @Get('/todos')
    async getAllTodos() {
        return await this.todoBusiness.getAllTodos();
    }

    @Get('/todos/:id')
    async getDetailTodo(@Param('id') id: number) {
        return await this.todoBusiness.getDetailTodo(id);
    }

    @Post('/todos')
    async postTodo(@Body() createTodoDto: CreateTodoDto ) {
        return await this.todoBusiness.postTodo(createTodoDto);
    }

    @Patch('/todos/:id')
    async UpdateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
        return await this.todoBusiness.UpdateTodo(id, updateTodoDto);
    }

    @Delete('/todos/:id')
    async deleteTodo(@Param('id') id: number) {
        return await this.todoBusiness.deleteTodo(id)
    }
}