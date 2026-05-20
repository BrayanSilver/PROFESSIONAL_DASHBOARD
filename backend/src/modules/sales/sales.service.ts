import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class SalesService {
  private readonly dataPath = path.join(__dirname, '../../data/sales.json');

  getAll() {
    const raw = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(raw);
  }

  getSummary() {
    const data = this.getAll();
    return data.summary;
  }

  getMonthlyRevenue() {
    return this.getAll().monthlyRevenue;
  }

  getTopProducts() {
    return this.getAll().topProducts;
  }

  getRecentOrders() {
    return this.getAll().recentOrders;
  }
}
