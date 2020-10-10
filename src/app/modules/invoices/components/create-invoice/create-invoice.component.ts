import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Serial } from 'src/app/classes/serial';
import { Item } from 'src/app/modules/items/classes/item';
import { ItemService } from 'src/app/modules/items/services/item.service';
import { Partner } from 'src/app/modules/partners/classes/partner';
import { PartnerService } from 'src/app/modules/partners/services/partner.service';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { CreateInvoiceDto } from '../../classes/create.invoice';
import { CreateInvoiceRequest } from '../../interfaces/create.invoice.request';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  public partners: Partner[] = [];
  public serials: Serial[] = [];
  public items: Item[] = [];
  public loading: boolean = false;
  public serialName: string | undefined;
  public request: CreateInvoiceDto = new CreateInvoiceDto();
  public requestForm = this.formBuilder.group({
    invoice: this.formBuilder.group({
      partnerId: ['', Validators.required],
      serialId: ['', Validators.required],
      date: [new Date(), Validators.required],
      dueDate: [new Date(), Validators.required],
      currency: ['RON', Validators.required],
      lines: this.formBuilder.array([
        this.formBuilder.group({
          itemId: ['', Validators.required],
          quantity: [1, Validators.required],
          vat: ['0.00', Validators.required],
          unitPrice: [1.00, Validators.required],
          uom: ['']
        })
      ])
    })
  });

  public constructor(
    private invoiceService: InvoiceService,
    private appService: AppService,
    private dataService: DataService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private itemService: ItemService,
    private dialogRef: MatDialogRef<CreateInvoiceComponent>
  ) { }

  public ngOnInit(): void {
    this.partnerService
      .findAll({ size: 100, number: 0 })
      .subscribe(
        res => this.partners = res.partners
      )
    this.itemService
      .findAll({ size: 100, number: 0 })
      .subscribe(
        res => this.items = res.items
      )
    this.dataService
      .findSerials()
      .subscribe(
        res => this.serials = res.serials
      )
  }

  public addLine(): void {
    const invoiceGroup: FormGroup = this.requestForm.controls.invoice as FormGroup;
    const lines: FormArray = invoiceGroup.controls.lines as FormArray;
    lines.push(this.formBuilder.group({
      itemId: ['', Validators.required],
      quantity: [1, Validators.required],
      vat: ['0.00', Validators.required],
      unitPrice: [1.00, Validators.required],
      uom: ['']
    }));
  }

  public deleteLine(line: FormGroup): void {
    const invoiceGroup: FormGroup = this.requestForm.controls.invoice as FormGroup;
    const lines: FormArray = invoiceGroup.controls.lines as FormArray;
    if (lines.length === 1) return;
    lines.removeAt(lines.value.findIndex((l: any) => l === line.value));
  }

  public create(): void {
    this.loading = true;
    const request: CreateInvoiceRequest = this.requestForm.value;
    request.invoice.date = new Date(request.invoice.date).toISOString().split("T")[0];
    request.invoice.dueDate = new Date(request.invoice.dueDate).toISOString().split("T")[0];
    this.invoiceService
      .create(request)
      .subscribe(
        r => {
          this.loading = false;
          this.dismiss(true);
          this.snackbar.open('Invoice created', 'OK', { duration: 3000 })
        },
        e => {
          this.loading = false;
          const message = e.error.message || 'Something went wrong.';
          this.snackbar.open(message, 'Dismiss', { duration: 3000 })
        }
      );
  }

  public onSelectItem(item: Item, line: FormGroup): void {
    line.controls.vat.setValue(item.vat.toFixed(2));
    line.controls.unitPrice.setValue(item.unitPrice);
    line.controls.uom.setValue(item.uom);
  }

  public onSelectSerial(serial: Serial): void {
    const name = ("000" + serial.nextNumber).slice(-4);
    this.serialName = `${serial.name}${name}`
  }

  public dismiss(reload?: boolean): void {
    if (reload) {
      this.appService.reloadData(AppService.RELOAD_INVOICES);
    }
    this.dialogRef.close();
  }

  public getLines(): any[] {
    const invoiceGroup: FormGroup = this.requestForm.controls.invoice as FormGroup;
    const lines: FormArray = invoiceGroup.controls.lines as FormArray;
    return lines.controls;
  }

}
