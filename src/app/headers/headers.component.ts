import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent {
  constructor(private authService: AuthService) {}

  @Output() openModalEmitter = new EventEmitter<any>();

  onLogout() {
    this.authService.logout();
  }

  onOpenModal() {
    this.openModalEmitter.emit();
  }
}
