import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly submitted = signal(false);
  protected readonly success = signal(false);
  protected readonly loading = signal(false);
  protected readonly errorMsg = signal<string | null>(null);

  protected readonly form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    phone:   ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{8,15}$/)]],
    email:   ['', [Validators.email]],
    service: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  protected readonly services = [
    'Gynécologie',
    'Chirurgie',
    'Médecine Interne',
    'Pédiatrie',
    'Ophtalmologie',
    'Dentisterie',
    'Médecine Physique',
    'Maternité',
    'Autre'
  ];

  protected hasError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.submitted()));
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.errorMsg.set(null);
    if (this.form.valid) {
      this.loading.set(true);
      this.http.post('/api/contact', this.form.value).subscribe({
        next: () => {
          this.success.set(true);
          this.loading.set(false);
          this.form.reset();
          this.submitted.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.errorMsg.set('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.');
        }
      });
    }
  }
}
