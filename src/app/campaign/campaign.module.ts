import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CampaignFormComponent, CampaignListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CampaignModule {}
