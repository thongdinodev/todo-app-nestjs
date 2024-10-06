import { Injectable } from "@nestjs/common";
import { Todo } from "src/modules/todo/entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InterfaceTodoRepository } from "./interface.todo";

@Injectable()
export class TodoRepository implements InterfaceTodoRepository{
    constructor(
        @InjectRepository(Todo)
        private readonly repository: Repository<Todo>
    ) {}

    async find(): Promise<Todo[]> {
        return this.repository.find();
    }

    async findOneByCondition(condition: object): Promise<Todo> {
        return this.repository.findOne({ where: condition});
    }

    async findById(id: number): Promise<any> {
        return this.repository.findOne({ where: {id} })
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
}