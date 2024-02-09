import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatStepperModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PagesModule } from '../pages.module';
import { MaterialsModule } from '../utils/materials/materials.module';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';
import { DetailleEtablissementComponent } from './detaille-etablissement/detaille-etablissement.component';
import { DetailleProgrammeComponent } from './detaille-programme/detaille-programme.component';
import { DetailleVisiteComponent } from './detaille-visite/detaille-visite.component';
import { EtablissementComponent } from './etablissement.component';
import { FicheTechniqueComponent } from './fiche-technique/fiche-technique.component';
import { ListEtablissementComponent } from './list-etablissement/list-etablissement.component';
import { ListProgrammeComponent } from './list-programme/list-programme.component';
import { ListVisiteComponent } from './list-visite/list-visite.component';
import { PrelevementComponent } from './prelevement/prelevement.component';
import { ProgramVisitComponent } from './program-visit/program-visit.component';
import { SaisieComponent } from './saisie/saisie.component';
import { UpdEtablissementComponent } from './upd-etablissement/upd-etablissement.component';
import { UpdProgrammeComponent } from './upd-programme/upd-programme.component';
import { UpdVisiteComponent } from './upd-visite/upd-visite.component';

@NgModule({
	declarations: [
		ListEtablissementComponent,
		EtablissementComponent,
		AddEtablissementComponent,
		ListProgrammeComponent,
		DetailleEtablissementComponent,
		ListVisiteComponent,
		DetailleVisiteComponent,
		FicheTechniqueComponent,
		PrelevementComponent,
		ProgramVisitComponent,
		SaisieComponent,
		UpdEtablissementComponent,
		DetailleProgrammeComponent,
		UpdVisiteComponent,
		UpdProgrammeComponent,

	],
	imports: [
		MatDialogModule,
		MatStepperModule,
		MatIconModule,
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: EtablissementComponent,
				children: [
					{
						path: "list-etablissement",
						component: ListEtablissementComponent,
					},
					{
						path: "list-programme",
						component: ListProgrammeComponent,
					},
					{
						path: "program-visit",
						component: ProgramVisitComponent,
					},
					{
						path: "add-etablissement",
						component: AddEtablissementComponent,
					},
					{
						path: "upd-etablissement/:id",
						component: UpdEtablissementComponent,
					},
					{
						path: "upd-programme/:id",
						component: UpdProgrammeComponent,
					},
					{
						// path: "detaille-etablissement",
						// component: DetailleEtablissementComponent,

						path: 'etablissements/:id',
                        component: DetailleEtablissementComponent,
					},
					{
						path: "detaille-visite",
						component: DetailleVisiteComponent,
					},
					{
						path: "detaille-programme/:id",
						component: DetailleProgrammeComponent,
					},
					{
						path: "prelevement",
						component: PrelevementComponent,
					},
					{
						path: "saisie",
						component: SaisieComponent,
					},
					{
						path: "list-visite",
						component: ListVisiteComponent,
					},
					{
						path: "upd-visite",
						component: UpdVisiteComponent,
					},
					{
						path: "fiche-technique",
						component: FicheTechniqueComponent,
					},
				],
			},
		]),
	],
})
export class EtablissementModule {}

























