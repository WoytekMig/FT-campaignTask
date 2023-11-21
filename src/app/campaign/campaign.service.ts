import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign';
import { BehaviorSubject } from 'rxjs';
import { AccountStatusService } from '../account-status.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private campaigns: Campaign[] = [];

  private apiUrl = 'assets/last-year-campaign.json';

  private accountStatus = new BehaviorSubject<number>(0);
  accountStatus$ = this.accountStatus.asObservable();

  constructor(
    private accountStatusService: AccountStatusService,
    private http: HttpClient
  ) {
    let savedCampaigns = localStorage.getItem('campaign');
    this.campaigns = savedCampaigns ? JSON.parse(savedCampaigns) : [];
  }

  getLastYearsCampaigns(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find((res) => res.id === id);
  }

  addCampaign(campaign: Campaign): void {
    const accountStatus = this.accountStatusService.getAccountStatus();

    if (accountStatus >= 0) {
      campaign.id = campaign.id ? campaign.id : Date.now().toString();

      this.accountStatusService.updatedAccountStatus(campaign.campaignFund);

      this.campaigns.push(campaign);

      localStorage.setItem('campaign', JSON.stringify(this.campaigns));
    }
  }

  deleteCampaign(id: string, campaignFund: number): void {
    this.accountStatusService.updatedAccountStatus(campaignFund);

    let index = this.campaigns.findIndex((res) => res.id === id);
    this.campaigns.splice(index, 1);
    localStorage.setItem('campaign', JSON.stringify(this.campaigns));
  }

  updateCampaign(id: string, updateCampaign: Campaign): void {
    const existingCampaign = this.getCampaign(id);
    if (existingCampaign) {
      updateCampaign.id = existingCampaign.id;

      this.accountStatusService.updatedAccountStatus(
        updateCampaign.campaignFund - existingCampaign.campaignFund
      );
    }

    let index = this.campaigns.findIndex((res) => res.id === id);
    this.campaigns[index] = updateCampaign;
    localStorage.setItem('campaign', JSON.stringify(this.campaigns));
  }
}
