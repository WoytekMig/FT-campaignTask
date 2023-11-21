import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountStatusService } from '../account-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  accountStatus: number | undefined;
  private subscription: Subscription;

  constructor(private accountStatusService: AccountStatusService) {
    this.subscription = this.accountStatusService.accountStatus$.subscribe(
      (data) => (this.accountStatus = data)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
