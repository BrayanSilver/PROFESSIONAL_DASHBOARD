import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MonitoringService {
  private readonly dataPath = path.join(__dirname, '../../data/monitoring.json');

  getAll() {
    const raw = fs.readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(raw);
  }

  getSummary() {
    return this.getAll().summary;
  }

  getServices() {
    return this.getAll().services;
  }

  getEndpoints() {
    return this.getAll().endpoints;
  }

  getAlerts() {
    return this.getAll().alerts;
  }

  getLatency() {
    return this.getAll().latencyHistory;
  }
}
