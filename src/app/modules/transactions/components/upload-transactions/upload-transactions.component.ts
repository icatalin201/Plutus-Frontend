import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-upload-transactions',
  templateUrl: './upload-transactions.component.html',
  styleUrls: ['./upload-transactions.component.scss']
})
export class UploadTransactionsComponent implements OnInit {

  public loading: boolean = false;
  public requestForm = this.formBuilder.group({
    transactionsFile: ['', Validators.required]
  });

  public constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private transactionsService: TransactionsService,
    private dialogRef: MatDialogRef<UploadTransactionsComponent>,
  ) { }

  public ngOnInit(): void { }

  public upload(): void {
    this.loading = true;
    this.transactionsService
      .upload(this.requestForm.value)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss();
          this.appService.reloadData(AppService.RELOAD_TRANSACTIONS);
          this.snackbar.open('Fisierul a fost incarcat', 'OK', { duration: 3000 })
        },
        e => {
          this.loading = false;
          const message = e.error.message || 'A aparut o eroare';
          this.snackbar.open(message, 'OK', { duration: 3000 })
        }
      );
  }

  public validateCSV(event: any): void {
    if (event.target.value) {
      const file = event.target.files[0];
      const extension = file.name.split(".")[1];
      if (extension === 'csv') {
        this.changeFile(file).then((base64: string): any => {
          this.requestForm.controls.transactionsFile.setValue(base64);
        });
      } else {
        this.snackbar.open('Incarca un fisier csv valid!', 'OK', { duration: 3000 })
      }
    }
  }

  public dismiss(): void {
    this.dialogRef.close();
  }

  private changeFile(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

}
