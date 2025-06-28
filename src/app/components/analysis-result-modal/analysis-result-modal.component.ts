import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToothAnalysis } from '../../models/analysis-result.interface';

@Component({
  selector: 'app-analysis-result-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './analysis-result-modal.component.html',
  styleUrls: ['./analysis-result-modal.component.scss']
})
export class AnalysisResultModalComponent {
  @Input() results: ToothAnalysis[] = [];
  @Output() closeModal = new EventEmitter<void>();

  constructor() {}

  onClose(): void {
    this.closeModal.emit();
  }

  formatResults(): string {
    if (!this.results || this.results.length === 0) {
      return 'Результати аналізу відсутні';
    }

    const resultLines = this.results.map(result => 
      `Зуб ${result.teeth}: Найкращий колір — ${result.color}`
    );

    return resultLines.join('\n');
  }
} 