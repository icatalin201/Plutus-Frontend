import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading: boolean = false;
  public hidePassword: boolean = true;
  public appName: string;
  public requestForm = this.formBuilder.group({
    user: this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.pattern(''), Validators.required])],
    }),
  });

  public constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.appName = this.dataService.getAppName();
  }

  public register(): void {
    this.loading = true;
    this.registerService
      .register(this.requestForm.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.loading = false;
          this.router.navigate(['/login'], { replaceUrl: true });
          this.snackbar.open('You can login now', 'OK', { duration: 3000 })
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          const message = err.error.message || 'Something went wrong!';
          this.loading = false;
          this.snackbar.open(message, 'Dismiss', { duration: 3000 });
        }
      );
  }

}
