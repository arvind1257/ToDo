import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url != 'http://localhost:5000/user/login'){
  const localToken = sessionStorage.getItem("token");
  req = req.clone({headers:req.headers.set('Authorization','bearer '+localToken)});
  }
  console.log(req)
  return next(req);
};
