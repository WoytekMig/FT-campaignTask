import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FT-campaignTask';

  constructor(private router: Router) {}

  navigateToLastYearsCampaigns() {
    this.router.navigate(['/list-past']);
  }
}
