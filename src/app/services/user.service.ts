import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URI: string = 'http://localhost:4000/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(body: String): Observable<any> {
    return this.http.post(this.URI + '/register', body, {
      observe: 'response',
      headers: { 'content-type': 'application/json' },
    });
  }
}
