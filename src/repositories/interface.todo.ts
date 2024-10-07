import { InterfacePagination } from "src/modules/interfaces/interface.pagination";
import { InterfaceQueryTodo } from "src/modules/interfaces/interface.todo";
import { Todo } from "src/modules/todo/entities/todo.entity";

export interface InterfaceTodoRepository {
    create(dto: any): Promise<Todo>;

    findAll(query: InterfaceQueryTodo): Promise<Todo[]>;

    findOneById(id: number): Promise<Todo>;
    
    findOneByCondition(condition: object): Promise<Todo>;

    findAllTodosUser(condition: object): Promise<Todo[]>;

    save(todo: Todo): Promise<Todo>;
    
    softDelete(id: number): Promise<Todo>;
}