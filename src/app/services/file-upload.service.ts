import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToothAnalysis } from '../models/analysis-result.interface';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = `${environment.apiUrl}/api/analyze/`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, progressCallback: (progress: number) => void): Promise<ToothAnalysis[]> {
    const formData = new FormData();
    formData.append('image', file);

    return new Promise((resolve, reject) => {
      this.http.post<ToothAnalysis[]>(this.apiUrl, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: (event: HttpEvent<ToothAnalysis[]>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress = Math.round(100 * event.loaded / (event.total || event.loaded));
            progressCallback(progress);
          } else if (event.type === HttpEventType.Response) {
            resolve(event.body || []);
          }
        },
        error: (error) => reject(error)
      });
    });
  }
}
