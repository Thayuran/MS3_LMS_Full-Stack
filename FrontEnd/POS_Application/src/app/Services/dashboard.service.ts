import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DashboardResponse } from '../Models/DashboardResponse';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  data$:Observable<DashboardResponse>

  constructor(@Inject(environment.apiUrl) private api: string, private http: HttpClient) {
  this.data$=this.http.get<DashboardResponse>(`${this.api}/dashboard/stats`);

  }
}

