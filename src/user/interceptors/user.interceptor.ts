import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { NguoiDung as User } from '@prisma/client';

export class UserInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('Before...');
    return handler.handle().pipe(
      tap((status)=> console.log(status)),
      map((data) =>
        data.content.map((item: User) => {
          console.log('After....');
          const res = {
            ...item,
            userId: item.nguoi_dung_id,
            name: item.ten,
            password: item.mat_khau,
            phone: item.dien_thoai,
            birthDay: item.ngay_sinh,
            gender: item.gioi_tinh,
          };
          delete res.nguoi_dung_id, delete res.ten, delete res.mat_khau, delete res.dien_thoai, delete res.ngay_sinh, delete res.gioi_tinh;
          return res;
        }),
      ),
    );
  }
}
