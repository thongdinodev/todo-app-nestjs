import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "src/modules/todo/entities/todo.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'username', unique: true })
    username: string;

    @Exclude()
    @Column({ name: 'password', select: false })
    password: string;

    @OneToMany(() => Todo, (todo: Todo) => todo.user)
    public todos?: Todo[];
}