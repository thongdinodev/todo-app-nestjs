import { Todo } from "src/modules/todo/entities/todo.entity";

export interface InterfaceTodoRepository {
    create(dto: any): Promise<any>;
    find(): Promise<Todo[]>;
    findOneByCondition(condition: object): Promise<Todo>;
    findById(id: number): Promise<any>;
    save(todo: Todo): Promise<any>;
    delete(id: number): Promise<any>;
}