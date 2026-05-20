import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FinanceService {
  private readonly dataPath = path.join(__dirname, '../../data/finance.json');

  getAll() {
    const raw = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(raw);
  }

  getSummary() {
    return this.getAll().summary;
  }

  getCashFlow() {
    return this.getAll().cashFlowHistory;
  }

  getTransactions() {
    return this.getAll().recentTransactions;
  }

  getKpis() {
    return this.getAll().kpis;
  }
}
