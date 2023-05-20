import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'node 29';
  }

  getTotal(number: number, numberTwo: number): number {
    return number + numberTwo;
  }
}
