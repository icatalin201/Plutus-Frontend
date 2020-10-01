import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import { Partner } from '../../classes/partner';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {

  public loading: boolean = false;
  public requestForm = this.formBuilder.group({
    partner: this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern("^[a-zA-Z ]{2,30}$"), 
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.email, 
        Validators.required
      ])],
      phone: ['', Validators.pattern("^[0-9]{10}$")],
      type: ['CLIENT', Validators.required]
    }),

  });
  private partner: Partner;

  public constructor(
    private appService: AppService,
    private partnerService: PartnerService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPartnerComponent>,
    @Inject(MAT_DIALOG_DATA) data: Partner
  ) {
    this.partner = data;
  }

  public ngOnInit(): void {
    const formValue = {
      partner: {
        name: this.partner.name,
        email: this.partner.email,
        phone: this.partner.phone,
        type: this.partner.type
      },
    }
    this.requestForm.setValue(formValue);
  }

  public update(): void {
    this.loading = true;
    this.partnerService.update(this.partner.id, this.requestForm.value)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar.open('Partner updated', 'OK', { duration: 3000 })
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
