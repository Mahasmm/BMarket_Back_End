import { Controller } from '@tsoa/runtime';
import { ControllerResponse, ServiceError } from '../Response';
// import { logger } from '../app';
import { InterceptorRunner } from './Interceptor';
import NullRemoveInterceptor from './inteceptors/NullRemoveInterceptor';
// import S3UrlToHttpsInterceptor from './inteceptors/S3UrlToHttpsInterceptor';
// import EmailInterceptor from './inteceptors/EmailInterceptor';
// import TrimInterceptor from './inteceptors/TrimInterceptor';
 
const outputInterceptor = new InterceptorRunner(
 new NullRemoveInterceptor(),
//  new TrimInterceptor(),
//  new S3UrlToHttpsInterceptor(),
//  new EmailInterceptor(),
);
 
export default class ControllerBase extends Controller {
 public exec = <T extends any = any>(
   runner: () => Promise<ControllerResponse<T>>,
 ): Promise<T | { message: string; body?: any }> => {
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const me = this;
   return new Promise<T>((resolve, reject) => {
     runner()
       .then((value) => {
         me.setStatus(value.statusCode);
         // console.info(`Response Before intercept (${value.statusCode}): ${JSON.stringify(value.body, null, 2)}`);
         const body = value.body ? outputInterceptor.run(value.body) : undefined;
         console.info(`Response (${value.statusCode}): ${JSON.stringify(body, null, 2)}`);
         resolve(body!);
       })
       .catch((err) => {
         console.error(`ResponseError (${err.code}): ${JSON.stringify(err, null, 2)}`);
         if (err instanceof ServiceError) {
           const e: ServiceError = err;
           me.setStatus(e.code);
           const errBody: any = { message: err.msg, body: err.body };
           // logger.error((e.err ?? e).stack);
           console.error(`ResponseError (${e.code}): ${JSON.stringify(errBody, null, 2)}`);
 
           resolve(errBody);
         } else {
           // logger.error(err.stack);
           reject(err);
         }
       });
   });
 };
}
 
 

