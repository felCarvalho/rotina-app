import { Component, signal } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import {Task} from '../../type';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CreateTaskComponent],
})
export class DashboardComponent {
  private readonly tasks = signal<Task[]>([])
  public isCreateModalOpen = signal<boolean>(false);

  public openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

}

/**
 * tasks = signal<Task[]>([]);

  isCreateModalOpen = signal(false);
  isRenameModalOpen = signal(false);
  isDetailsModalOpen = signal(false);
  selectedTask = signal<Task | null>(null);
  renameValue = signal('');

  openCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  openRenameModal(task: Task) {
    this.selectedTask.set(task);
    this.renameValue.set(task.title);
    this.isRenameModalOpen.set(true);
  }

  closeRenameModal() {
    this.isRenameModalOpen.set(false);
    this.selectedTask.set(null);
  }

  renameTask() {
    const task = this.selectedTask();
    const value = this.renameValue().trim();

    if (!task || !value) {
      return;
    }

    this.tasks.update((list) => list.map((t) => (t.id === task.id ? { ...t, title: value } : t)));
    this.closeRenameModal();
  }

  openDetailsModal(task: Task) {
    this.selectedTask.set(task);
    this.isDetailsModalOpen.set(true);
  }

  closeDetailsModal() {
    this.isDetailsModalOpen.set(false);
    this.selectedTask.set(null);
  }

  toggleStatus(task: Task) {
    this.tasks.update((list) =>
      list.map((t) =>
        t.id === task.id ? { ...t, status: t.status === 'pendente' ? 'concluida' : 'pendente' } : t,
      ),
    );
  }

  deleteTask(task: Task) {
    this.tasks.update((list) => list.filter((t) => t.id !== task.id));
  }
 */