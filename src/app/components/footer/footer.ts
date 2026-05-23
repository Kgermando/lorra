import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly links = [
    { label: 'Accueil',       href: '#accueil'     },
    { label: 'À Propos',      href: '#apropos'     },
    { label: 'Services',      href: '#services'    },
    { label: 'Notre Équipe',  href: '#equipe'      },
    { label: 'Équipement',    href: '#equipement'  },
    { label: 'Galerie',        href: '#galerie'     },
    { label: 'Contact',        href: '#contact'     }
  ];

  protected readonly services = [
    'Gynécologie',
    'Chirurgie',
    'Médecine Interne',
    'Pédiatrie',
    'Ophtalmologie',
    'Dentisterie',
    'Médecine Physique',
    'Maternité'
  ];
}
