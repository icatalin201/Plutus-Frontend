import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Serial } from 'src/app/classes/serial';
import { Item } from 'src/app/modules/items/classes/item';
import { ItemService } from 'src/app/modules/items/services/item.service';
import { Partner } from 'src/app/modules/partners/classes/partner';
import { PartnerService } from 'src/app/modules/partners/services/partner.service';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { CreateInvoiceDto } from '../../classes/create.invoice';
import { CreateInvoiceLineDto } from '../../classes/create.invoice.line';
import { InvoiceLine } from '../../classes/invoice.line';
import { CreateInvoiceRequest } from '../../interfaces/create.invoice.request';
import { InvoiceService } from '../../services/invoice.service';
import { CreateInvoiceLineComponent } from '../create-invoice-line/create-invoice-line.component';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  public partners: Partner[] = [];
  public serials: Serial[] = [];
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
    })
  });
  public lines = [];
  public columnLinesToDisplay: string[] = ['item', 'price', 'quantity', 'uom', 'vat'];

  public constructor(
    private invoiceService: InvoiceService,
    private appService: AppService,
    private dataService: DataService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateInvoiceComponent>
  ) { }

  public ngOnInit(): void {
    this.partnerService
      .findAll({ size: 100, number: 0 })
      .subscribe(
        res => this.partners = res.partners
      )
    this.dataService
      .findSerials()
      .subscribe(
        res => this.serials = res.serials
      )
  }

  public addLine(): void {
    const ref = this.dialog.open(CreateInvoiceLineComponent);
    ref.afterClosed()
      .subscribe(data => {
        if (data) {
          this.lines.push(data);
          this.lines = [...this.lines];
        }
      })
  }

  public deleteLine(line: any): void {
    this.lines.splice(this.lines.indexOf(line), 1);
  }

  public create(): void {
    this.loading = true;
    const request: CreateInvoiceRequest = this.requestForm.value;
    const lines: CreateInvoiceLineDto[] = [];
    this.lines.forEach(line => {
      const element = new CreateInvoiceLineDto();
      element.itemId = line.item.id;
      element.price = line.price;
      element.quantity = line.quantity;
      element.uom = line.uom;
      element.vat = line.vat;
    })
    request.invoice.lines = lines;
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

}
