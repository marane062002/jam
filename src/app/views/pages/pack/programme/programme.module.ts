import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AddProgrammeComponent } from "./add-programme/add-programme.component";
import { ListProgrammeComponent } from "./list-programme/list-programme.component";
import { ProgrammeComponent } from "./programme.component";
import { UpdtProgrammeComponent } from "./updt-programme/updt-programme.component";
import { DetailleProgrammeComponent } from './detaille-programme/detaille-programme.component';
import { PagesModule } from "../../pages.module";
import { MaterialsModule } from "../../utils/materials/materials.module";
import { EBFormComponent } from "../etudeBesion/ao-form/ao-form.component";
import { EbListComponent } from "../etudeBesion/ao-list/eb-list.component";
import { ListEtudesComponent } from "../etudeBesion/list-etudes/list-etudes.component";
import { AddEduteBesionComponent } from "../etudeBesion/add-edute-besion/add-edute-besion.component";
import { PhaseProgrammeComponent } from './phase-programme/phase-programme.component';
import { NewPhaseComponent } from './detaille-programme/new-phase/new-phase.component';
import { ConfirmDialogComponent } from "../../marche/confirm-dialog/confirm-dialog.component";
import { StatistiqueProgrammeComponent } from "./statistique-programme/statistique-programme.component";
import { RetroplanningProgrammeComponent } from "./retroplanning-programme/retroplanning-programme.component";
import { AddProgrammeRetroplanningComponent } from "./add-programme-retroplanning/add-programme-retroplanning.component";
import { ShowProgrammeRetroplanningComponent } from "./show-programme-retroplanning/show-programme-retroplanning.component";
import { BcListComponent } from "../etudeBesion/bc-list/bc-list.component";
import { ContratListComponentComponent } from "../etudeBesion/contrat-list-component/contrat-list-component.component";
import { ContratFormComponent } from "../etudeBesion/contrat-form/contrat-form.component";
import { ContratEditComponent } from "../etudeBesion/contrat-edit/contrat-edit.component";
import { MarcheModule } from "../../marche/marche.module";
import { AddNatureComponent } from "./Parametrage/Nature/add-nature/add-nature.component";
import { ListNatureComponent } from "./Parametrage/Nature/list-nature/list-nature.component";
import { ShowNatureComponent } from "./Parametrage/Nature/show-nature/show-nature.component";
import { AddThemeComponent } from "./Parametrage/Theme/add-theme/add-theme.component";
import { ListThemeComponent } from "./Parametrage/Theme/list-theme/list-theme.component";
import { ShowThemeComponent } from "./Parametrage/Theme/show-theme/show-theme.component";
import { ListSousThemeComponent } from "./Parametrage/SousTheme/list-sous-theme/list-sous-theme.component";
import { AddSousThemeComponent } from "./Parametrage/SousTheme/add-sous-theme/add-sous-theme.component";
import { ShowSousThemeComponent } from "./Parametrage/SousTheme/show-sous-theme/show-sous-theme.component";
import { ListTableauBordComponent } from "./tableau-bord/list-tableau-bord/list-tableau-bord.component";
import { AddTableauBordComponent } from "./tableau-bord/add-tableau-bord/add-tableau-bord.component";
import { TableauBordDialogComponent } from "./tableau-bord/tableau-bord-dialog/tableau-bord-dialog.component";
import { ListArrondissementComponent } from "./Parametrage/Arrondissement/list-arrondissement/list-arrondissement.component";
import { ShowArrondissementComponent } from "./Parametrage/Arrondissement/show-arrondissement/show-arrondissement.component";
import { AddArrondissement1Component } from "./Parametrage/Arrondissement/add-arrondissement1/add-arrondissement1.component";
import { ExportExcelDialogComponent } from "./export-excel-dialog/export-excel-dialog.component";

