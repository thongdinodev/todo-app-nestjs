import { Todo } from "src/modules/todo/entities/todo.entity";

export interface InterfaceTodoRepository {
    create(dto: any): Promise<any>;
    findAllTodosUser(condition: any, relationOption: any): Promise<Todo[]>;
    findAll(): Promise<Todo[]>;
    findOneByCondition(condition: object): Promise<Todo>;
    findByUserId(id: number, user: any): Promise<any>;
    findOneById(id: number): Promise<any>;
    save(todo: Todo): Promise<any>;
    delete(id: number): Promise<any>;
    softDelete(id: number): Promise<any>;
}