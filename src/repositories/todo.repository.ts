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

    async findAll(): Promise<Todo[]> {
        return this.repository.find({
            where: {
                status: true
            }
        });
    }

    async findAllTodosUser(condition: any, relationOption: any): Promise<Todo[]> {
        return this.repository.find({ 
            // select: { title: true },
            where: { 
                status: true,
                user: { 
                    id: condition.sub 
                } 
            },
            relations: [relationOption],
            select: { 
                user: {
                    password: false,
                    username: true
                }
            }
        });
    }

    async findOneByCondition(condition: object): Promise<Todo> {
        return this.repository.findOne({ where: condition});
    }

    async findByUserId(id: number, user: any): Promise<any> {
        return this.repository.findOne({ 
            where: { 
                id,
                user: { id: user.sub }
            },
            relations: ['user'],
            
        })
    }

    async findById(id: number, user: any): Promise<any> {
        return this.repository.findOne({
            where: {
                id
            }
        })
    }

    async findOneById(id: number): Promise<any> {
        return this.repository.findOne({
            where: { 
                id
            }
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
