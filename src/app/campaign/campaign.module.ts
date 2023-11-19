import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { CampaignListComponent } from '../campaign-list/campaign-list.component';



@NgModule({
  declarations: [
    CampaignFormComponent,
    CampaignListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CampaignModule { }
