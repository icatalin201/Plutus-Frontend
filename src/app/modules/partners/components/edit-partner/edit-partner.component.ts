import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bank } from 'src/app/classes/bank';
import { Country } from 'src/app/classes/country';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { Partner } from '../../classes/partner';
import { UpdatePartnerRequest } from '../../interfaces/update.partner.request';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {

  public loading: boolean = false;
  public banks: Bank[] = [];
  public countries: Country[] = [];
  public requestForm = this.formBuilder.group({
    partner: this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern("^[a-zA-Z ]{2,30}$"),
        Validators.required
      ])],
      email: [null, Validators.email],
      type: ['CLIENT', Validators.required],
      businessType: ['INDIVIDUAL', Validators.required],
      phone: ['', Validators.pattern("^[0-9]{10}$")],
      countryCode: ['RO', Validators.required],
      bankId: [''],
      address: [''],
      vat: [''],
      bankAccount: [''],
      commercialRegistry: [''],
      termInDays: [''],
    }),
  });
  private partner: Partner;

  public constructor(
    private appService: AppService,
    private dataService: DataService,
    private partnerService: PartnerService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) data: Partner
  ) {
    this.partner = data;
  }

  public ngOnInit(): void {
    this.dataService
      .findBanks()
      .subscribe(
        res => this.banks = res.banks
      );
    this.dataService
      .findCountries()
      .subscribe(
        res => this.countries = res.countries
      );
    const formValue = {
      partner: {
        name: this.partner.name,
        email: this.partner.email,
        phone: this.partner.phone,
        type: this.partner.type,
        businessType: this.partner.businessType,
        countryCode: this.partner.country.code,
        address: this.partner.address,
        bankAccount: this.partner.bankAccount,
        bankId: this.partner.bank === null ? null : this.partner.bank.id,
        vat: this.partner.vat,
        commercialRegistry: this.partner.commercialRegistry,
        termInDays: this.partner.termInDays
      },
    }
    this.requestForm.setValue(formValue);
  }

  public update(): void {
    this.loading = true;
    const request: UpdatePartnerRequest = this.requestForm.value;
    this.partnerService
      .update(this.partner.id, request)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar.open('Partenerul a fost actualizat', 'OK', { duration: 3000 })
        },
        e => {
          this.loading = false;
          const message = e.error.message || 'A aparut o eroare';
          this.snackbar.open(message, 'Inchide', { duration: 3000 })
        }
      );
  }

  public dismiss(reload?: boolean): void {
    if (reload) {
      this.appService.reloadData(AppService.RELOAD_PARTNERS);
    }
    this.dialogRef.close();
  }

}
