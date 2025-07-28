import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any; //HMR related config

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //Swagger related config
    const config = new DocumentBuilder()
        .setTitle('BRISA Helpdesk')
        .setDescription('BRISA Helpdesk backend API')
        .setVersion('0.0.1')
        .addTag('REST API')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger/api', app, documentFactory);

    //Configuring app port
    await app.listen(process.env.PORT ?? 3000);

    //HMR related config
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

// Running app
bootstrap()
    .catch(error => error);
