import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Icategory } from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http:HttpClient) { }

  getAll(token: string): Observable<Icategory[]>{
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token, // Add your access token or any other headers here
      })
    };
    return this.http.get<Icategory[]>('http://localhost:3001/api/category/getAll',httpOptions);
  }

  getById(id:number,token: string):Observable<Icategory>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token, // Add your access token or any other headers here
      })
    };
    return this.http.get<Icategory>('http://localhost:3001/api/category/getById/'+id,httpOptions);

  }

  update(category:any,token:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token, // Add your access token or any other headers here
      })
    };
    return this.http.post('http://localhost:3001/api/category/update',category,httpOptions);

  }

  add(category:any,token:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token, // Add your access token or any other headers here
      })
    };
    return this.http.post('http://localhost:3001/api/category/add',category,httpOptions);
  }

  delete(id:number,token:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token, // Add your access token or any other headers here
      })
    };
    return this.http.delete('http://localhost:3001/api/category/delete/'+id,httpOptions);

  }

}
