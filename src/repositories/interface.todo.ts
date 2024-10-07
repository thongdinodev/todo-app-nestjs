import { Todo } from "src/modules/todo/entities/todo.entity";

export interface InterfaceTodoRepository {
    create(dto: any): Promise<any>;
    find(condition: any, relationOption: any): Promise<Todo[]>;
    findOneByCondition(condition: object): Promise<Todo>;
    findById(id: number, user: any): Promise<any>;
    save(todo: Todo): Promise<any>;
    delete(id: number): Promise<any>;
    
}