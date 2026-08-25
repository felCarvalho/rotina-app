import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, FormRoot, validateHttp } from '@angular/forms/signals';
import { TaskService } from '../../services/task.service';
import { PostTask } from '../../type';
import type { HttpErrorResponse } from '@angular/common/http';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  imports: [FormField, FormRoot],
})
export class CreateTaskComponent {
  private readonly service = inject(TaskService);
  private readonly createTask = signal<PostTask>({
    titleTask: '',
    descriptionTask: '',
    titleCategory: '',
    descriptionCategory: '',
  });

  createTaskForm = form(
    this.createTask,
    (schema) => {
      required(schema.titleTask, { message: 'Campo de título é obrigatório' });
      required(schema.descriptionTask, { message: 'Campo de descrição é obrigatório' });
      required(schema.titleCategory, { message: 'Campo de categoria é obrigatório' });
      required(schema.descriptionCategory, {
        message: 'Campo de descrição da categoria é obrigatório',
      });
      validateHttp(schema.titleTask, {
        request: ({ value }) =>
          value() ? `${environments.apiUrl}task/title/check/${value()}` : undefined,
        onSuccess: (response: { error: string; success: boolean }) => {
          if (response === null) return null;
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
      validateHttp(schema.titleCategory, {
        request: ({ value }) =>
          value() ? `${environments.apiUrl}category/title/check/${value()}` : undefined,
        onSuccess: (response: { error: string; success: boolean }) => {
          if (response === null) return null;
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
            next: (data) => console.log(data),
            error: (error) => console.log(error),
            complete: () => console.log(),
          });
        },
      },
    },
  );
}
