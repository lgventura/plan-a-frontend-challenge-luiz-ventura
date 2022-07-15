import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  getLatestMovie(page = 1): Observable<Movie> {
    return this.http.get<Movie>(
      `${environment.baseUrl}/movie/latest?api_key=${environment.apiKey}`
    );
  }
}
