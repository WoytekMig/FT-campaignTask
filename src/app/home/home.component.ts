import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountStatusService } from '../account-status.service';
import { Router } from '@angular/router';
import { CampaignService } from '../campaign/campaign.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  accountStatus: number | undefined;
  private subscription: Subscription;
  data: any;

  constructor(
    private accountStatusService: AccountStatusService,
    private router: Router,
    private campaignService: CampaignService
  ) {
    this.subscription = this.accountStatusService.accountStatus$.subscribe(
      (data) => (this.accountStatus = data)
    );
  }

  navigateToLastYearsCampaigns() {
    this.campaignService.getLastYearsCampaigns().subscribe((response) => {
      this.data = response;
    });
    this.router.navigate(['/list-past']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
