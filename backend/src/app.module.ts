import { Module } from '@nestjs/common';
import { SalesModule } from './modules/sales/sales.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { FinanceModule } from './modules/finance/finance.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { PublicDataModule } from './modules/public-data/public-data.module';

@Module({
  imports: [
    SalesModule,
    AnalyticsModule,
    FinanceModule,
    MonitoringModule,
    PublicDataModule,
  ],
})
export class AppModule {}
