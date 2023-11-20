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
  townOptions: string[] = ['Cracow', 'Warsaw', 'Poznan', 'Gdansk', 'Lodz'];
  /*   newTown: string = ''; */

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: ['', [Validators.required, Validators.min(1500)]],
      campaignFund: ['', Validators.required],
      status: ['', Validators.required],
      town: [''],
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

  onTownChange() {
    let selectedTown = this.campaignForm.get('town')?.value;
    /*     if (selectedTown === 'other...') {
      this.newTown = '';
    } */
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
