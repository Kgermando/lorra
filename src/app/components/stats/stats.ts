import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Stat {
  icon: string;
  value: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {
  protected readonly stats: Stat[] = [
    { icon: 'people',           value: '+5 000',  label: 'Patients soignés',        color: 'blue'  },
    { icon: 'medical_services', value: '+10',     label: 'Médecins spécialistes',   color: 'red'   },
    { icon: 'workspace_premium',value: '+10 ans', label: "Années d'expérience",     color: 'green' },
    { icon: 'schedule',         value: '24h/7j',  label: 'Disponibilité permanente',color: 'gold'  }
  ];
}
