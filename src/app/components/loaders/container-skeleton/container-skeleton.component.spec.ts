import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSkeletonComponent } from './container-skeleton.component';

describe('ContainerSkeletonComponent', () => {
  let component: ContainerSkeletonComponent;
  let fixture: ComponentFixture<ContainerSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
