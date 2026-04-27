import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogItem, CatalogCreateDto } from '../models/catalog.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private http: HttpClient) {}

  getAll(type: string): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${environment.apiUrl}/${type}`);
  }
  create(type: string, dto: CatalogCreateDto): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(`${environment.apiUrl}/${type}`, dto);
  }
  update(type: string, id: number, dto: CatalogCreateDto): Observable<CatalogItem> {
    return this.http.put<CatalogItem>(`${environment.apiUrl}/${type}/${id}`, dto);
  }
  delete(type: string, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${type}/${id}`);
  }
}