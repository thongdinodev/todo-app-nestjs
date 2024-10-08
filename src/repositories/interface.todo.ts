import { Todo } from "src/modules/todo/entities/todo.entity";

export interface InterfaceTodoRepository {
    create(dto: any): Promise<Todo>;

    findAll(condition: object, options?: object): Promise<Todo[]>;

    findOneById(id: number): Promise<Todo>;
    
    findOneByCondition(condition: object): Promise<Todo>;

    findAllTodosUser(condition: object): Promise<Todo[]>;

    save(todo: Todo): Promise<Todo>;
    
    softDelete(id: number): Promise<Todo>;
}