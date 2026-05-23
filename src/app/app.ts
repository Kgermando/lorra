import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent }    from './components/navbar/navbar';
import { HeroComponent }      from './components/hero/hero';
import { StatsComponent }     from './components/stats/stats';
import { ServicesComponent }  from './components/services/services';
import { AboutComponent }     from './components/about/about';
import { TeamComponent }      from './components/team/team';
import { EquipmentComponent } from './components/equipment/equipment';
import { GalleryComponent }   from './components/gallery/gallery';
import { ContactComponent }   from './components/contact/contact';
import { FooterComponent }    from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    StatsComponent,
    ServicesComponent,
    AboutComponent,
    TeamComponent,
    EquipmentComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}

