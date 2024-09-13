import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'ldapjs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ATIC api')
    .setDescription('API do projeto de gerenciador de servidores(CAF).')
    .setVersion('1.0')
    .addTag('atic')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  // const server = createServer();
  // server.listen(1389, () => {
  //   console.log('LDAP server listening at %s', server.url);
  // });
}

bootstrap();
