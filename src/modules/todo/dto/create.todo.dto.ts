 import { Expose } from "@nestjs/class-transformer";
 
 export class CreateTodoDto {
   @Expose()
    title: string;

   @Expose()
   description: string;

   @Expose()
   deadline: Date;

   @Expose()
   completed: boolean
 }