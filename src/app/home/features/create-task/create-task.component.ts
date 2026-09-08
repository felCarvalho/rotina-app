import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, FormRoot, validateHttp } from '@angular/forms/signals';
import { TaskService } from '../../services/task.service';
import { PostTask } from '../../type';
import { environments } from '../../../../environments/environments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  imports: [FormField, FormRoot],
})
export class CreateTaskComponent {
  private readonly service = inject(TaskService);
  private readonly route = inject(Router);
  private readonly createTask = signal<PostTask>({
    titleTask: '',
    descriptionTask: '',
    titleCategory: '',
    descriptionCategory: '',
  });

  public clearForm() {
    this.createTask.set({
      titleTask: '',
      descriptionTask: '',
      titleCategory: '',
      descriptionCategory: '',
    });
  }

  public isBack() {
    this.route.navigate(['/home']);
  }

  createTaskForm = form(
    this.createTask,
    (schema) => {
      required(schema.titleTask, { message: 'Campo de título é obrigatório' });
      required(schema.titleCategory, { message: 'Campo de categoria é obrigatório' });
      validateHttp(schema.titleTask, {
        request: ({ value }) => ({
          url: `${environments.apiUrl}verify/task/title/check/${value()}`,
          credentials: 'include',
        }),
        onSuccess: (response: { error: string; success: boolean }) => {
          console.log(response);
          if (!response.success) {
            return {
              kind: 'name',
              message: response.error,
            };
          }

          return null;
        },
        onError: (error, ctx) => {
          console.log('error', error);
          return {
            kind: 'network',
            message: `Ops, tivemos alguns problemas ao verificar seu title: ${ctx.value()}`,
          };
        },
      });
      validateHttp(schema.titleCategory, {
        request: ({ value }) => ({
          url: `${environments.apiUrl}verify/category/title/check/${value()}`,
          credentials: 'include',
        }),
        onSuccess: (response: { error: string; success: boolean }) => {
          console.log('response', response);
          if (!response.success) {
            return {
              kind: 'name',
              message: response.error,
            };
          }

          return null;
        },
        onError: (error, ctx) => ({
          kind: 'network',
          message: `Ops, tivemos alguns problemas ao verificar seu title: ${ctx.value()}`,
        }),
      });
    },
    {
      submission: {
        action: async (field) => {
          this.service.createTask(field().value()).subscribe({
            next: (response) => {
              console.log(response);
              alert(response.data);
              this.route.navigate(['/home']);
            },
            error: (error) => {
              console.log({
                error,
              });
              alert(error.error.message);
            },
          });
        },
      },
    },
  );
}
