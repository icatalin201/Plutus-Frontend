import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-view-partners',
  templateUrl: './view-partners.component.html',
  styleUrls: ['./view-partners.component.sass']
})
export class ViewPartnersComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

}
