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
  getLatestMovie(): Observable<Movie> {
    return this.http.get<Movie>(
      `${environment.baseUrl}/movie/latest?api_key=${environment.apiKey}`
    );
  }

  getTopRatedMovies(page = 1): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/movie/top_rated?page=${page}&api_key=${environment.apiKey}`
    );
  }
}
