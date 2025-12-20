import { Controller, Get, Query } from '@nestjs/common';
import { MetaService } from './meta.service';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('employees')
  async getEmployees(@Query('limit') limit?: string) {
    const parsedLimit = Number(limit);
    const safeLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 5;
    return this.metaService.getEmployees(safeLimit);
  }
}
