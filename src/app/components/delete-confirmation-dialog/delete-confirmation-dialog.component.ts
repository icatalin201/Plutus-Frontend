import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  public constructor(
    private dialog: MatDialogRef<DeleteConfirmationDialogComponent>
  ) { }

  public ngOnInit(): void { }

  public delete(): void {
    this.dialog.close({ delete: true });
  }

}
