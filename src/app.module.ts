import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PtCustomerModule } from './modules/pt_product/pt_customer.module';
import { HubWorkingTaskModule } from './modules/working_task/hub-working-task.module';
import { HubWorkingTaskSubModule } from './modules/working_task_sub/hub-working-task-sub.module';

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
    PtCustomerModule,
    HubWorkingTaskModule,
    HubWorkingTaskSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
