import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtProductModule } from './modules/product/product.module';
import { AlldataModule } from './modules/all_data/pt_customer.module';
import { PtCustomerModule } from './modules/customer/customer.module';
import { HubWorkingTaskModule } from './modules/working_task/hub-working-task.module';
import { HubProjectModule } from './modules/project/project.module';
import { ticketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '45.117.81.140', // hoặc 'LAPTOP-33N2S17D'
      port: 1433,
      username: 'onecadvn_hub_dev',
      password: 'f3?Yft67', // thay bằng mật khẩu thực tế
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
    HubProjectModule,
    ticketsModule,
    PtProductModule,
    // HubWorkingTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
