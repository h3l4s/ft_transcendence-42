import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateChanDto } from './chan.dto';
import { Chan } from './chan.entity';
import { ChanService } from './chan.service';

@Controller('chan')
export class ChanController
{
	@Inject(ChanService)
	private readonly service: ChanService;

	@Get()
	public getChans(): Promise<Chan[]>
	{
		return this.service.getChans();
	}

	@Get(':id')
	public getChan(@Param('id', ParseIntPipe) id: number): Promise<Chan>
	{
		return this.service.getChan(id);
	}

	@Get('name/:name')
	public getChanByName(@Param('name') name: string): Promise<Chan>
	{
		return this.service.getChanByName(name);
	}

	@UsePipes(new ValidationPipe({ transform: true }))
	@Post()
	public createChan(@Body() data: CreateChanDto)
	{
		return this.service.createChan(data);
	}

	@Delete(':id')
	public deleteChan(@Param('id', ParseIntPipe) id: number)
	{
		return this.service.deleteChan(id);
	}
}
