import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  protected readonly services: Service[] = [
    {
      icon: 'pregnant_woman',
      title: 'Gynécologie',
      description: 'Suivi gynécologique complet, consultations prénatales, dépistage et prise en charge des pathologies féminines.',
      color: 'pink'
    },
    {
      icon: 'healing',
      title: 'Chirurgie',
      description: 'Interventions chirurgicales réalisées par des chirurgiens expérimentés dans un bloc opératoire équipé aux normes.',
      color: 'red'
    },
    {
      icon: 'monitor_heart',
      title: 'Médecine Interne',
      description: 'Diagnostic et traitement des maladies complexes et chroniques, avec une approche globale et personnalisée du patient.',
      color: 'blue'
    },
    {
      icon: 'child_care',
      title: 'Pédiatrie',
      description: 'Soins médicaux dédiés aux nourrissons, enfants et adolescents : consultations, vaccinations et suivi de croissance.',
      color: 'orange'
    },
    {
      icon: 'visibility',
      title: 'Ophtalmologie',
      description: 'Examen complet de la vue, dépistage et traitement des pathologies oculaires avec un plateau technique de pointe.',
      color: 'purple'
    },
    {
      icon: 'medical_services',
      title: 'Dentisterie',
      description: 'Soins dentaires complets : consultations, détartrage, extractions, prothèses et traitements orthodontiques.',
      color: 'teal'
    },
    {
      icon: 'accessibility_new',
      title: 'Médecine Physique',
      description: 'Rééducation fonctionnelle, kinésithérapie et physiothérapie pour la récupération et la prévention des handicaps moteurs.',
      color: 'green'
    },
    {
      icon: 'favorite',
      title: 'Maternité',
      description: 'Accompagnement de la grossesse à l\'accouchement : suivi prénatal, salle d\'accouchement et soins post-nataux.',
      color: 'rose'
    }
  ];
}
