import { Todo } from "src/modules/todo/entities/todo.entity";

export interface InterfaceTodoRepository {
    create(dto: any): Promise<any>;

    findAll(condition: object): Promise<Todo[]>;

    findOneByCondition(condition: object): Promise<Todo>;

    findOneById(id: number): Promise<any>;

    findAllTodosUser(condition: any): Promise<Todo[]>;

    save(todo: Todo): Promise<any>;
    
    softDelete(id: number): Promise<any>;
}