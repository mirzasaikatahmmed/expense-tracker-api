import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/dto';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private svc: ExpensesService) {}

  @Get()
  list(@Req() req: any, @Query() q: any) { 
    return this.svc.list(req.user.sub, q);
}

  @Post()
create(@Req() req: any, @Body() dto: CreateExpenseDto) {
  const payload: any = { ...dto, date: new Date(dto.date) };
  return this.svc.create(req.user.sub, payload);
}


  @Get(':id')
  get(@Req() req: any, @Param('id') id: string) { 
    return this.svc.get(req.user.sub, id); 
  }

  @Patch(':id')
update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateExpenseDto) {
  const payload: any = { ...dto };
  if (dto.date) payload.date = new Date(dto.date);
  return this.svc.update(req.user.sub, id, payload);
}

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) { 
    return this.svc.remove(req.user.sub, id); 
  }
}
