import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  message: string;
  type: NotificationType;

  constructor() { }

}
export enum NotificationType {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}