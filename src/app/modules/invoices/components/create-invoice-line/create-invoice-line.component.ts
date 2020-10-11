import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/modules/items/classes/item';
import { ItemService } from 'src/app/modules/items/services/item.service';

@Component({
  selector: 'app-create-invoice-line',
  templateUrl: './create-invoice-line.component.html',
  styleUrls: ['./create-invoice-line.component.scss']
})
export class CreateInvoiceLineComponent implements OnInit {

  public items: Item[] = [];
  public lineForm = this.formBuilder.group({
    item: ['', Validators.required],
    quantity: [1, Validators.required],
    vat: ['0.00', Validators.required],
    price: ['1.00', Validators.required],
    uom: ['']
  });

  public constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private dialogRef: MatDialogRef<CreateInvoiceLineComponent>
  ) { }

  public ngOnInit(): void {
    this.itemService
      .findAll({ size: 100, number: 0 })
      .subscribe(
        res => this.items = res.items
      )
  }

  public save(): void {
    this.dialogRef.close(this.lineForm.value)
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public onSelectItem(item: Item): void {
    this.lineForm.controls.vat.setValue(item.vat.toFixed(2));
    this.lineForm.controls.price.setValue(item.unitPrice.toFixed(2));
    this.lineForm.controls.uom.setValue(item.uom);
  }

}
