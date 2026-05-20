import { Controller, Get } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  findAll() {
    return this.financeService.getAll();
  }

  @Get('summary')
  getSummary() {
    return this.financeService.getSummary();
  }

  @Get('cashflow')
  getCashFlow() {
    return this.financeService.getCashFlow();
  }

  @Get('transactions')
  getTransactions() {
    return this.financeService.getTransactions();
  }

  @Get('kpis')
  getKpis() {
    return this.financeService.getKpis();
  }
}
