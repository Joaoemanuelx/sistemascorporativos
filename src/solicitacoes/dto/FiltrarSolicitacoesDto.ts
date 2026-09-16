import { IsString, MaxLength, MinLength, IsEnum } from 'class-validator';
import { type PrioridadeSolicitacao } from '../solicitacao.entity';
import { type StatusSolicitacao } from '../solicitacao.entity';

export class FiltrarSolicitacoesDto {
  

    @IsEnum(['pendente', 'aprovada'])
    status?: StatusSolicitacao;

    @IsString()
    @MinLength(2)
    @MaxLength(30)
    centroCusto?: string;

    @IsEnum(['normal', 'urgente'])
    prioridade?: PrioridadeSolicitacao;
}