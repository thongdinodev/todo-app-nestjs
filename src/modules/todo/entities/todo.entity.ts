import { User } from "src/modules/user/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id?: number;

    @Column({ name: 'title'})
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'completed'})
    completed: boolean;

    @Column({ name: 'deadline' })
    deadline: Date;

    @ManyToOne(() => User, (user: User) => user.todos)
    @JoinColumn({ name: 'user_id' })
    public user: User;
}