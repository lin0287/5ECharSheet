import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatsTraitsComponent } from './feats-traits.component';

describe('FeatsTraitsComponent', () => {
  let component: FeatsTraitsComponent;
  let fixture: ComponentFixture<FeatsTraitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatsTraitsComponent]
    });
    fixture = TestBed.createComponent(FeatsTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
