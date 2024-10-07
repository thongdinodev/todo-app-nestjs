import { Injectable } from "@nestjs/common";
import { Todo } from "src/modules/todo/entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InterfaceTodoRepository } from "./interface.todo";
import { User } from "src/modules/user/entities/user.entity";
import { InterfaceQueryTodo } from "src/modules/interfaces/interface.todo";
import { InterfacePagination } from "src/modules/interfaces/interface.pagination";

@Injectable()
export class TodoRepository implements InterfaceTodoRepository{
    constructor(
        @InjectRepository(Todo)
        private readonly repository: Repository<Todo>
    ) {}

    async findAll(condition: InterfaceQueryTodo): Promise<Todo[]> {
        return this.repository.find({
            where: condition, 
            
        });
    }
    
    async findOneById(id: number): Promise<Todo> {
        return this.repository.findOne({
            where: { id } as object
        })
    }

    async findOneByCondition(condition: object): Promise<Todo> {
        return this.repository.findOne({ 
            where: condition,
            relations: ['user']
        });
    }

    async findAllTodosUser(condition: object): Promise<Todo[]> {
        return this.repository.find({ 
            // select: { title: true },
            where: condition,
            relations: ['user'],
            select: { 
                user: {
                    password: false,
                    username: true
                }
            }
        });
    }

    
    async create(body: Todo): Promise<Todo> {
        return this.repository.create(body);
    }

    async save(todo: Todo): Promise<Todo> {
        return this.repository.save(todo);
    }

    async softDelete(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }
}
