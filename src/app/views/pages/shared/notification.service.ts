import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { Subject } from 'rxjs';
import { NotificationMessageService, NotificationType } from './NotificationMessage.service';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

@Injectable({
	providedIn: "root",
})
export class NotificationService {

	private notificationSubject: Subject<NotificationMessageService> = new Subject<NotificationMessageService>();

	sendMessage(message: NotificationMessageService) {
        this.notificationSubject.next(message);
	}
	
	constructor(public snackBar: MatSnackBar, private toastrService: ToastrService) {
		this.listenForMessages();
	}

	config: MatSnackBarConfig = {
		duration: 2000,
		horizontalPosition: "center",
		verticalPosition: "top",
		panelClass: ["red-snackbar"],
	};

	success(msg) {
		this.config["panelClass"] = ["notification", "success"];
		this.snackBar.open(msg, "", this.config);
	}


	warn(msg) {
		this.config["panelClass"] = ["notification", "warn"];
		this.snackBar.open(msg, "", this.config);
	}

	// ngx toastr
	listenForMessages() {
		this.notificationSubject.subscribe(message => {
			switch (message.type) {
				case NotificationType.success:
					this.toastrService.success(message.message);
					break;
				case NotificationType.error:
					this.toastrService.error(message.message);
					break;
				case NotificationType.warning:
					this.toastrService.warning(message.message);
					break;
				case NotificationType.info:
					this.toastrService.info(message.message);
					break;
				default:
				case NotificationType.info:
					this.toastrService.info(message.message);
					break;
			}
		}, err => {
			console.log('Error when processing toastr message');
		});
	}
}
