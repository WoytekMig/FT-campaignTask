import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private campaigns: Campaign[] = [];

  constructor() {
    let savedCampaigns = localStorage.getItem('campaigns');
    this.campaigns = savedCampaigns ? JSON.parse(savedCampaigns) : [];
  }

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find((res) => res.id === id);
  }

  addCampaign(campaign: Campaign): void {
    campaign.id = Date.now().toString();

    this.campaigns.push(campaign);
    localStorage.setItem('campaign', JSON.stringify(this.campaigns));
  }

  deleteCampaign(id: string): void {
    let index = this.campaigns.findIndex((res) => res.id === id);
    this.campaigns.splice(index, 1);
    localStorage.setItem('campaign', JSON.stringify(this.campaigns));
  }

  updateCampaign(id: string, updateCampaign: Campaign): void {
    let index = this.campaigns.findIndex((res) => res.id === id);
    this.campaigns[index] = updateCampaign;
    localStorage.setItem('campaign', JSON.stringify(this.campaigns));
  }
}
