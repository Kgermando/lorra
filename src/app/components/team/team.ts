import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Member {
  name: string;
  role: string;
  specialty: string;
  img: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrl: './team.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  protected readonly doctors: Member[] = [
    {
      name: 'Dr. Médecin Senior',
      role: 'Médecin Généraliste',
      specialty: 'Médecine Générale & Urgences',
      img: '/images/docteurs.jpeg'
    }
  ];

  protected readonly nurses: Member[] = [
    {
      name: 'Notre Équipe Infirmière',
      role: 'Infirmières Diplômées',
      specialty: 'Soins Infirmiers & Assistance',
      img: '/images/infirmieres.jpeg'
    },
    {
      name: 'Infirmière Spécialisée',
      role: 'Infirmière Clinique',
      specialty: 'Chirurgie & Soins Intensifs',
      img: '/images/infirmiere.jpeg'
    }
  ];
}
