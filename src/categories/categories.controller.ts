import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private svc: CategoriesService) {}
  @Get() list(@Req() req: any) {
    return this.svc.list(req.user.sub);
  }
  @Post() create(@Req() req: any, @Body() dto: CreateCategoryDto) {
    return this.svc.create(req.user.sub, dto);
  }
  @Get(':id') get(@Req() req: any, @Param('id') id: string) {
    return this.svc.get(req.user.sub, id);
  }
  @Patch(':id') update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.svc.update(req.user.sub, id, dto);
  }
  @Delete(':id') remove(@Req() req: any, @Param('id') id: string) {
    return this.svc.remove(req.user.sub, id);
  }
}