import { Component } from '@angular/core';
import { GeneratorService } from './services/generator.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CarDetails } from './models/generator.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="app-container">
      <div class="container">
        <h1>Hot Wheels Generator</h1>
        <div class="form-group">
          <input [(ngModel)]="name" placeholder="Enter car name (optional)" class="form-control">
          <button (click)="generate()" class="btn" [disabled]="isLoading">
            {{ isLoading ? 'Generating...' : 'Generate' }}
          </button>
        </div>
        
        <div class="loading-spinner" *ngIf="isLoading">
          <div class="spinner"></div>
        </div>

        <div class="result" *ngIf="prompt || image">
          <div *ngIf="carDetails" class="card car-details-section">
            <h3>Car Details</h3>
            <div class="car-info">
              <div class="info-item"><span>Name:</span>{{carDetails.name}}</div>
              <div class="info-item"><span>Year:</span>{{carDetails.year}}</div>
              <div class="info-item"><span>Color:</span>{{carDetails.color}}</div>
              <div class="info-item"><span>Series:</span>{{carDetails.series}}</div>
            </div>
          </div>
          <div *ngIf="image" class="card image-section">
            <h3>Generated Image</h3>
            <img [src]="'data:image/jpeg;base64,' + image" alt="Generated image">
          </div>
          <div *ngIf="prompt" class="card prompt-section">
            <h3>Generated Prompt</h3>
            <pre>{{prompt}}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #1a1a1a;
      color: #e0e0e0;
      margin: 0;
      padding: 0;
      width: 100%;
      overflow-x: hidden;
    }

    .container {
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Galada", serif;
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 2rem;
      text-align: center;
      background: linear-gradient(45deg,rgb(234, 0, 255),rgb(195, 0, 255));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      letter-spacing: 1px;
    }

    h3 {
      font-family: "Atkinson Hyperlegible Mono", serif;
      font-size: 1.5rem;
      color: #fff;
      margin: 0 0 1rem 0;
    }

    .form-group {
      display: flex;
      gap: 1rem;
      margin: 2rem 0;
    }

    .form-control {
      flex: 1;
      padding: 0.8rem 1rem;
      border: none;
      border-radius: 8px;
      background: #2d2d2d;
      color: #fff;
      font-family: "Atkinson Hyperlegible Mono", serif;
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3498db;
    }

    .btn {
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 8px;
      background: rgba(135, 2, 175, 0.65);
      color: #fff;
      font-family: "Atkinson Hyperlegible Mono", serif;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn:hover:not(:disabled) {
      background: rgb(152, 41, 185);
      transform: translateY(-1px);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .card {
      background: #2d2d2d;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .card:hover {
      transform: translateY(-2px);
    }

    .car-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .info-item {
      padding: 0.5rem;
      background: #383838;
      border-radius: 6px;
      font-family: "Atkinson Hyperlegible Mono", serif;
      font-size: 1.2rem;
    }

    .info-item span {
      color: rgb(195, 0, 255) !important;
      font-weight: bold;
      margin-right: 0.5rem;
    }

    pre {
      background: #383838;
      padding: 1rem;
      border-radius: 6px;
      white-space: pre-wrap;
      color: #e0e0e0;
      font-family: "Atkinson Hyperlegible Mono", serif;
      font-size: 1.2rem;
    }

    .image-section img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      margin: 2rem 0;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #2d2d2d;
      border-top: 4px solid rgb(234, 0, 255);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class AppComponent {
  name: string = '';
  prompt: string = '';
  image: string = '';
  isLoading: boolean = false;
  carDetails: CarDetails | null = null;

  constructor(private generatorService: GeneratorService) {}

  generate() {
    this.prompt = '';
    this.image = '';
    this.carDetails = null;
    this.isLoading = true;

    this.generatorService.generate(this.name)
      .subscribe(
        response => {
          this.prompt = response.prompt;
          this.image = response.image;
          this.carDetails = response.car_details;
          this.isLoading = false;
        },
        error => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      );
  }
}
