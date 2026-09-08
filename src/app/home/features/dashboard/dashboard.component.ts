import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../type';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [MatIconModule],
})
export class DashboardComponent implements OnInit {
  public readonly tasks = signal<Task[]>([]);
  public readonly taskStatusUpdated = signal<'incompleta' | 'concluida'>('incompleta');
  public readonly route = inject(Router);
  private readonly service = inject(TaskService);

  ngOnInit() {
    this.service.getAllTasks().subscribe({
      next: (response) => {
        this.tasks.set(response);
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }

  public updateTaskStatus({
    status,
    taskId,
  }: {
    status: 'incompleta' | 'concluida';
    taskId: string;
  }) {
    this.service.updateTaskStatus(taskId, status).subscribe({
      next: (response) => {
        if (response.success) {
          const getTask = this.service.getAllTasks().subscribe({
            next: (response) => {
              this.tasks.set(response);
            },
            error: (error) => {},
          });
        }
      },
    });
  }

  public openRename({ labelId }: { labelId: string }) {
    this.route.navigate(['/home/renomear', labelId], {
      state: this.tasks().find((s) => s.id === labelId),
    });
  }

  public openCreateTask() {
    this.route.navigate(['/home/create-task']);
  }
}
