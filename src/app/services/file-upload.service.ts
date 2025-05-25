import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]): Observable<number> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    return new Observable<number>(observer => {
      this.http.post<{ message: string }>(this.apiUrl, formData).subscribe({
        next: () => {
          observer.next(100);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }
}
