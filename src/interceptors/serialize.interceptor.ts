import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto:any){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {


    return next.handle().pipe(
        map((data:any)=>{
            return plainToClass(this.dto, data,{
                excludeExtraneousValues:true
            })
        })
    )

  }
}
