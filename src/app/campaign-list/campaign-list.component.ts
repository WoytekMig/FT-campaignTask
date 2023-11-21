import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../models/campaign';
import { AccountStatusService } from '../account-status.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(
    private campaignService: CampaignService,
    private accountStatusService: AccountStatusService
  ) {}

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns();
  }

  deleteCampaign(id: string, campaignFund: number) {
    this.campaignService.deleteCampaign(id, campaignFund);
  }

  updatedAccountStatus(campaignFund: number) {
    this.accountStatusService.updatedAccountStatus(campaignFund);
  }
}
