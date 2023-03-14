import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get("POSTGRES_HOST"),
				port: configService.get("POSTGRES_PORT"),
				database: configService.get("POSTGRES_DB"),
				username: configService.get("POSTGRES_USER"),
				password: configService.get("POSTGRES_PASSWORD"),
				entities: [
					__dirname + "/../**/*.entity.{js,ts}"
				],
				synchronize: true
			})
		})
	]
})
export class DatabaseModule {}