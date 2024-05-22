import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilmComponent } from './upload-film.component';

describe('UploadFilmComponent', () => {
  let component: UploadFilmComponent;
  let fixture: ComponentFixture<UploadFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFilmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
