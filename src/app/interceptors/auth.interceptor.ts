// import { Injectable } from '@angular/core';
// import {
//   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../service/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler):
//     Observable<HttpEvent<any>> {

//     const token = this.authService.getToken();
//     let authReq = req;

//     if (token) {
//       authReq = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//     }

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // handle unauthorized error
//         }
//         return throwError(error);
//       })
//     );
//   }
// }
