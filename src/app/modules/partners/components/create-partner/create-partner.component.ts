import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bank } from 'src/app/classes/bank';
import { Country } from 'src/app/classes/country';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { CreatePartnerRequest } from '../../interfaces/create.partner.request';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.scss']
})
export class CreatePartnerComponent implements OnInit {

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

  public constructor(
    private appService: AppService,
    private dataService: DataService,
    private partnerService: PartnerService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreatePartnerComponent>
  ) { }

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
  }

  public create(): void {
    this.loading = true;
    const request: CreatePartnerRequest = this.requestForm.value;
    this.partnerService
      .create(request)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar.open('Partner created', 'OK', { duration: 3000 })
        },
        e => {
          this.loading = false;
          const message = e.error.message || 'Something went wrong.';
          this.snackbar.open(message, 'Dismiss', { duration: 3000 })
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
