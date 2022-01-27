import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {


  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.actions);
  }
  getOne(id: number): Observable<IDiscountResponse> {
    return this.http.get<IDiscountResponse>(`${this.api.actions}/${id}`);
  }
  create(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.actions, discount);
  }

  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.actions}/${id}`, discount);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }

}
