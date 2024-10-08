import { Injectable, Inject } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create.todo.dto";
import { UpdateTodoDto } from "./dto/update.todo.dto";
import { TodoService } from "src/services/todo.service";
import { User } from "../user/entities/user.entity";
import { QueryTodoDto } from "../queryPaginate/query.todo.dto";

@Injectable()
export class TodoBusiness {
    @Inject() private readonly todoService: TodoService;

    async getAllTodosUser(user: User) {
        return await this.todoService.findAllTodosUser(user);
    }

    async getAll(query: QueryTodoDto) {
        return await this.todoService.findAll(query);
    }

    async getDetailTodo(id: number) {
        return await this.todoService.getDetailTodo(id);
    }

    async postTodo(createTodoDto: CreateTodoDto, user: User ) {
        return await this.todoService.postTodo(createTodoDto, user);
    }

    async UpdateTodo(id: number, updateTodoDto: UpdateTodoDto, user: any) {
        return await this.todoService.UpdateTodo(id, updateTodoDto, user);
    }

    async softDeleteTodo(id: number, user: any) {
        return await this.todoService.softDeleteTodo(id, user);
    }
}