import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll() {
    return this.salesService.getAll();
  }

  @Get('summary')
  getSummary() {
    return this.salesService.getSummary();
  }

  @Get('revenue')
  getRevenue() {
    return this.salesService.getMonthlyRevenue();
  }

  @Get('products')
  getProducts() {
    return this.salesService.getTopProducts();
  }

  @Get('orders')
  getOrders() {
    return this.salesService.getRecentOrders();
  }
}
