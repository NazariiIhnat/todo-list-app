import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddEditModalComponent } from './task-add-edit-modal.component';

describe('TaskAddEditModalComponent', () => {
  let component: TaskAddEditModalComponent;
  let fixture: ComponentFixture<TaskAddEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAddEditModalComponent],
    });
    fixture = TestBed.createComponent(TaskAddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
