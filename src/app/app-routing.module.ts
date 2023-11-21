import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { LastYearsCampaigns } from './last-year-campaign/last-year-campaign.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: CampaignListComponent },
  { path: 'new', component: CampaignFormComponent },
  { path: 'edit/:id', component: CampaignFormComponent },
  { path: 'list-past', component: LastYearsCampaigns },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
