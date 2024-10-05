import { Injectable, Inject } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create.todo.dto";
import { UpdateTodoDto } from "./dto/update.todo.dto";
import { TodoService } from "src/services/todo.service";

@Injectable()
export class TodoBusiness {
    @Inject() private readonly todoService: TodoService;

    async getAllTodos() {
        return await this.todoService.getAllTodos();
    }

    async getDetailTodo(id: number) {
        return await this.todoService.getDetailTodo(id);
    }

    async postTodo(createTodoDto: CreateTodoDto ) {
        return await this.todoService.postTodo(createTodoDto);
    }

    async UpdateTodo(id: number, updateTodoDto: UpdateTodoDto) {
        return await this.todoService.UpdateTodo(id, updateTodoDto);
    }

    async deleteTodo(id: number) {
        return await this.todoService.deleteTodo(id)
    }
}