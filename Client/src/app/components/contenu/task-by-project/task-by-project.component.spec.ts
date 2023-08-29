import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByProjectComponent } from './task-by-project.component';

describe('TaskByProjectComponent', () => {
  let component: TaskByProjectComponent;
  let fixture: ComponentFixture<TaskByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskByProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
