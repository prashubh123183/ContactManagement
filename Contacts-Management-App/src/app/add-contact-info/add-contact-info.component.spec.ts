import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactInfoComponent } from './add-contact-info.component';

describe('AddContactInfoComponent', () => {
  let component: AddContactInfoComponent;
  let fixture: ComponentFixture<AddContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
