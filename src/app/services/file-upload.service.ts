import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  uploadFile(file: File): Observable<{ success: boolean; message: string }> {
    // Імітуємо затримку мережі
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: `Файл ${file.name} успішно завантажено`
        });
        observer.complete();
      }, 1500);
    });
  }
}
