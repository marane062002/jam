// Angular
import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// Partials
import { PartialsModule } from "../partials/partials.module";
// Pages
import { CoreModule } from '../../core/core.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDatepickerToggleModule } from '@angular/material/datepicker-toggle';

import { SubheaderSearchComponent } from "../partials/layout/subheader/subheader-search/subheader-search.component";

import { MycurrencyPipe } from "./custom.currencypipe";
import { DirhamsCurrencyPipe } from "./dirhamsCurrency.pipe";
import { CustomPaginationComponent } from "./utils/pagination/components/custom-pagination/custom-pagination.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "./utils/materials/materials.module";
import { NgSelectModule } from "@ng-select/ng-select";

// pdf viewer
import { PdfViewerModule} from 'ng2-pdf-viewer';
import { SpinnerViewComponent } from './utils/spinner/spinner-view/spinner-view.component';
// import { DialogEditTypeComponent } from './marcheGros/list-type/dialog-edit-type/dialog-edit-type/dialog-edit-type.component';


import { StockComponent } from './stock/stock.component';
import { ParcComponent } from './parc/parc.component';

import { ListFourgonObstacleComponent } from './medecin-legale-bmh/list-fourgon-obstacle/list-fourgon-obstacle.component';
import { AddFourgonObstacleComponent } from './medecin-legale-bmh/add-fourgon-obstacle/add-fourgon-obstacle.component';
import { UpdateFourgonObstacleComponent } from './medecin-legale-bmh/update-fourgon-obstacle/update-fourgon-obstacle.component';
import { DetailsFourgonObstacleComponent } from './medecin-legale-bmh/details-fourgon-obstacle/details-fourgon-obstacle.component';
import { PopupComponent } from './medecin-legale-bmh/details-obstacles/popup/popup.component';
import { PopupDecesComponent } from './medecin-legale-bmh/details-deces-naturel/popup-deces/popup-deces.component';



// import { VaccinationComponent } from './vaccination/vaccination.component';
// import { CalendarVaccinationComponent } from './calendar-vaccination/calendar-vaccination.component';
// import { DetailleVaccinationComponent } from './detaille-vaccination/detaille-vaccination.component';
// import { ListVaccinationComponent } from './list-vaccination/list-vaccination.component';
// import { UpdVaccinationComponent } from './upd-vaccination/upd-vaccination.component';


@NgModule({
	//declarations: [	MyPageComponent],
	exports: [MycurrencyPipe, DirhamsCurrencyPipe, CustomPaginationComponent, TranslateModule, MaterialsModule,PdfViewerModule],
	imports: [
		PdfViewerModule,
		MatDatepickerModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgSelectModule,
		CoreModule,
		PartialsModule,
		MaterialsModule,
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: "",
				component: CustomPaginationComponent,
			},
		]),
	],
	entryComponents: [SpinnerViewComponent],
	providers: [{
		provide: LOCALE_ID,
		useValue: 'fr'
	}],
	declarations: [
					SubheaderSearchComponent, 
					MycurrencyPipe, 
					DirhamsCurrencyPipe, 
					CustomPaginationComponent, 
					SpinnerViewComponent, 
					StockComponent, 
					ParcComponent, ListFourgonObstacleComponent, AddFourgonObstacleComponent, UpdateFourgonObstacleComponent, DetailsFourgonObstacleComponent, PopupComponent, PopupDecesComponent]
})
export class PagesModule {}
