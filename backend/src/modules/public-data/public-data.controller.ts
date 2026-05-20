import { Controller, Get } from '@nestjs/common';
import { PublicDataService } from './public-data.service';

@Controller('public-data')
export class PublicDataController {
  constructor(private readonly publicDataService: PublicDataService) {}

  @Get()
  findAll() {
    return this.publicDataService.getAll();
  }

  @Get('exchange-rates')
  getExchangeRates() {
    return this.publicDataService.getExchangeRates();
  }

  @Get('crypto')
  getCrypto() {
    return this.publicDataService.getCryptoPrices();
  }

  @Get('population')
  getPopulation() {
    return this.publicDataService.getWorldPopulation();
  }
}
