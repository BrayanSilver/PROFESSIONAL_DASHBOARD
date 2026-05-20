import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  findAll() {
    return this.analyticsService.getAll();
  }

  @Get('summary')
  getSummary() {
    return this.analyticsService.getSummary();
  }

  @Get('traffic')
  getTraffic() {
    return this.analyticsService.getTraffic();
  }

  @Get('sources')
  getSources() {
    return this.analyticsService.getSources();
  }

  @Get('funnel')
  getFunnel() {
    return this.analyticsService.getFunnel();
  }
}
