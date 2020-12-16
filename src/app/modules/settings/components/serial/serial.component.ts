import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Serial } from 'src/app/classes/serial';
import { DataService } from 'src/app/services/data.service';
import { SerialService } from '../../services/serial.service';

@Component({
  selector: 'app-serial',
  templateUrl: './serial.component.html',
  styleUrls: ['./serial.component.scss']
})
export class SerialComponent implements OnInit {

  public serial: Serial;
  public requestForm = this.formBuilder.group({
    serial: this.formBuilder.group({
      startNumber: ['', Validators.compose([
        Validators.pattern("^[0-9]$"),
        Validators.required
      ])],
    }),
  });

  public constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private serialService: SerialService,
    private snackbar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.dataService
      .findSerial()
      .subscribe(
        res => {
          this.serial = res.serial;
          this.requestForm.setValue(
            { 
              serial: { 
                startNumber: res.serial.startNumber 
              } 
            })
        }
      )
  }

  public save(): void {
    this.serialService
      .save(this.requestForm.value)
      .subscribe(
        _ => {
          this.snackbar.open('Numarul de serie a fost modificat', 'OK', { duration: 3000 })
        }
      )
  }

}
