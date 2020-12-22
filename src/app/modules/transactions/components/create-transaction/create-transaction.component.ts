import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Partner } from 'src/app/modules/partners/classes/partner';
import { PartnerService } from 'src/app/modules/partners/services/partner.service';
import { AppService } from 'src/app/services/app.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public partners: Partner[] = [];
  public loading: boolean = false;
  public requestForm = this.formBuilder.group({
    transaction: this.formBuilder.group({
      partnerId: ['', Validators.required],
      document: ['', Validators.required],
      details: ['', Validators.required],
      value: ['', Validators.required],
      date: [new Date(), Validators.required],
      type: ['INCOME', Validators.required],
      method: ['BANK', Validators.required],
    })
  });

  public constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private transactionsService: TransactionsService,
    private partnerService: PartnerService,
    private dialogRef: MatDialogRef<CreateTransactionComponent>
  ) { }

  public ngOnInit(): void {
    this.partnerService
    .findAll({ size: 100, number: 0 })
    .subscribe(
      res => this.partners = res.partners
    )
  }

  public onSelectPartner(partner: Partner): void {
    const transactionGroup: FormGroup = this.requestForm.controls.transaction as FormGroup;
    transactionGroup.controls.type.setValue(partner.type.toString() === 'CLIENT' ? 'INCOME' : 'EXPENSE');
  }

  public create(): void {
    this.loading = true;
    const request = this.requestForm.value;
    request.transaction.date = this.formatDate(this.requestForm.value.transaction.date);
    this.transactionsService
      .create(request)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar.open('Tranzactie creata', 'OK', { duration: 3000 })
        },
        e => {
          this.loading = false;
          const message = e.error.message || 'A aparut o eroare.';
          this.snackbar.open(message, 'OK', { duration: 3000 })
        }
      );
  }

  public dismiss(reload?: boolean): void {
    if (reload) {
      this.appService.reloadData(AppService.RELOAD_TRANSACTIONS);
    }
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${year}-${month}-${day}`
  }

}
