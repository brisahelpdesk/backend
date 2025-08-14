import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OfferingModule } from '../offering/offering.module';

@Module({
    imports: [
        //Importing ConfigModule.forRoot() for .env automatic management
        ConfigModule.forRoot(),
        OfferingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
