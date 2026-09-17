import { Controller, Get, Param, Patch, ParseIntPipe, UseGuards, Post, Body, Query, Req } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { FiltrarSolicitacoesDto } from './dto/FiltrarSolicitacoesDto';
import { AprovarSolicitacaoDto } from './dto/aprovar-solicitacao.dto';

type RequisicaoAutenticada = {
  user: { id: number; papel: string };
};

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  criar(@Body() dto: CriarSolicitacaoDto) {
    return this.solicitacoesService.criar(dto);
}

  @UseGuards(JwtAuthGuard)
  @Get()
  listar(@Query() filtro?: FiltrarSolicitacoesDto) {
    return this.solicitacoesService.listar(filtro);
}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacoesService.buscarPorId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('gestor')
  @Patch(':id/aprovar')
  aprovar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AprovarSolicitacaoDto,
    @Req() request: RequisicaoAutenticada,
  ) {
    return this.solicitacoesService.aprovar(id, dto.versao, request.user.id);
  }
}