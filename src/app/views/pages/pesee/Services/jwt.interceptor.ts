import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { request } from "http";
import { TokenService } from "./token.service";

@Injectable()
export class JwtInerceptor implements  HttpInterceptor{
constructor(private tokenService:TokenService){}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let token =localStorage.getItem('accessToken');
    // console.log('token ======>',token);
    req.clone({
     setHeaders:{
         Autorization:`Bearer ${this.tokenService.getToken()}`
     }})
 

    
    return next.handle(req);
}}


// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class JwtInerceptor implements HttpInterceptor {
//   intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(httpRequest.clone({setHeaders:{Autorization:`Bearer ${this.tokenService.getToken()}`}}));
//   }
// }
