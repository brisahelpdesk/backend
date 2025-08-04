import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ClientModule } from '../client/client.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [
        //Importing ConfigModule.forRoot() for .env automatic management
        ConfigModule.forRoot(),
        ProductModule,
        UserModule,
        ClientModule,
        EmployeeModule,
        EmailModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
