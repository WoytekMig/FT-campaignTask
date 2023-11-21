import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { LastYearsCampaigns } from '../last-year-campaign/last-year-campaign.component';

@NgModule({
  declarations: [
    CampaignFormComponent,
    CampaignListComponent,
    LastYearsCampaigns,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeModule,
  ],
})
export class CampaignModule {}
