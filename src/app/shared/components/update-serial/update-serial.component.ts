import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { SerialService } from 'src/app/core/services/serial.service';
import { Serial } from '../../models/serial';

@Component({
  selector: 'app-update-serial',
  templateUrl: './update-serial.component.html',
  styleUrls: ['./update-serial.component.sass']
})
export class UpdateSerialComponent implements OnInit {

  public serial: Serial;
  public serialName: string = "";
  public loading: boolean = false;

  constructor(
    private serialService: SerialService,
    private messagingService: MessagingService,
  ) { }

  ngOnInit(): void {
    this.serialService
      .getSerial()
      .subscribe(res => {
        this.serial = res;
        this.setSerial(res);
      });
  }

  public save(): void {
    this.serialService
      .save(this.serial.startNumber)
      .subscribe(
        res => {
          this.loading = false
          this.messagingService.sendSuccess('Succes', 
            `Seria a fost actualizata!`);
          this.setSerial(this.serial);
        },
        err => {
          this.loading = false
          this.messagingService.sendError('Eroare', 
            `A aparut o eroare!`);
        }
      )
  }

  private setSerial(serial: Serial): void {
    const name = ("000" + serial.nextNumber).slice(-4);
    this.serialName = `${serial.name}${name}`
  }

}
