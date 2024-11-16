import { Inject, Injectable } from '@angular/core';
import { Category } from '../Models/Category';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(@Inject(environment.apiUrl) private api: string, private http: HttpClient) {}

  all(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.api}/categories`);
  }

  create(value: any): Observable<Category> {
    return this.http.post<Category>(`${this.api}/categories`, value);
  }

  update(id: number, body: any): Observable<Category> {
    return this.http.patch<Category>(`${this.api}/categories/${id}`, body);
  }
}
