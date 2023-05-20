import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

type person = {
  id: number,
  hoTen: string,
  email: string
}

// localhost:8080/app/get-title
@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) { }

  // khởi tạo API
  // request
  @Get("/get-title/:idParam")
  @HttpCode(200) // => res.status
  getTitle(@Req() request: Request, @Query("idQuery") idQuery: string, @Param("idParam") idParam: string, @Body() body: person): string {
    // let { idQuery } = request.query; // /get-title?idQuery="node 29"
    // let { idParam } = request.params; // /get-title/node 29
    let { id, hoTen, email } = body;
    

    // req.query
    // req.params
    // req.body

    return idParam; // => res.send
  }

  @Get("/get-total")
  getHello(): number {
    let number: number = 1;
    let numberTwo: number = 2;
    return this.appService.getTotal(number, numberTwo);
  }
}