@NgModule({
	declarations: [ExportExcelDialogComponent,
		AddNatureComponent,
		TableauBordDialogComponent,
		AddArrondissement1Component,
		ShowArrondissementComponent,
		ListArrondissementComponent,
		ListNatureComponent,
		ShowNatureComponent,
		AddThemeComponent,
		ListThemeComponent,
		ShowThemeComponent,
		ListSousThemeComponent,
		AddSousThemeComponent,
		ShowSousThemeComponent,
		ContratEditComponent,
		ProgrammeComponent,
		AddProgrammeComponent,
		ListProgrammeComponent,
		ListTableauBordComponent,
		AddTableauBordComponent,
		UpdtProgrammeComponent,
		DetailleProgrammeComponent,
		EBFormComponent,ContratFormComponent,
		EbListComponent,
		BcListComponent ,
		ContratListComponentComponent,
		ListEtudesComponent,
		 AddEduteBesionComponent,
		  PhaseProgrammeComponent,
		   NewPhaseComponent,
		   StatistiqueProgrammeComponent,
		   RetroplanningProgrammeComponent,
		   AddProgrammeRetroplanningComponent,
		   ShowProgrammeRetroplanningComponent
	],
	entryComponents: [TableauBordDialogComponent,ExportExcelDialogComponent,
		NewPhaseComponent,
		
	  ],
	imports: [
		MarcheModule,
	  PagesModule,
	  CommonModule,
	  FormsModule,
	  ReactiveFormsModule,
	  TranslateModule.forChild(),
	  MaterialsModule,
	  RouterModule.forChild([
		{
		  path: "",
		  component: ProgrammeComponent,
		  children: [

			{
				path: "add-EtudeBesion",
				component: EBFormComponent,
			},
			{
				path: "add-BesionConsultationContrat",
				component: ContratFormComponent,
				
			},
		
			{
				path: "contrat-edit",
				component: ContratEditComponent,
			},
			{
				path: "list-EtudeBesion",
				component: EbListComponent,
				data: {
					defaultSort: "id,desc",
				},

			},
			{
				path: "list-EtudeBesion-Bc",
				component: BcListComponent,
				data: {
					defaultSort: "id,desc",
				},

			},
			{
				path: "list-EtudeBesion-Contrat",
				component: ContratListComponentComponent,
				data: {
					defaultSort: "id,desc",
				},

			},
			{
				path: "add-programme",
				component: AddProgrammeComponent,
			},
			{
				path: "list-programme",
				component: ListProgrammeComponent,
			},

			{
				path: "add-tableau-bord",
				component: AddTableauBordComponent,
			},
			{
				path: "list-tableau-bord",
				component: ListTableauBordComponent,
			},
			{
				path: "add-nature",
				component: AddNatureComponent,
			},
			{
				path: "list-nature",
				component: ListNatureComponent,
			},
			{
				path: "show-nature",
				component: ShowNatureComponent,
			},
			{
				path: "add-arrondissement",
				component: AddArrondissement1Component,
			},
			{
				path: "list-arrondissement",
				component: ListArrondissementComponent,
			},
			{
				path: "show-arrondissement",
				component: ShowArrondissementComponent,
			},
			{
				path: "add-theme",
				component: AddThemeComponent,
			},
			{
				path: "list-theme",
				component: ListThemeComponent,
			},
			{
				path: "show-theme",
				component: ShowThemeComponent,
			},
			{
				path: "add-sous-theme",
				component: AddSousThemeComponent,
			},
			{
				path: "list-sous-theme",
				component: ListSousThemeComponent,
			},
			{
				path: "show-sous-theme",
				component: ShowSousThemeComponent,
			},
			{
				path: "updt-programme",
				component: UpdtProgrammeComponent,
			},
			{
				path: "detaille-programme",
				component: DetailleProgrammeComponent,
			},
			{
				path: "statistique-programme",
				component: StatistiqueProgrammeComponent
			},
			{
				path: "retroplanning-programme",
				component:RetroplanningProgrammeComponent
			},
			{
				path: "add-programme-retroplanning",
				component: AddProgrammeRetroplanningComponent,
			},
			{
				path: "show-programme-retroplanning",
				component: ShowProgrammeRetroplanningComponent,
			},
		  ]


		}

	  ]),

	]
  })
  export class ProgrammeModule { }
