import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchmakingModule } from './matchmaking/matchmaking.module';

@Module({
	imports: [MatchmakingModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
