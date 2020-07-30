import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureQuestionsComponent } from './configure-questions.component';

describe('ConfigureQuestionsComponent', () => {
  let component: ConfigureQuestionsComponent;
  let fixture: ComponentFixture<ConfigureQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
