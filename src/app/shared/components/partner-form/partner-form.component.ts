import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BankService } from 'src/app/core/services/bank.service';
import { CountryService } from 'src/app/core/services/country.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { PartnerService } from 'src/app/core/services/partner.service';
import { Bank } from '../../models/bank';
import { BusinessType } from '../../models/business.type';
import { Country } from '../../models/country';
import { Partner } from '../../models/partner';
import { PartnerForm } from '../../models/partner.form';
import { PartnerType } from '../../models/partner.type';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.sass']
})
export class PartnerFormComponent implements OnInit {

  public partner: PartnerForm = new PartnerForm();
  public loading: boolean = false;

  public types: any[] = [
    { 'name': 'Client', 'value': 1 },
    { 'name': 'Furnizor', 'value': 0 }
  ];
  public businessTypes: any[] = [
    { 'name': 'Persoana Fizica', 'value': 0 },
    { 'name': 'Persoana Juridica', 'value': 1 }
  ];

  public banks: Bank[] = [];
  public countries: Country[] = [];

  @Input()
  public existingPartner: Partner;

  @Output()
  public closed: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private partnerService: PartnerService,
    private bankService: BankService,
    private countryService: CountryService,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    if (this.existingPartner) {
      this.useExistingPartner(this.existingPartner);
    }
    this.bankService
      .getBanks()
      .subscribe(res => this.banks = res);
    this.countryService
      .getCountries()
      .subscribe(res => this.countries = res);
  }

  public cancel(): void {
    this.closed.emit(false);
  }

  public save(): void {
    this.loading = true;
    var observable: Observable<any>;
    if (this.existingPartner) {
      observable = this.partnerService
        .update(this.existingPartner.id, this.partner);
    } else {
      observable = this.partnerService
        .create(this.partner);
    }
    observable.subscribe(
      res => {
        this.loading = false
        this.messagingService.sendSuccess('Succes', 
          `${this.partner.name} a fost salvat!`);
        this.closed.emit(true);
      },
      err => {
        this.loading = false
        this.messagingService.sendError('Eroare', 
          `A aparut o eroare!`);
      }
    )
  }

  private useExistingPartner(partner: Partner): void {
    this.partner.name = partner.name;
    this.partner.email = partner.email;
    this.partner.phone = partner.phone;
    this.partner.address = partner.address;
    this.partner.commercialRegistry = partner.commercialRegistry;
    if (partner.businessType === 'LEGAL') {
      this.partner.businessType = BusinessType.LEGAL;
    } else {
      this.partner.businessType = BusinessType.INDIVIDUAL;
    }
    if (partner.type === 'CLIENT') {
      this.partner.type = PartnerType.CLIENT;
    } else {
      this.partner.type = PartnerType.VENDOR;
    }
    this.partner.vat = partner.vat;
    this.partner.bankAccount = partner.bankAccount;
    if (partner.bank) {
      this.partner.bankId = partner.bank.id;
    }
    this.partner.countryCode = partner.country.code;
  }

}
