// Angular
import { Component } from '@angular/core';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

	/**
	 * Access to jamaati administrator
	 */
	communication(){
		console.log('admin')
		window.open('http://marrakech.jamaati.hvc.ma:8080/admin','_blank');
	}
 }
