import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import { Item } from '../../classes/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

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
  private item: Item;

  public constructor(
    private appService: AppService,
    private itemService: ItemService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: Item,
  ) {
    this.item = data;
  }

  public ngOnInit(): void {
    const formValue = {
      item: {
        name: this.item.name,
        description: this.item.description,
        unitPrice: this.item.unitPrice,
        code: this.item.code,
        vat: this.item.vat.toFixed(2),
        uom: this.item.uom,
        type: this.item.type
      }
    }
    this.requestForm.setValue(formValue);
  }

  public update(): void {
    this.loading = true;
    this.itemService.update(this.item.id, this.requestForm.value)
    .subscribe(
      r => {
        this.loading = false;
        this.dismiss(true);
        this.snackbar.open('Item actualizat', 'OK', { duration: 3000 })
      },
      e => {
        this.loading = false;
        const message = e.error.message || 'A aparut o eroare.';
        this.snackbar.open(message, 'Inchide', { duration: 3000 })
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
