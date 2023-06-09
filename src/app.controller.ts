import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) { }
}
