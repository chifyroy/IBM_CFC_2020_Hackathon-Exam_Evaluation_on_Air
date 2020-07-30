import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseScoreComponent } from './analyse-score.component';

describe('AnalyseScoreComponent', () => {
  let component: AnalyseScoreComponent;
  let fixture: ComponentFixture<AnalyseScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
