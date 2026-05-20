import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AnalyticsService {
  private readonly dataPath = path.join(__dirname, '../../data/analytics.json');

  getAll() {
    const raw = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(raw);
  }

  getSummary() {
    return this.getAll().summary;
  }

  getTraffic() {
    return this.getAll().trafficByDay;
  }

  getSources() {
    return this.getAll().trafficSources;
  }

  getFunnel() {
    return this.getAll().conversionFunnel;
  }
}
