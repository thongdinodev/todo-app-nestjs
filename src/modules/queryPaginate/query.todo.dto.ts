import { IPagination } from "./interface.pagination";

export class QueryTodoDto implements IPagination{
    completed?: boolean;
    title?: string;
    description?: string;
    deadline?: Date
    skip?: number;
    take?: number;
    order?: string;
}

