import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss']
})

  export class HomeComponent implements OnInit {
    closeResult = '';
    contactInfo: any = [];
    constructor(private router: Router, private modalService: NgbModal,
      private toastr: ToastrService, private httpProvider : HttpProviderService) { }
  
    ngOnInit(): void {
      this.getAllContacts();
    }
    async getAllContacts() {
      this.httpProvider.getAllContacts().subscribe((data : any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.contactInfo = resultData;
          }
        }
      },
      (error : any)=> {
          if (error) {
            if (error.status == 404) {
              if(error.error && error.error.message){
                this.contactInfo = [];
              }
            }
          }
        });
    }
  
    AddContactInfo() {
      this.router.navigate(['AddContactInfo']);
    }
  
    deleteContactInfoConfirmation(contactInfo: any) {
      this.modalService.open(MODALS['deleteModal'],
        {
          ariaLabelledBy: 'modal-basic-title'
        }).result.then((result) => {
          this.deleteContactInfo(contactInfo);
        },
          (reason) => {});
    }
  
    deleteContactInfo(contactInfo: any) {
      this.httpProvider.deleteContactInfoById(contactInfo.id).subscribe((data : any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            this.getAllContacts();
          }
        }
      },
      (error : any) => {});
    }
  }

