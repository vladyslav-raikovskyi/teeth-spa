import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AnalysisResultModalComponent } from '../analysis-result-modal/analysis-result-modal.component';
import { ToothAnalysis } from '../../models/analysis-result.interface';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    AnalysisResultModalComponent
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFiles: File[] = [];
  isDragging = false;
  uploadProgress = 0;
  isUploading = false;
  showResultsModal = false;
  analysisResults: ToothAnalysis[] = [];

  constructor(
    private fileUploadService: FileUploadService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.addFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  private addFiles(files: File[]): void {
    this.selectedFiles = [...this.selectedFiles, ...files];
  }

  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  clearFiles(): void {
    this.selectedFiles = [];
    this.uploadProgress = 0;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async uploadFiles(): Promise<void> {
    if (this.selectedFiles.length === 0) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    try {
      for (const file of this.selectedFiles) {
        const results = await this.fileUploadService.uploadFile(file, (progress) => {
          this.uploadProgress = progress;
        });
        
        // Зберігаємо результати для відображення
        this.analysisResults = results;
      }
      
      this.snackBar.open('Файли успішно завантажено!', 'Закрити', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      
      // Показуємо модальне вікно з результатами
      this.showResultsModal = true;
      
      this.selectedFiles = [];
      this.uploadProgress = 0;
    } catch (error) {
      this.snackBar.open('Помилка при завантаженні файлів', 'Закрити', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isUploading = false;
    }
  }

  closeResultsModal(): void {
    this.showResultsModal = false;
    this.analysisResults = [];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
