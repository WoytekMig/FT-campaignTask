import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../models/campaign';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountStatusService } from '../account-status.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent implements OnInit {
  campaignForm: FormGroup = new FormGroup({});
  townOptions: string[] = ['Cracow', 'Warsaw', 'Poznan', 'Gdansk', 'Lodz'];
  accountStatus: number = this.accountStatusService.getAccountStatus();
  keywords: string[] = ['TV', 'free-time', 'sport', 'food', 'drink', 'wear'];

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountStatusService: AccountStatusService
  ) {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      selectedKeywords: [[]],
      bidAmount: ['', [Validators.required, Validators.min(1500)]],
      campaignFund: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.accountStatus),
        ],
      ],
      status: ['', Validators.required],
      town: [''],
      radius: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      let campaign = this.campaignService.getCampaign(id);
      if (campaign) {
        this.campaignForm.patchValue(campaign);

        const campaignFundControl = this.campaignForm.get('campaignFund');
        if (campaignFundControl) {
          this.accountStatusService.updatedAccountStatus(
            campaignFundControl.value
          );
        }
      }
    }
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      let campaign: Campaign = this.campaignForm.value;
      campaign.keywords = this.campaignForm.value.selectedKeywords;

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        //Updating
        this.campaignService.updateCampaign(id, campaign);
      } else {
        //Creating new
        this.campaignService.addCampaign(campaign);
      }

      this.router.navigate(['/list']);
    }
  }
}
