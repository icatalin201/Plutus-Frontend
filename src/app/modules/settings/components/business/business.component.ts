import { Component, OnInit } from '@angular/core';
import { BusinessDto } from '../../classes/business.dto';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  public loading: boolean = false;
  public business: BusinessDto

  public constructor(
    private businessService: BusinessService
  ) { }

  public ngOnInit(): void {
    this.businessService
      .find()
      .subscribe(
        res => this.business = res.business
      )
  }

}
