import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { ContactInfoService } from '../Service/contact-info.service';

@Component({
  selector: 'app-view-contact-info',
  templateUrl: './view-contact-info.component.html',
  styleUrls: ['./view-contact-info.component.scss']
})

export class ViewContactInfoComponent implements OnInit {

  contactId: any;
  contactDetail : any= [];
   
  constructor(public contactInfoService: ContactInfoService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['contactId'];      
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {       
    this.httpProvider.getContactInfoById(this.contactId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.contactDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }
}