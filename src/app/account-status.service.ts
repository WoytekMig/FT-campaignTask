import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountStatusService {
  private accountStatusSubject = new BehaviorSubject<number>(50000);
  accountStatus$ = this.accountStatusSubject.asObservable();

  getAccountStatus(): number {
    return this.accountStatusSubject.value;
  }

  updatedAccountStatus(campaignFundAmount: number) {
    this.accountStatusSubject.next(
      this.accountStatusSubject.value - campaignFundAmount
    );
  }
  constructor() {}
}
