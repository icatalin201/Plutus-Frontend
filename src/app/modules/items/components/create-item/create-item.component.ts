import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import { CreateItemRequest } from '../../interfaces/create.item.request';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  public loading: boolean = false;
  public requestForm = this.formBuilder.group({
    item: this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      code: [''],
      uom: [''],
      unitPrice: [0, Validators.required],
      vat: ['0.00', Validators.required],
      type: ['PRODUCT', Validators.required]
    })
  });

  public constructor(
    private appService: AppService,
    private itemService: ItemService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateItemComponent>
  ) { }

  public ngOnInit(): void { }

  public create(): void {
    this.loading = true;
    const request: CreateItemRequest = this.requestForm.value;
    this.itemService
      .create(request)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar
            .open('Item creat.',
              'OK',
              { duration: 3000 })
        },
        e => {
          this.loading = false;
          this.snackbar
            .open('A aparut o eroare.',
              'Inchide',
              { duration: 3000 })
        }
      );
  }

  public dismiss(reload?: boolean): void {
    if (reload) {
      this.appService.reloadData(AppService.RELOAD_ITEMS);
    }
    this.dialogRef.close();
  }

}
