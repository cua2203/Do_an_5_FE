import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from '../model/brand.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAll(token: string): Observable<Brand[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token, // Add your access token or any other headers here
      }),
    };
    return this.http.get<Brand[]>(
      'http://localhost:3001/api/brand/getAll',
      httpOptions
    );
  }

  delete(id: number, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token, // Add your access token or any other headers here
      }),
    };
    return this.http.delete(
      'http://localhost:3001/api/brand/delete/' + id,
      httpOptions
    );
  }

  upload(des: string, form: FormData, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Add your access token or any other headers here
      }),
    };
    return this.http.post(
      'http://localhost:3001/api/upload/single?des=' + des,
      form,
      httpOptions
    );
  }
  getById(id: number, token: string): Observable<Brand> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Add your access token or any other headers here
      }),
    };
    return this.http.get<Brand>(
      'http://localhost:3001/api/brand/getById/' + id,
      httpOptions
    );
  }
  update(brand: Brand, token: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Add your access token or any other headers here
      }),
    };
    return this.http.post<Brand>(
      'http://localhost:3001/api/brand/update',
      brand,
      httpOptions
    );
  }

  add(brand: Brand, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(
      'http://localhost:3001/api/brand/add',
      brand,
      httpOptions
    );
  }
}
