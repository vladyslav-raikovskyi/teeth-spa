import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-container">
      <div class="upload-box">
        <h2>Завантаження файлу</h2>
        <div class="upload-area" 
             (dragover)="onDragOver($event)"
             (drop)="onDrop($event)"
             [class.dragover]="isDragging">
          <input
            type="file"
            #fileInput
            (change)="onFileSelected($event)"
            style="display: none"
          />
          <div class="upload-content">
            <p>Перетягніть файл сюди або</p>
            <button (click)="fileInput.click()">Виберіть файл</button>
          </div>
        </div>
        <div class="file-info" *ngIf="selectedFile">
          <p>Вибраний файл: {{ selectedFile.name }}</p>
          <button (click)="uploadFile()" [disabled]="isUploading">
            {{ isUploading ? 'Завантаження...' : 'Завантажити' }}
          </button>
        </div>
        <div class="message" *ngIf="message" [class.success]="isSuccess">
          {{ message }}
        </div>
        <button class="logout-btn" (click)="logout()">Вийти</button>
      </div>
    </div>
  `,
  styles: [`
    .upload-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 2rem;
    }
    .upload-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
    }
    .upload-area {
      border: 2px dashed #ddd;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      margin: 1rem 0;
      transition: all 0.3s ease;
    }
    .upload-area.dragover {
      border-color: #007bff;
      background-color: #f8f9fa;
    }
    .upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .file-info {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    .message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
      background-color: #f8d7da;
      color: #721c24;
    }
    .message.success {
      background-color: #d4edda;
      color: #155724;
    }
    .logout-btn {
      margin-top: 1rem;
      background-color: #dc3545;
    }
    .logout-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  isUploading = false;
  message = '';
  isSuccess = false;
  isDragging = false;

  constructor(
    private fileUploadService: FileUploadService,
    private authService: AuthService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.selectedFile = files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.message = '';
    this.isSuccess = false;

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.message = response.message;
        this.isSuccess = response.success;
        if (response.success) {
          this.selectedFile = null;
        }
      },
      error: (error) => {
        this.isUploading = false;
        this.message = 'Помилка при завантаженні файлу';
        this.isSuccess = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
