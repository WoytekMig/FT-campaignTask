import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../models/campaign';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent implements OnInit {
  campaignForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      tags: ['', Validators.required],
      bidAmount: [
        '',
        Validators.required,
      ] /* ['', [Validators.required, Validators.min(1000)]], */,
      campaignFund: ['', Validators.required],
      status: ['', Validators.required],
      /* ['', [Validators.required, Validators.requiredTrue]],  */
      town: ['Cracow'],
      radius: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      let campaign = this.campaignService.getCampaign(id);
      if (campaign) {
        this.campaignForm.patchValue(campaign);
      }
    }
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      let campaign: Campaign = this.campaignForm.value;

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
