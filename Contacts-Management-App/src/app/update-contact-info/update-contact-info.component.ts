import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-update-contact-info',
  templateUrl: './update-contact-info.component.html',
  styleUrls: ['./update-contact-info.component.scss']
})

export class UpdateContactInfoComponent implements OnInit {
  editContactForm: contactForm = new contactForm();

  @ViewChild("contactForm")
  contactForm!: NgForm;

  isSubmitted: boolean = false;
  contactId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['contactId'];
    this.getContactInfoById();
  }
  getContactInfoById() {
    this.httpProvider.getContactInfoById(this.contactId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editContactForm.Id = resultData.id;
          this.editContactForm.FirstName = resultData.firstName;
          this.editContactForm.LastName = resultData.lastName;
          this.editContactForm.Email = resultData.email;
        }
      }
    },
      (error: any) => { });
  }

  EditContactInfo(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveContactInfo(this.editContactForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
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
  Id: number = 0;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
}