import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { TaskStatusModel } from '../../../models/task-status.model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-task-add-popup',
  templateUrl: './task-add-popup.component.html',
  styleUrls: ['./task-add-popup.component.css']
})
export class TaskAddPopupComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() taskStatusList: TaskStatusModel[] = [];
  @Input() userList: User[] = [];
  @Output() saveTask = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  newTaskData: any = {
    title: '',
    description: '',
    statusId: null,
    userId: null
  };

  ngOnInit(): void {
    console.log(this.userList);
  }

  onSave() {
    if (this.isFormValid()) {
      this.saveTask.emit(this.newTaskData);
    } else {
        notify('Debe de llenar todos los campos', 'error', 2000)
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private isFormValid(): boolean {
    return (
      this.newTaskData.title &&
      this.newTaskData.description &&
      this.newTaskData.statusId &&
      this.newTaskData.userId
    );
  }
}
