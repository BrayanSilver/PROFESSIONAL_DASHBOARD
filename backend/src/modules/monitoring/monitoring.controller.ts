import { Controller, Get } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  findAll() {
    return this.monitoringService.getAll();
  }

  @Get('summary')
  getSummary() {
    return this.monitoringService.getSummary();
  }

  @Get('services')
  getServices() {
    return this.monitoringService.getServices();
  }

  @Get('endpoints')
  getEndpoints() {
    return this.monitoringService.getEndpoints();
  }

  @Get('alerts')
  getAlerts() {
    return this.monitoringService.getAlerts();
  }

  @Get('latency')
  getLatency() {
    return this.monitoringService.getLatency();
  }
}
