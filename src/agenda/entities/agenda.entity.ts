import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_agenda"})
export class Agenda {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 300, nullable: false})
    tarefa: string
}