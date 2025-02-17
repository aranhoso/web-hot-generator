import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneratorRequest, GeneratorResponse } from '../models/generator.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private apiUrl = 'http://localhost:8000/generate';

  constructor(private http: HttpClient) { }

  generate(name: string): Observable<GeneratorResponse> {
    const request: GeneratorRequest = {
      name: name,
      temperature: 0.8,
      max_length: 512
    };
    return this.http.post<GeneratorResponse>(this.apiUrl, request);
  }
}
