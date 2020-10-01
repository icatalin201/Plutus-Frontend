import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.scss']
})
export class CreatePartnerComponent implements OnInit {

  public loading: boolean = false;
  public requestForm = this.formBuilder.group({
    partner: this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.pattern("^[a-zA-Z ]{2,30}$"), Validators.required])],
      lastName: ['', Validators.compose([Validators.pattern("^[a-zA-Z ]{2,30}$"), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      phone: ['', Validators.pattern("^[0-9]{10}$")],
      type: ['CLIENT', Validators.required]
    }),
    business: this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.compose([Validators.pattern("^[a-zA-Z ]{2,30}$"), Validators.required])],
      cui: ['', Validators.compose([Validators.pattern('^[0-9]{8}$'), Validators.required])],
      iban: ['', Validators.compose([Validators.pattern('^[0-9A-Z]{24}$'), Validators.required])],
      regCom: ['', Validators.required],
      address: this.formBuilder.group({
        name: ['', Validators.required],
        city: ['', Validators.required],
        countyId: [0, Validators.required],
        zip: ['', Validators.pattern('^[0-9]{6,10}$')]
      })
    })
  });

  public constructor(
    private appService: AppService,
    private partnerService: PartnerService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreatePartnerComponent>
  ) { }

  public ngOnInit(): void { }

  public create(): void {
    this.loading = true;
    this.partnerService.create(this.requestForm.value)
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
