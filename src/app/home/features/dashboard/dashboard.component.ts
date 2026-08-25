import { Component, signal } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryDescription: string;
  status: 'pendente' | 'concluida';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CreateTaskComponent],
})
export class DashboardComponent {
  tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Estudar Angular',
      description: 'Revisar signals e forms.',
      category: 'Estudos',
      categoryDescription: 'Aprendizado diário',
      status: 'pendente',
    },
    {
      id: '2',
      title: 'Treinar',
      description: 'Sessão de musculação.',
      category: 'Saúde',
      categoryDescription: 'Exercícios físicos',
      status: 'concluida',
    },
  ]);

  isCreateModalOpen = signal(false);
  isRenameModalOpen = signal(false);
  isDetailsModalOpen = signal(false);
  selectedTask = signal<Task | null>(null);
  renameValue = signal('');

  openCreateModal() {
    this.isCreateModalOpen.set(true);
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
}
