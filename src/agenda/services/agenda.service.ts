import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Agenda } from "../entities/agenda.entity";


@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(Agenda)
        private agendaRepository: Repository<Agenda>
    ) {}

    async findAll(): Promise<Agenda[]>{
        return await this.agendaRepository.find();
    }

    async findById(id: number): Promise<Agenda>{
        let agenda = await this.agendaRepository.findOne({
            where: {
                id,
            }
        });
        if(!agenda)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND)
        return agenda
    }

    async create(agenda: Agenda): Promise<Agenda>{
        return await this.agendaRepository.save(agenda);
    }

    async update(agenda: Agenda): Promise<Agenda>{
        let buscaTarefa: Agenda = await this.findById(agenda.id);

        if(!buscaTarefa || !agenda.id)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND);
        return await this.agendaRepository.save(agenda)

    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaTarefa = await this.findById(id);

        if(!buscaTarefa)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND);
        return await this.agendaRepository.delete(id)
    }
}