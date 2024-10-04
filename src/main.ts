import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('ATIC api')
    .setDescription('API do projeto de gerenciador de servidores(CAF).')
    .setVersion('1.0')
    .addTag('App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors({
    origin: 'http://localhost:3001', // Substitua pela URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se você precisar de credenciais como cookies ou HTTP auth
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  // const server = createServer();
  // server.listen(1389, () => {
  //   console.log('LDAP server listening at %s', server.url);
  // });
}

bootstrap();
