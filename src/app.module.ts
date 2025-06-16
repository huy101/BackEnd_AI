import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtProductModule } from './modules/product/product.module';
import { AlldataModule } from './modules/all_data/pt_customer.module';
import { PtCustomerModule } from './modules/customer/customer.module';
import { HubWorkingTaskModule } from './modules/working_task/hub-working-task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.50.238', // hoặc 'LAPTOP-33N2S17D'
      port: 52817,
      username: 'sa',
      password: '123', // thay bằng mật khẩu thực tế
      database: 'onecadvn_hub_dev',
      synchronize: false,
      autoLoadEntities: true,
      entities: [__dirname + '/../output/entities/*{.ts,.js}'],
      options: {
        encrypt: false, // nếu bạn không dùng TLS/SSL
        enableArithAbort: true,
      },
    }),
    AlldataModule,
    PtCustomerModule,
    PtProductModule,
    HubWorkingTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
