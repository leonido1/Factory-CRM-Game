import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080', // Your Vue app's URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowing additional methods
    allowedHeaders: 'Content-Type, Authorization', // Allow specific headers like Content-Type and Authorization
    credentials: true, // Allow cookies or credentials (if you're using them)
  });
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
