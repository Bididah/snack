import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { HistoricalChangesModule } from './historical-changes/historical-changes.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database port
      username: 'postgres', // username
      password: 'pass123', // user password
      database: 'T3amOlma', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    CustomerModule,
    HistoricalChangesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
