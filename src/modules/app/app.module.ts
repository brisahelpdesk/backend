import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [
        //Importing ConfigModule.forRoot() for .env automatic management
        ConfigModule.forRoot(),
        ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
