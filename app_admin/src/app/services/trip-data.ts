import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private http = inject(HttpClient);

  private apiBaseUrl = 'http://localhost:3000/api';

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }
}