import { CreateTodoDto } from "src/modules/todo/dto/create.todo.dto";
import { UpdateTodoDto } from "src/modules/todo/dto/update.todo.dto";
import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";

// import { InjectRepository } from '@nestjs/typeorm';
// import { Todo } from "src/modules/todo/entities/todo.entity";
// import { Repository } from "typeorm";
import { InterfaceTodoRepository } from "src/repositories/interface.todo";
import { User } from "src/modules/user/entities/user.entity";
import { CreateUserDto } from "src/modules/user/dto/create.user.dto";
import { UserService } from "./user.service";

@Injectable()
export class TodoService {
    constructor(
        @Inject('InterfaceTodoRepository')
        private readonly todoRepository: InterfaceTodoRepository,
        private readonly userService: UserService
    ) {}

    async getAllTodos(user: any): Promise<any> {        
        return await this.todoRepository.find(user, 'user');
    }

    async getDetailTodo(id: number): Promise<any> {
        const user: any = 'fsdfdsf';
        try {
            const todoRecord = await this.todoRepository.findById(id, user);
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            return todoRecord;
            
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postTodo(body: CreateTodoDto, { username }: CreateUserDto ): Promise<any> {
        const user = await this.userService.findOne(username);
        
        const newTodo = await this.todoRepository.create({
            ...body,
            user
        }); 
        
        await this.todoRepository.save(newTodo);
        return newTodo;
    }

    async UpdateTodo(id: number, body: UpdateTodoDto, user: any): Promise<any> {
        try {
            const todoRecord = await this.todoRepository.findById(id, user);
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            Object.assign(todoRecord, body);
            return this.todoRepository.save(todoRecord);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTodo(id: number): Promise<any> {
        const user: any = 'fsdf';
        try {
            const todoRecord = await this.todoRepository.findById(id, user);
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            await this.todoRepository.delete(id)
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
