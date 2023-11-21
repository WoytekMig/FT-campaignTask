import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../models/campaign';

@Component({
  selector: 'app-last-year-campaign',
  templateUrl: './last-year-campaign.component.html',
  styleUrls: ['./last-year-campaign.component.css'],
})
export class LastYearsCampaigns implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.getLastYearsCampaigns().subscribe(
      (response) => {
        this.campaigns = response as Campaign[];
      },
      (error) => {
        console.error('Error loading last year campaigns:', error);
      }
    );
  }
}
