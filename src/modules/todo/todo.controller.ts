import { Controller, Get, Post, Patch, Delete } from "@nestjs/common";

@Controller()
export class TodoController {
    constructor(private readonly todoBusiness: TodoBusiness) {}

    @Get('/todos')
    async getAllTodos() {
        return await this.todoBusiness.getAllTodos();
    }
}