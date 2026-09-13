import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { getUserResponse } from '../../type';
import { UserService } from '../../services/account.service';
import { FormateDateUtil } from '../../../utils/format-date/formatDate';
import { LocalStorageUtil } from '../../../utils/local-storage/local.storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  imports: [MatIconModule],
})
export class AccountComponent implements OnInit {
  public readonly getInfoUser = signal<getUserResponse | undefined>(undefined);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (user) => this.getInfoUser.set(user),
      error: (error) => console.log(error),
    });
  }

  get infoUser() {
    return this.getInfoUser();
  }

  logout() {
    this.userService.logOut().subscribe({
      next: () => {
        LocalStorageUtil.removeItem('sessionId');
        this.router.navigate(['/login']);
        alert('Usuario saiu com sucesso');
        this.getInfoUser.set(undefined);
      },
      error: (error) => console.log({ error }),
    });
  }

  formatDateAccount(date: Date | undefined) {
    const formated = FormateDateUtil(date);

    if (!formated.success) {
      return formated.error;
    }

    return formated.data;
  }
}
