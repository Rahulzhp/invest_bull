import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl: any = 'https://intradayscreener.com/api/openhighlow/cash';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.apiUrl)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    throw error;
  }
}
