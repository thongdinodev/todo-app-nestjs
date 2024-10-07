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
import { CreateResponseTodoDto } from "src/modules/todo/dto/create.response.todo.dto";
import { Todo } from "src/modules/todo/entities/todo.entity";

@Injectable()
export class TodoService {
    constructor(
        @Inject('InterfaceTodoRepository')
        private readonly todoRepository: InterfaceTodoRepository,
        private readonly userService: UserService
    ) {}

    async findAllTodosUser(user: any): Promise<any> {     
        let condition: object = {
            status: true,
            user: { 
                id: user.sub 
            } 
        }   
        const todosOfUser = await this.todoRepository.findAllTodosUser(condition);
        return todosOfUser;  
    }

    async findAll(): Promise<any> {
        let condition: object = {
            status: true
        }        
        
        const todos = await this.todoRepository.findAll(condition);
        return todos;
    }

    async getDetailTodo(id: number): Promise<any> {
        
        try {
            const todoRecord = await this.todoRepository.findOneById(id);
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            return todoRecord;
            
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postTodo(body: CreateTodoDto, { username }: CreateUserDto ): Promise<Todo> {
        const user = await this.userService.findOne(username);        
        user.password = undefined;

        const newTodo: Todo = await this.todoRepository.create({
            ...body,
            user
        }); 
        
        await this.todoRepository.save(newTodo);
        
        return newTodo;
    }

    async UpdateTodo(id: number, body: UpdateTodoDto, user: any): Promise<any> {
        let condition: object = {
            id,
            user: {
                id: user.id
            }
        }
        try {
            const todoRecord = await this.todoRepository.findOneByCondition(condition);
            
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            
            Object.assign(todoRecord, body);
            todoRecord.user.password = undefined;
            
            return this.todoRepository.save(todoRecord);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async softDeleteTodo(id: number, user: any): Promise<any> {      
        let condition: object = {
            id,
            user: {
                id: user.id
            }
        }          
        try {
            const todoRecord = await this.todoRepository.findOneByCondition(condition);
            
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            
            todoRecord.user.password = undefined;
            todoRecord.status = false;
            
            return this.todoRepository.save(todoRecord);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
