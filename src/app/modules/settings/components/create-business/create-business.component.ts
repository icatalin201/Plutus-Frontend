import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bank } from 'src/app/classes/bank';
import { DataService } from 'src/app/services/data.service';
import { UpdateBusinessRequest } from '../../interfaces/update.business.request';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit {

  public loading: boolean = false;
  public banks: Bank[] = [];
  public requestForm = this.formBuilder.group({
    business: this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern("^[a-zA-Z ]{2,30}$"),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      phone: ['', Validators.pattern("^[0-9]{10}$")],
      bankId: ['', Validators.required],
      address: ['', Validators.required],
      vat: ['', Validators.required],
      vies: [''],
      website: [''],
      bankAccount: ['', Validators.required],
      commercialRegistry: ['', Validators.required],
    }),
  });

  public constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private dataService: DataService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.dataService
      .findBanks()
      .subscribe(
        res => this.banks = res.banks
      )
    this.businessService
      .find()
      .subscribe(
        res => this.requestForm.setValue(res)
      )
  }

  public save(): void {
    this.loading = true;
    const request: UpdateBusinessRequest = this.requestForm.value;
    this.businessService
      .save(request)
      .subscribe(
        r => {
          this.loading = false;
          this.snackbar.open('Data saved', 'OK', { duration: 3000 })
        },
        e => {
          this.loading = false;
          const message = e.error.message || 'Something went wrong.';
          this.snackbar.open(message, 'Dismiss', { duration: 3000 })
        }
      );
  }

}
