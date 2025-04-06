import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="filter by city" #filter>
      <button class="primary" type="button" {click}="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housinglocation of filteredLocationList" [housinglocation]="housinglocation"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housinglocationList : HousingLocation[] = [];
  housingService : HousingService = inject(HousingService);
  filteredLocationList:HousingLocation[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then((housinglocationList:HousingLocation[]) =>{
      this.housinglocationList = housinglocationList;
      this.filteredLocationList = housinglocationList;
    });
  }

  filterResults(text:string) {
    if (!text) this.filteredLocationList = this.housinglocationList;

    this.filteredLocationList = this.housinglocationList.filter(
      housinglocation => housinglocation?.city.toLocaleLowerCase().includes(text.toLowerCase())
    );
  }
}
