import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article>
    <img class="listing-photo" [src]="housinglocation?.photo">
    <section class="listing-description">
      <h2 class="listing-heading">{{housinglocation?.name}}</h2>
      <p class="listing-location">{{housinglocation?.city}},{{housinglocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units Available: {{housinglocation?.availableUnits}}</li>
        <li>Does this location have WiFi: {{housinglocation?.wifi}}</li>
        <li>Does this location have laundry: {{housinglocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now this housing location</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">
        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">
        <label for="email">Email</label>
        <input id="email" type="text" formControlName="email">
        <button type="submit" class="primary">Apply Now</button>
      </form>
    </section>
  </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  housingService = inject(HousingService);
  housinglocation: HousingLocation | undefined;
  applyForm = new FormGroup({
  firstName: new FormControl(''),
  lastName : new FormControl(''),
  email : new FormControl('')
  });

  constructor( private route: ActivatedRoute){
    const housinglocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housinglocationId).then(housinglocation =>{
      this.housinglocation = housinglocation;
    });
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
