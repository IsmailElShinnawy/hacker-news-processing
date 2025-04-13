import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // TODO: check if there is a better way to read config
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitmqProtocol = configService.get<string>('RABBITMQ_PROTOCOL');
  const rabbitmqUsername = configService.get<string>('RABBITMQ_USERNAME');
  const rabbitmqPassword = configService.get<string>('RABBITMQ_PASSWORD');
  const rabbitmqHost = configService.get<string>('RABBITMQ_HOST');
  const rabbitmqPort = configService.get<string>('RABBITMQ_PORT');
  const rabbitmqQueue = configService.get<string>('RABBITMQ_QUEUE');

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [
          `${rabbitmqProtocol}://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}`,
        ],
        queue: rabbitmqQueue,
        queueOptions: {
          durable: false, // TODO: check if this should be set to true
        },
      },
    });

  await microservice.listen();
}
bootstrap();
