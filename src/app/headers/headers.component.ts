import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent {
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  onLogout() {
    this.authService.logout();
  }

  onOpenModal() {
    this.modalService.openModal();
  }
}
