import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `${process.env.RABBITMQ_PROTOCOL}://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: process.env.RABBITMQ_QUEUE,
        queueOptions: {
          durable: false, // TODO: check if this should be set to true
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
