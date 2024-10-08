import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInfoService } from './contact-info.service';

var apiUrl = "http://localhost:8100/";

var httpLink = {
  getAllContactInfo: apiUrl + "/api/contacts/getAll",
  deleteContactById: apiUrl + "/api/contacts/deleteContactById",
  getContactInfoById: apiUrl + "/api/contacts/getContactInfoById",
  saveContact: apiUrl + "/api/contacts/saveContact"
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(private webApiService: ContactInfoService) { }

  public getAllContacts(): Observable<any> {
    return this.webApiService.get(httpLink.getAllContactInfo);
  }
  public deleteContactInfoById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteContactById + '?employeeId=' + model, "");
  }
  public getContactInfoById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getContactInfoById + '?employeeId=' + model);
  }
  public saveContactInfo(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveContact, model);
  }  
}  