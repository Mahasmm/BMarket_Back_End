import Interceptor from '../Interceptor';
 
export default class NullRemoveInterceptor implements Interceptor {
 filter(value: any): boolean {
   return value !== null;
 }
 
 map(value: any): any {
   return value;
 }
}
 
 

