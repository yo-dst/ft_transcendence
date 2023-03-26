import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			"http://localhost:5173"
		],
		credentials: true,
		methods: [
			"GET",
			"POST",
			"PATCH",
			"OPTION"
		]
	});
	app.use(cookieParser());
	app.use(json({ limit: "50mb" }));
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}
bootstrap();
