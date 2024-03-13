// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject, Subject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { Router } from '@angular/router';


@Injectable()
export class MenuHorizontalService {
	selectedIndex = -1;
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	menu :any

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService,

	   			private router:Router) {

		this.loadMenu();

	}

	/**
	 * Load menu list
	 */
	loadMenu() {
		// get menu list
		this.menu = localStorage.getItem('menu')

		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), this.menu?this.menu : 'header.items' );

		this.menuList$.next(menuItems);



	}

	clickMenu(index) {
		this.selectedIndex = index;

		switch(this.selectedIndex) {
		// ------------------- MENU ADIL -------------------

		case 1: {
			this.menu = "header_RH.items";
			localStorage.setItem("menu", "header_RH.items");
			this.loadMenu();
			this.router.navigate(["personnel"]);
			break;
		}

		case 2: {
			this.menu = "header_projet.items";
			localStorage.setItem("menu", "header_projet.items");
			this.loadMenu();
			this.router.navigate(["projet"]);
			break;
		}
		case 3: {
			this.menu = "header_patrimoine.items";
			localStorage.setItem("menu", "header_patrimoine.items");
			this.loadMenu();
			this.router.navigate(["patrimoine"]);
			break;
		}
		// ------------------- MENU RACHID -------------------
		case 4: {
			this.menu = "header_bureau_ordre.items";
			localStorage.setItem("menu", "header_bureau_ordre.items");
			this.loadMenu();
			this.router.navigate([""]);
			break;
		}
		case (5): {
			this.menu = "header_insertion_publiciataire.items";
			localStorage.setItem("menu", "header_insertion_publiciataire.items");
			this.loadMenu();
			this.router.navigate([""]);
			break;
		}
		case 6: {
			this.menu = "header_immobilisation.items";
			localStorage.setItem("menu", "header_immobilisation.items");
			this.loadMenu();
			this.router.navigate([""]);
			break;
		}
		case 7: {
			this.menu = "header_jsce.items";
			localStorage.setItem("menu", "header_jsce.items");
			this.loadMenu();
			this.router.navigate([""]);
			break;
		}
		case 8: {
			this.menu = "header_travaux_communaux.items";
			localStorage.setItem("menu", "header_travaux_communaux.items");
			this.loadMenu();
			this.router.navigate(["intervention-rapide"]);
			break;
		}
		// ------------------- MENU NAIMA -------------------
		case 9: {
			this.menu = "header_reclamation.items";
			localStorage.setItem("menu", "header_reclamation.items");
			this.loadMenu();
			this.router.navigate(["reclamations"]);
			break;
		}
		case 10: {
			this.menu = "header_autorisation.items";
			localStorage.setItem("menu", "header_autorisation.items");
			this.loadMenu();
			this.router.navigate(["autorisations"]);
			break;
		}
		case 11: {
			this.menu = "header_reservations.items";
			localStorage.setItem("menu", "header_reservations.items");
			this.loadMenu();
			this.router.navigate(["reservations"]);
			break;
		}
		case 12: {
			this.menu = "header_affairesConseil.items";
			localStorage.setItem("menu", "header_affairesConseil.items");
			this.loadMenu();
			this.router.navigate(["affaires-conseil"]);
			break;
		}
		case 13: {
			this.menu = "header_marches.items";
			localStorage.setItem("menu", "header_marches.items");
			this.loadMenu();
			this.router.navigate(["marches"]);
			break;
		}

		// ------------------- MENU USERS -------------------
		case 20: {
			this.menu = "header.items";
			localStorage.setItem("menu", "header.items");
			this.loadMenu();
			this.router.navigate(["user"]);
			break;
		}
		case 21: {
			this.menu = "header_gestionStock.items";
			localStorage.setItem("menu", "header_gestionStock.items");
			this.loadMenu();
			this.router.navigate(["gestionStock"]);
			break;
		}
		case 22: {
			this.menu = "header_parcAuto.items";
			localStorage.setItem("menu", "header_parcAuto.items");
			this.loadMenu();
			this.router.navigate(["gestionParcAuto"]);
			break;
		}
		case 23: {
			this.menu = "headerMarche.items";
			localStorage.setItem("menu", "headerMarche.items");
			this.loadMenu();
			this.router.navigate(["pesee"]);
			break;
		}
		case 24: {
			this.menu = "header_programme.items";
			localStorage.setItem("menu", "header_programme.items");
			this.loadMenu();
			this.router.navigate(["programme"]);
			break;
		}

	/*	case 23:{
			this.menu="header_ressourcesHumaines.items";
			localStorage.setItem("menu","header_ressourcesHumaines.items");
			this.loadMenu();
			this.router.navigate(["pages/rh/personnel"]);
			break;
		}*/

		case 25: {
			this.menu = "headerBatoire.items";
			localStorage.setItem("menu", "headerBatoire.items");
			this.loadMenu();
			this.router.navigate(["audiences"]);
			break;
		}

		case 26: {
			this.menu = "headerBMH.items";
			localStorage.setItem("menu", "headerBMH.items");
			this.loadMenu();
			this.router.navigate(["bmh/list-types"]);
			break;
		}

		case 27: {
			this.menu = "headerProgrammePrev.items";
			localStorage.setItem("menu", "headerProgrammePrev.items");
			this.loadMenu();
			this.router.navigate(["/marches/list-programme-previsionnel"]);
			break;
		}
		case 28: {
			this.menu = "header_consultationPac.items";
			localStorage.setItem("menu", "header_consultationPac.items");
			this.loadMenu();
			this.router.navigate(["programme"]);
			break;
		}
		case 29: {
			this.menu = "headerSDL.items";
			localStorage.setItem("menu", "headerSDL.items");
			this.loadMenu();
			this.router.navigate(["/delegataire/delegataires"]);
			break;
		}
		case 30: {
			this.menu = "headerGsmLan.items";
			localStorage.setItem("menu", "headerGsmLan.items");
			this.loadMenu();
			this.router.navigate(["/gsmLan/gsmLan"]);
			break;
		}
		case 31: {
			this.menu = "headerPreprete.items";
			localStorage.setItem("menu", "headerProprete.items");
			this.loadMenu();
			this.router.navigate([""]);
			break;
		}
			default: {
			   //statements;
			   break;
			}

		 }



	}
}
