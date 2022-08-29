import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private ngxSpinnerService: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = this.setToken(request);
    this.ngxSpinnerService.show();
    return this.doRequest(req, next);
  }

  private setToken(req: HttpRequest<any>): HttpRequest<any> {
    const token: string|null = localStorage.getItem('VEHICLE_MANAGER_ACCESS_TOKEN');
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `JWT ${ token }`
        }
      });
    }
    return request;
  }

  private doRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.ngxSpinnerService.hide();
      }
      return event;
    }, () => {
      this.ngxSpinnerService.hide();
    }));
  }

}
