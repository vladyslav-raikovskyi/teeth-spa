import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, progressCallback: (progress: number) => void): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress = Math.round(100 * event.loaded / (event.total || event.loaded));
            progressCallback(progress);
          } else if (event.type === HttpEventType.Response) {
            resolve();
          }
        },
        error: (error) => reject(error)
      });
    });
  }
}
