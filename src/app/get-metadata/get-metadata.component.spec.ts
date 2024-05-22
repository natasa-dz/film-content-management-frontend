import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMetadataComponent } from './get-metadata.component';

describe('GetMetadataComponent', () => {
  let component: GetMetadataComponent;
  let fixture: ComponentFixture<GetMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMetadataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
