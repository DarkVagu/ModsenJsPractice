import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.setLoading(true);

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loaderService.setLoading(false);
        }
      })
    );
  }
}
