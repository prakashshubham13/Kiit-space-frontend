import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {
  @Output() deleteUser: EventEmitter<any> = new EventEmitter();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  proceed() {
    this.deleteUser.emit();
  }
  close() {
    this.closeModal.emit();
  }
}
