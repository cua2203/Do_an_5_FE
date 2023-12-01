import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IAddLaptop, IGetLaptop,IGetVariant, IVariant } from '../model/laptop.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaptopService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(query: any, token: string): Observable<IGetLaptop[]> {
    const searchString = query.searchString
      ? `&searchString=${query.searchString}`
      : '';
    const pageIndex = query.pageIndex ? `&pageIndex=${query.pageIndex}` : '';
    const pageSize = query.pageSize ? `&pageSize=${query.pageSize}` : '';
    const sort = `&sort=${query.sort}`;

    const httpOptions = {
      headers: this.createHeaders(token),
    };

    return this.http.get<IGetLaptop[]>(
      `http://localhost:3001/api/product/getAll?${searchString}${pageIndex}${pageSize}${sort}`,
      httpOptions
    );
  }

  getVariant(id: number, token: string): Observable<IGetVariant[]> {
    const httpOptions = {
      headers: this.createHeaders(token),
    };

    return this.http.get<IGetVariant[]>(
      `http://localhost:3001/api/variant/getByLaptopId/`+id,
      httpOptions
    );
  }

  delete(id: number, token: string){
    const httpOptions = {
      headers: this.createHeaders(token),
    };
    return this.http.delete(
      `http://localhost:3001/api/product/delete/`+id,
      httpOptions
    );

  }

  GetById(id: number, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.get<any>(
      'http://localhost:3001/api/product/getById/'+id,
      httpOptions
    );
  }

  update(product: any, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.put(
      'http://localhost:3001/api/product/update',
      product,
      httpOptions
    );
  }

  add(product: IAddLaptop, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(
      'http://localhost:3001/api/product/add',
      product,
      httpOptions
    );
  }

  addVariant(variant: any, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(
      'http://localhost:3001/api/variant/add',
      variant,
      httpOptions
    );
  }
  updateVariant(variant: any, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.put(
      'http://localhost:3001/api/variant/update',
      variant,
      httpOptions
    );
  }

  deleteVariant(id: number, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.delete(
      'http://localhost:3001/api/variant/delete/'+id,
      httpOptions
    );
  }

  GetOneVariant(id: number, token: string): Observable<IVariant> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.get<IVariant>(
      'http://localhost:3001/api/variant/getById/'+id,
      httpOptions
    );
  }
}
