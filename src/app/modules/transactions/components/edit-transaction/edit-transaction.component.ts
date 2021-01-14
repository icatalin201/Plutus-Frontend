import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Partner } from 'src/app/modules/partners/classes/partner';
import { PartnerService } from 'src/app/modules/partners/services/partner.service';
import { AppService } from 'src/app/services/app.service';
import { Transaction } from '../../classes/transaction';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {

  public partners: Partner[] = [];
  public loading: boolean = false;
  public requestForm = this.formBuilder.group({
    transaction: this.formBuilder.group({
      partnerId: ['', Validators.required],
      document: ['', Validators.required],
      details: ['', Validators.required],
      value: ['', Validators.required],
      date: [new Date(), Validators.required],
      deductible: [false, Validators.required],
      type: ['INCOME', Validators.required],
      method: ['BANK', Validators.required],
    })
  });
  private transaction: Transaction

  public constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private transactionsService: TransactionsService,
    private partnerService: PartnerService,
    private dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) data: Transaction
  ) {
    this.transaction = data;
  }

  public ngOnInit(): void {
    this.partnerService
    .findAll({ size: 100, number: 0 })
    .subscribe(
      res => this.partners = res.partners
    )
    const formValue = {
      transaction: {
        partnerId: this.transaction.partner.id,
        document: this.transaction.document,
        details: this.transaction.details,
        value: this.transaction.value,
        date: this.transaction.date,
        type: this.transaction.type,
        method: this.transaction.method,
        deductible: this.transaction.deductible
      },
    }
    this.requestForm.setValue(formValue);
  }

  public onSelectPartner(partner: Partner): void {
    const transactionGroup: FormGroup = this.requestForm.controls.transaction as FormGroup;
    transactionGroup.controls.type.setValue(partner.type.toString() === 'CLIENT' ? 'INCOME' : 'EXPENSE');
  }

  public update(): void {
    this.loading = true;
    const request = this.requestForm.value;
    this.transactionsService
      .update(request, this.transaction.id)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar.open('Tranzactie actualizata', 'OK', { duration: 3000 })
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

}
