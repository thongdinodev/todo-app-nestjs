import { Injectable } from "@nestjs/common";
import { Todo } from "src/modules/todo/entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InterfaceTodoRepository } from "./interface.todo";
import { User } from "src/modules/user/entities/user.entity";

@Injectable()
export class TodoRepository implements InterfaceTodoRepository{
    constructor(
        @InjectRepository(Todo)
        private readonly repository: Repository<Todo>
    ) {}

    async find(condition: any, relationOption: any): Promise<Todo[]> {
        return this.repository.find({ 
            // select: { title: true },
            where: { user: { id: condition.sub } },
            relations: [relationOption]
        });
    }

    async findOneByCondition(condition: object): Promise<Todo> {
        return this.repository.findOne({ where: condition});
    }

    async findById(id: number, user: any): Promise<any> {
        return this.repository.findOne({ 
            where: { 
                id,
                user: { id: user.sub }
            },
            relations: ['user']
        })
    }
    
    async create(body: Todo): Promise<Todo> {
        return this.repository.create(body);
    }

    async save(todo: Todo): Promise<any> {
        return this.repository.save(todo);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }

    async softDelete(id: number): Promise<any> {
        return this.repository.softDelete(id)
    }
}
