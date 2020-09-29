import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public question: string;

  public constructor(
    private dialog: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) question: string
  ) {
    this.question = question;
  }

  public ngOnInit(): void { }

  public confirm(): void {
    this.dialog.close({ confirm: true });
  }

}
