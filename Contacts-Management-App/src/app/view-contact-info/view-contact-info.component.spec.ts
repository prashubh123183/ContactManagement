import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactInfoComponent } from './view-contact-info.component';

describe('ViewContactInfoComponent', () => {
  let component: ViewContactInfoComponent;
  let fixture: ComponentFixture<ViewContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContactInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
