import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housinglocation.photo" alt="Exterior photo of {{housinglocation.name}}">
      <h2 class="listing-heading">{{housinglocation.name}}</h2>
      <p class="listing-location">{{housinglocation.city}},{{housinglocation.state}}</p>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housinglocation!:HousingLocation;
}
