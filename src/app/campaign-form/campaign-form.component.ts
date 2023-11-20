import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent implements OnInit {
  campaignForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

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
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      console.log('VALID');
    }
  }
}
