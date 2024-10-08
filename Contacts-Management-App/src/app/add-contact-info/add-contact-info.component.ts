import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
    selector: 'app-add-contact-info', 
    templateUrl: './add-contact-info.component.html',
    styleUrls: ['./add-contact-info.component.scss']
  })

export class AddContactInfoComponent implements OnInit {
  addContactForm: contactForm = new contactForm();

  @ViewChild("contactForm")
  contactForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {  }

  AddContactInfo(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveContactInfo(this.addContactForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}


export class contactForm {
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
}