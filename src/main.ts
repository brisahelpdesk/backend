import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('BRISA Helpdesk')
      .setDescription('BRISA Helpdesk backend API')
      .setVersion('0.0.1')
      .addTag('REST API')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger/api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
