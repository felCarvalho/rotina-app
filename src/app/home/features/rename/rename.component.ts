import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { form, FormField, FormRoot, required, validateHttp } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'rename-modal',
  templateUrl: './rename.component.html',
  imports: [FormField, FormRoot, MatIcon],
})
export class RenameComponent implements OnInit, OnDestroy {
  public readonly labelId = signal<string>('');
  public readonly labelName = signal<{ labelName: string }>({ labelName: '' });
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  //inicia automaticamente ao entrar no componente, pega o id do label e seta no signal
  ngOnInit() {
    this.labelName.update((s) => ({
      ...s,
      labelName: history.state.title,
    }));
    this.route.params.subscribe((params) => {
      this.labelId.set(params['labelId']);
    });
  }

  updateLabelName = form(this.labelName, (schema) => {
    required(schema.labelName, { message: 'Campo de renomear não pode ser vazio' });
  });

  public updateTitleTask() {
    console.log(this.labelName, this.labelId);
    this.taskService.updateTitle(this.labelId(), this.labelName().labelName).subscribe({
      next: (response) => {
        this.taskService.getAllTasks();
        alert(response.data);
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      error(err: { error: { error: string; statusCode: number; message: string } }) {
        console.log(err.error.message);
        alert(err.error.message);
      },
    });
  }

  //navega de volta para a tela anterior queo usuário estava antes de abrir o modal
  navigateBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  //destroi o componente e navega de volta para a tela anterior
  ngOnDestroy() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
