import { CreateTodoDto } from "src/modules/todo/dto/create.todo.dto";
import { UpdateTodoDto } from "src/modules/todo/dto/update.todo.dto";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from "src/modules/todo/entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) {}

    async getAllTodos(): Promise<any> {
        return await this.todoRepository.find();
    }

    async getDetailTodo(id: number): Promise<any> {
        try {
            const todoRecord = await this.todoRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            return todoRecord;
            
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async postTodo(body: CreateTodoDto ): Promise<any> {
        const newTodo = await this.todoRepository.create(body);
        await this.todoRepository.save(newTodo);
        return newTodo;
    }

    async UpdateTodo(id: number, body: UpdateTodoDto): Promise<any> {
        try {
            const todoRecord = await this.todoRepository.findOne({
                where: {
                    id: id
                }
            });
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
        try {
            const todoRecord = await this.todoRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!todoRecord) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            await this.todoRepository.delete(id)
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
