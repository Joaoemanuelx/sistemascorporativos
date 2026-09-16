import { IsString, MaxLength, MinLength, IsEnum } from 'class-validator';
import { type PrioridadeSolicitacao } from '../solicitacao.entity';

export class CriarSolicitacaoDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  titulo!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  centroCusto!: string;

  @IsEnum(['normal', 'urgente'])
  @MinLength(5)
  @MaxLength(10)
  prioridade!: PrioridadeSolicitacao;
}