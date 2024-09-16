import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('login') || req.url.includes('register') ){

  }else{
    console.log('not include',req.url);
    req = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + JSON.parse(localStorage.getItem('access_token') || ''))}
    );
  }
  return next(req);
};


