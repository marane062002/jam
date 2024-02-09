import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	NgbDropdownModule,
	NgbModule,
	NgbTabsetModule,
	NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatTooltipModule,
	MatSlideToggleModule,
	MatPaginatorIntl,
	MatExpansionModule,
	MatStepperModule,
} from "@angular/material";
import { MarcheDetailComponent } from "./marche-detail/marche-detail.component";
import { MarcheComponent } from "./marche.component";
import { MarcheEditComponent } from "./marche-edit/marche-edit.component";
import { MarchesListComponent } from "./marches-list/marches-list.component";
import { MarcheFormComponent } from "./marche-form/marche-form.component";
import { AoFormComponent } from "./ao-form/ao-form.component";
import { AoEditComponent } from "./ao-edit/ao-edit.component";
import { AoDetailComponent } from "./ao-detail/ao-detail.component";
import { AoListComponent } from "./ao-list/ao-list.component";
import { LigneBordereauPrixFormComponent } from "./ligne-bordereau-prix-form/ligne-bordereau-prix-form.component";
import { LigneBordereauPrixEditComponent } from "./ligne-bordereau-prix-edit/ligne-bordereau-prix-edit.component";
import { LigneBordereauPrixDetailComponent } from "./ligne-bordereau-prix-detail/ligne-bordereau-prix-detail.component";
import { MycurrencyPipe } from "../custom.currencypipe";
import { AoVisiteComponent } from "./ao-detail/ao-visite/ao-visite.component";
import { AoEditSmComponent } from "./ao-edit-sm/ao-edit-sm.component";
import { ValiDgComponent } from "./ao-detail/vali-dg/vali-dg.component";
import { PrestatairesComponent } from "./ao-detail/prestataires/prestataires.component";
import { AoEchantillonComponent } from "./ao-detail/ao-echantillon/ao-echantillon.component";
import { CommissionComponent } from "./commission/commission.component";
import { CommissionDetailComponent } from "./commission-detail/commission-detail.component";
import { DocAdminAdjucataireComponent } from "./doc-admin-adjucataire/doc-admin-adjucataire.component";
import { EngagementApprobationComponent } from "./engagement-approbation/engagement-approbation.component";
import { OrdreServiceComponent } from "./ordre-service/ordre-service.component";
import { OrdreArretRepriseComponent } from "./ordre-arret-reprise/ordre-arret-reprise.component";
import { ComiteMarcheComponent } from "./comite-marche/comite-marche.component";
import { PhaseMarcheComponent } from "./phase-marche/phase-marche.component";
import { FacturePhaseMarcheComponent } from "./facture-phase-marche/facture-phase-marche.component";
import { LivrablePhaseMarcheComponent } from "./livrable-phase-marche/livrable-phase-marche.component";
import { PhaseMarcheDetailComponent } from "./phase-marche-detail/phase-marche-detail.component";
import { MatAutocompleteModule, MatDividerModule } from "@angular/material";
import { ConsultationFormComponent } from "./consultation-form/consultation-form.component";
import { ConsultationFormServiceBCComponent } from "./consultation-form-service-bc/consultation-form-service-bc.component";
import { ConsultationEditComponent } from "./consultation-edit/consultation-edit.component";
import { ConsultationDetailComponent } from "./consultation-detail/consultation-detail.component";
import { LignCommandeConsultationComponent } from "./lign-commande-consultation/lign-commande-consultation.component";
import { ArticlesComponent } from "./articles/articles.component";
import { PrestatairesConsultationComponent } from "./prestataires-consultation/prestataires-consultation.component";
import { CommissionConsultationComponent } from "./commission-consultation/commission-consultation.component";
import { ConsultationListComponent } from "./consultation-list/consultation-list.component";
import { ArticleFormComponent } from "./article-form/article-form.component";
import { BonCommandeFormComponent } from "./bon-commande-form/bon-commande-form.component";
import { BonCommandeDetailComponent } from "./bon-commande-detail/bon-commande-detail.component";
import { BonCommandeEditComponent } from "./bon-commande-edit/bon-commande-edit.component";
import { ValideTresorerieComponent } from "./ao-detail/valide-tresorerie/valide-tresorerie.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { PagesModule } from "../pages.module";
import { ParticipantsInternesCommissionAoDetailComponent } from "./participants-internes-commission-ao-detail/participants-internes-commission-ao-detail.component";
import { ParticipantsExternesCommissionAoDetailComponent } from "./participants-externes-commission-ao-detail/participants-externes-commission-ao-detail.component";
import { OffresDeposeseCommissionAoDetailComponent } from "./offres-deposese-commission-ao-detail/offres-deposese-commission-ao-detail.component";
import { MarcheNewComponent } from "./marche-new/marche-new.component";
import { PrestatairesFormComponent } from "./prestataires-form/prestataires-form.component";
import { PrestatairesListComponent } from "./prestataires-list/prestataires-list.component";
import { CommissionConsultationDetailComponent } from "./commission-consultation-detail/commission-consultation-detail.component";
import { OffreDeposeeCommissionConsultationDetailComponent } from "./offre-deposee-commission-consultation-detail/offre-deposee-commission-consultation-detail.component";
import { ParticipantsInternesCommissionConsultationComponent } from "./participants-internes-commission-consultation/participants-internes-commission-consultation.component";
import { ParticipantsExternesCommissionConsultationComponent } from "./participants-externes-commission-consultation/participants-externes-commission-consultation.component";
import { LigneCommandeOffreDeposeeConsultationDetailComponent } from "./ligne-commande-offre-deposee-consultation-detail/ligne-commande-offre-deposee-consultation-detail.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { PjAoComponent } from "./pj-ao/pj-ao.component";
import { EchantillonAoDetailComponent } from "./echantillon-ao-detail/echantillon-ao-detail.component";
import { ValideDgServiceComponent } from "./ao-detail/valide-dg-service/valide-dg-service.component";
import { PrestatairesShowComponent } from "./prestataires-show/prestataires-show.component";
import { PrestatairesEditComponent } from "./prestataires-edit/prestataires-edit.component";
import { EditLigneBpComponent } from "./dialog-forms/edit-ligne-bp/edit-ligne-bp.component";
import { EditVisiteAoComponent } from "./dialog-forms/edit-visite-ao/edit-visite-ao.component";
import { EditEchantillonComponent } from "./dialog-forms/edit-echantillon/edit-echantillon.component";
import { EditLigneEchantillonComponent } from "./dialog-forms/edit-ligne-echantillon/edit-ligne-echantillon.component";
import { AoRechercheComponent } from "./ao-recherche/ao-recherche.component";
import { ConcelAoComponent } from "./dialog-forms/concel-ao/concel-ao.component";
import { AoMaintienOffreComponent } from "./ao-maintien-offre/ao-maintien-offre.component";
import { MiseEnDemeureResiliationComponent } from "./mise-en-demeure-resiliation/mise-en-demeure-resiliation.component";
import { ReceptionsComponent } from "./receptions/receptions.component";
import { PaginatorI18n } from "../PaginatorI18n";
import { PartialsModule } from "../../partials/partials.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { PjMarcheComponent } from "./pj-marche/pj-marche.component";
import { TravauxSupplimentairesComponent } from "./travaux-supplimentaires/travaux-supplimentaires.component";
import { PenalitesInteretComponent } from "./penalites-interet/penalites-interet.component";
import { EditSecteurComponent } from "./dialog-forms/edit-secteur/edit-secteur.component";
import { EditLotAoComponent } from "./dialog-forms/edit-lot-ao/edit-lot-ao.component";
import { LettreMaintienDialogComponent } from "./dialog-forms/lettre-maintien-dialog/lettre-maintien-dialog.component";
import { CommissionEditComponent } from "./commission-edit/commission-edit.component";
import { ConsultationArchitecturaleListComponent } from "./consultation-architecturale-list/consultation-architecturale-list.component";
import { ConsultationArchitecturaleEditComponent } from "./consultation-architecturale-edit/consultation-architecturale-edit.component";
import { ConsultationArchitecturaleFormComponent } from "./consultation-architecturale-form/consultation-architecturale-form.component";
import { CaDetailComponent } from "./ca-detail/ca-detail.component";
import { ValidePresidentComponent } from "./ca-detail/valide-president/valide-president.component";
import { CaVisiteComponent } from "./ca-detail/ca-visite/ca-visite.component";
import { CaJournauxComponent } from "./ca-detail/ca-journaux/ca-journaux.component";
import { CaCommissionComponent } from "./ca-detail/ca-commission/ca-commission.component";
import { CaArchitecteComponent } from "./ca-detail/ca-architecte/ca-architecte.component";
import { ValideDgsComponent } from "./ca-detail/valide-dgs/valide-dgs.component";
import { ValideTresorierComponent } from "./ca-detail/valide-tresorier/valide-tresorier.component";
import { EditArchitecteComponent } from "./ca-detail/edit-architecte/edit-architecte.component";
import { EditArchitectInfiComponent } from "./edit-architect-infi/edit-architect-infi.component";
import { EditJournalComponent } from "./edit-journal/edit-journal.component";
import { EditVisiteCaComponent } from "./edit-visite-ca/edit-visite-ca.component";
import { AoJournauxComponent } from "./ao-detail/ao-journaux/ao-journaux.component";
import { EditAgrementAoComponent } from "./dialog-forms/edit-agrement-ao/edit-agrement-ao.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AoDashboardComponent } from "./ao-detail/ao-dashboard/ao-dashboard.component";
import { DashboardMarcheComponent } from './dashboard-marche/dashboard-marche.component';
import { AoStatutComponent } from './ao-detail/ao-statut/ao-statut.component';
import { PmeDashboardComponent } from "./pme-dashboard/pme-dashboard.component";
import { DashboardDivisionMarcheComponent } from "./dashboard-division-marche/dashboard-division-marche.component";
import { BonCommandeDashboardComponent } from './bon-commande-dashboard/bon-commande-dashboard.component';
import { DialogALertAOComponent } from './dialog-alert-ao/dialog-alert-ao.component';
import { AoConsultationListComponent } from "./ao-consultation-list/ao-consultation-list.component";
import { AoConsultationAddComponent } from "./ao-consultation-add/ao-consultation-add.component";
import { AoConsultationEditComponent } from "./ao-consultation-edit/ao-consultation-edit.component";
import { AoValidationDialogComponent } from "./ao-validation-dialog/ao-validation-dialog.component";
import { AoConsultationDetailComponent } from "./ao-consultation-detail/ao-consultation-detail.component";
import { LigneBordereauPrixFormConsultationComponent } from "./ligne-bordereau-prix-form-consultation/ligne-bordereau-prix-form-consultation.component";
import { ValiDgConsultationComponent } from "./vali-dg-consultation/vali-dg-consultation.component";
import { ValiDgServiceConsultationComponent } from "./vali-dg-service-consultation/vali-dg-service-consultation.component";
import { ValideTresorerieConsultationComponent } from "./valide-tresorerie-consultation/valide-tresorerie-consultation.component";
import { GestionCommissionOuverturePlisComponent } from "./gestion-commission-ouverture-plis/gestion-commission-ouverture-plis.component";
import { BonCommandeListComponent } from "./bon-commande-list/bon-commande-list.component";
import { BonCommandeListAdjugeComponent } from "./bon-commande-list-adjuge/bon-commande-list-adjuge.component";
import { DisponibiliteFondsComponent } from "./disponibilite-fonds/disponibilite-fonds.component";
import { CalendrierComponent } from "./calendrier/calendrier.component";
//Full calendar
import { FullCalendarModule } from "@fullcalendar/angular"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { ModalShowCalendrierAoComponent } from "./modal-show-calendrier-ao/modal-show-calendrier-ao.component";
import { ValiderBcModalComponent } from "./valider-bc-modal/valider-bc-modal.component";
import { CalendrierBcComponent } from "./calendrier-bc/calendrier-bc.component";
import { ModalShowCalendrierBcComponent } from "./modal-show-calendrier-bc/modal-show-calendrier-bc.component";
import { ContratListConsultationComponent } from "./contrat-list-consultation/contrat-list-consultation.component";
import { ContratDetailConsultationComponent } from "./contrat-detail-consultation/contrat-detail-consultation.component";
import { ValiderContratModalComponent } from "./valider-contrat-modal/valider-contrat-modal.component";
import { ListProgrammePrevisionnelComponent } from "./gestion-programme-previsionnel/list-programme-previsionnel/list-programme-previsionnel.component";
import { AddProgrammePrevisionnelComponent } from "./gestion-programme-previsionnel/add-programme-previsionnel/add-programme-previsionnel.component";
import { SeanceDialogComponent } from "./Seance-dialog/seance-dialog/seance-dialog.component";
import { ShowSeanceDialogComponent } from "./Seance-dialog/show-seance-dialog/show-seance-dialog/show-seance-dialog.component";
import { SeanceResultatDefComponent } from "./Seance-dialog/seance-resultat-def/seance-resultat-def.component";
import { EditLotMarcheComponent } from "./dialog-forms/edit-lot-marche/edit-lot-marche.component";
import { ShowPjCommentaireComponent } from "./show-pj-commentaire/show-pj-commentaire.component";
import { ShowProgrammePrevisionnelComponent } from "./gestion-programme-previsionnel/show-programme-previsionnel/show-programme-previsionnel.component";
import { ContratFormConsultationComponent } from "./contrat-form-consultation/contrat-form-consultation.component";
import { ContratEditConsultationComponent } from "./contrat-edit-consultation/contrat-edit-consultation.component";
// import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

FullCalendarModule.registerPlugins([
	dayGridPlugin,
	interactionPlugin,
]);
@NgModule({
	declarations: [EditLotMarcheComponent,
		AddProgrammePrevisionnelComponent, ShowProgrammePrevisionnelComponent,
		ListProgrammePrevisionnelComponent,
		ContratDetailConsultationComponent ,
		ContratListConsultationComponent,
		ContratFormConsultationComponent,
		ContratEditConsultationComponent,
		ValiderBcModalComponent,
		ValiderContratModalComponent,
		ModalShowCalendrierAoComponent,
		ModalShowCalendrierBcComponent,
		CalendrierComponent,
		CalendrierBcComponent,
		DisponibiliteFondsComponent,
		BonCommandeListComponent,
		BonCommandeListAdjugeComponent,
		AoValidationDialogComponent,
		AoConsultationListComponent,
		GestionCommissionOuverturePlisComponent,
		AoConsultationAddComponent,
		AoConsultationEditComponent,
		AoConsultationDetailComponent,
		ValideTresorierComponent,
		ValideDgsComponent,
		CaVisiteComponent,
		CaJournauxComponent,
		CaCommissionComponent,
		CaArchitecteComponent,
		ValidePresidentComponent,
		ValideTresorerieComponent,
		ValideTresorerieConsultationComponent,
		ValideDgServiceComponent,
		ValiDgServiceConsultationComponent,
		MarcheComponent,
		AoEchantillonComponent,
		ValiDgComponent,
		ValiDgConsultationComponent,
		MarcheFormComponent,
		MarcheEditComponent,
		MarchesListComponent,
		MarcheDetailComponent,
		AoFormComponent,
		AoEditComponent,
		AoDetailComponent,
		AoListComponent,
		AoRechercheComponent,
		LigneBordereauPrixFormComponent,
		LigneBordereauPrixFormConsultationComponent,
		LigneBordereauPrixDetailComponent,
		LigneBordereauPrixEditComponent,
		AoVisiteComponent,
		AoJournauxComponent,
		AoEditSmComponent,
		PrestatairesComponent,
		CommissionComponent,
		CommissionDetailComponent,
		DocAdminAdjucataireComponent,
		EngagementApprobationComponent,
		OrdreServiceComponent,
		OrdreArretRepriseComponent,
		ComiteMarcheComponent,
		PhaseMarcheComponent,
		FacturePhaseMarcheComponent,
		LivrablePhaseMarcheComponent,
		PhaseMarcheDetailComponent,
		ConsultationFormComponent,
		ConsultationFormServiceBCComponent,
		ConsultationEditComponent,
		ConsultationDetailComponent,
		LignCommandeConsultationComponent,
		ArticlesComponent,
		PrestatairesConsultationComponent,
		CommissionConsultationComponent,
		ConsultationListComponent,
		ArticleFormComponent,
		BonCommandeFormComponent,
		BonCommandeDetailComponent,
		BonCommandeEditComponent,
		ParticipantsInternesCommissionAoDetailComponent,
		ParticipantsExternesCommissionAoDetailComponent,
		OffresDeposeseCommissionAoDetailComponent,
		MarcheNewComponent,
		PrestatairesFormComponent,
		PrestatairesListComponent,
		CommissionConsultationDetailComponent,
		OffreDeposeeCommissionConsultationDetailComponent,
		ParticipantsInternesCommissionConsultationComponent,
		ParticipantsExternesCommissionConsultationComponent,
		LigneCommandeOffreDeposeeConsultationDetailComponent,
		PjAoComponent,
		EchantillonAoDetailComponent,
		PrestatairesShowComponent,
		PrestatairesEditComponent,
		//ConfirmDialogComponent,
		EditLigneBpComponent,
		EditArchitecteComponent,
		EditVisiteAoComponent,
		EditLigneEchantillonComponent,
		EditEchantillonComponent,
		ConcelAoComponent,
		AoMaintienOffreComponent,
		MiseEnDemeureResiliationComponent,
		ReceptionsComponent,
		PjMarcheComponent,
		TravauxSupplimentairesComponent,
		PenalitesInteretComponent,
		EditSecteurComponent,
		EditLotAoComponent,
		EditAgrementAoComponent,
		LettreMaintienDialogComponent,
		CommissionEditComponent,
		CaDetailComponent,
		ConsultationArchitecturaleListComponent,
		ConsultationArchitecturaleEditComponent,
		ConsultationArchitecturaleFormComponent,
		EditArchitectInfiComponent,
		EditJournalComponent,
		EditVisiteCaComponent,
		DashboardComponent,
		AoDashboardComponent,
		DashboardMarcheComponent,
		AoStatutComponent,
	    PmeDashboardComponent,
	    DashboardDivisionMarcheComponent,
	    BonCommandeDashboardComponent,
	    DialogALertAOComponent,SeanceDialogComponent,ShowSeanceDialogComponent, SeanceResultatDefComponent, ShowPjCommentaireComponent
	],
	imports: [MatStepperModule,
		// CalendarModule ,
		FullCalendarModule,
		MatExpansionModule,
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{

				path: "",
				component: MarcheComponent,
				children: [
					{
						path: "contrat-consultation-list",
						component: ContratListConsultationComponent,
					},
					{
						path: "contrat-consultation-add",
						component: ContratFormConsultationComponent,
					},
					{
						path: "contrat-consultation-edit",
						component: ContratEditConsultationComponent,
					},
					{
						path: "contrat-consultation-detail",
						component: ContratDetailConsultationComponent ,
					},
					{
						path : "calendrier",
						component : CalendrierComponent,
					},
					{
						path : "calendrier-bc",
						component : CalendrierBcComponent,
					},
					{
						path : "list-programme-previsionnel",
						component : ListProgrammePrevisionnelComponent,
					},
					{
						path : "show-programme-previsionnel",
						component : ShowProgrammePrevisionnelComponent,
					},
					
					{
						path : "add-programme-previsionnel",
						component : AddProgrammePrevisionnelComponent,
					},
					{
						path : "gestion-commission-plis",
						component : GestionCommissionOuverturePlisComponent,
					},
					{
						path : "disponibilite-des-fonds",
						component : DisponibiliteFondsComponent,
					},
					{
						path : "marche-dashboard",
						component : DashboardMarcheComponent,
					},
					{
						path : "dashboard",
						component : DashboardComponent,
					},
				 	 {
						path : "pme-dashboard",
						component : PmeDashboardComponent,
					},
					{
						path : "ao-dashboard",
						component : AoDashboardComponent,
					},
					{
						path: "marche-detail",
						component: MarcheDetailComponent,
						children: [
							{
								path: "doc-admin-adjucataire",
								component: DocAdminAdjucataireComponent,
							},
							{
								path: "engagement-approbation",
								component: EngagementApprobationComponent,
							},
							{
								path: "ordre-service",
								component: OrdreServiceComponent,
							},
							{
								path: "ordre-arret-reprise",
								component: OrdreArretRepriseComponent,
							},
							{
								path: "comite-marche",
								component: ComiteMarcheComponent,
							},
							{
								path: "phase-marche",
								component: PhaseMarcheComponent,
							},
							{
								path: "facture-phases-marche",
								component: FacturePhaseMarcheComponent,
							},
							{
								path: "phases-marche-detail",
								component: PhaseMarcheDetailComponent,
							},
							{
								path: "livrable-phases-marche",
								component: LivrablePhaseMarcheComponent,
							},
							{
								path: "mise-en-demeure-resiliation",
								component: MiseEnDemeureResiliationComponent,
							},
							{
								path: "receptions",
								component: ReceptionsComponent,
							},
							{
								path: "pj-marche",
								component: PjMarcheComponent,
							},
							{
								path: "travaux-supplimentaires",
								component: TravauxSupplimentairesComponent,
							},
							{
								path: "penalites-interet",
								component: PenalitesInteretComponent,
							},
						],
					},
					{
						path: "consultation-detail",
						component: ConsultationDetailComponent,
						children: [
							{
								path: "commande",
								component: LignCommandeConsultationComponent,
							},
							{
								path: "articles",
								component: ArticlesComponent,
							},
							{
								path: "prestataires",
								component: PrestatairesConsultationComponent,
							},
							{
								path: "commission",
								component: CommissionConsultationComponent,
							},
						],
					},
					{
						path: "consultation-list",
						component: ConsultationListComponent,
					},
					{
						path: "consultation-edit",
						component: ConsultationEditComponent,
					},
					{
						path: "consultation-form",
						component: ConsultationFormComponent,
					},
					{
						path: "bon-commande-list",
						component: BonCommandeListComponent,
					},
					{
						path: "bon-commande-list-adjuge",
						component: BonCommandeListAdjugeComponent,
					},
					{
						path: "bon-commande-edit",
						component: BonCommandeEditComponent,
					},
					{
						path: "bon-commande-form",
						component: BonCommandeFormComponent,
					},
					{
						path: "bon-commande-detail",
						component: BonCommandeDetailComponent,
					},
					{
						path: "bon-commande-dashboard",
						component: BonCommandeDashboardComponent,
					},
					{
						path: "consultation-form-service-bon-commande",
						component: ConsultationFormServiceBCComponent,
					},
					{
						path: "article-form",
						component: ArticleFormComponent,
					},
					{
						path: "articles-list",
						component: ArticlesComponent,
					},
					{
						path: "prestataires-list",
						component: PrestatairesListComponent,
					},
					{
						path: "prestataire-new",
						component: PrestatairesFormComponent,
					},
					{
						path: "prestataire-show",
						component: PrestatairesShowComponent,
					},
					{
						path: "prestataire-edit",
						component: PrestatairesEditComponent,
					},
					{
						path: "marche-edit",
						component: MarcheEditComponent,
					},
					{
						path: "marches-list",
						component: MarchesListComponent,
					},
					{
						path: "marche-form",
						component: MarcheFormComponent,
					},
					{
						path: "marche-new",
						component: MarcheNewComponent,
					},
					{
						path: "doc-admin-adjucataire",
						component: DocAdminAdjucataireComponent,
					},
					{
						path: "engagement-approbation",
						component: EngagementApprobationComponent,
					},
					{
						path: "ligneBP-detail",
						component: LigneBordereauPrixDetailComponent,
					},
					{
						path: "ligneBP-edit",
						component: LigneBordereauPrixEditComponent,
					},
					{
						//marche
						path: "Marchedashboard",
						component: DashboardDivisionMarcheComponent,
					},
					{
						path: "commission-detail",
						component: CommissionDetailComponent,
						children: [
							{
								path: "offres-deposees",
								component:
									OffresDeposeseCommissionAoDetailComponent,
							},
							{
								path: "participants-internes",
								component:
									ParticipantsInternesCommissionAoDetailComponent,
							},
							{
								path: "participants-externes",
								component:
									ParticipantsExternesCommissionAoDetailComponent,
							},
						],
					},
					{
						path: "commission-edit",
						component: CommissionEditComponent,
					},
					{
						path: "commission-consultation-detail",
						component: CommissionConsultationDetailComponent,
						children: [
							{
								path: "offres-deposees-consultation",
								component:
									OffreDeposeeCommissionConsultationDetailComponent,
							},
							{
								path: "participants-internes-consultation",
								component:
									ParticipantsInternesCommissionConsultationComponent,
							},
							{
								path: "participants-externes-consultation",
								component:
									ParticipantsExternesCommissionConsultationComponent,
							},
						],
					},
					{
						path: "offres-deposees",
						component: OffresDeposeseCommissionAoDetailComponent,
					},
					{
						path: "participants-internes",
						component:
							ParticipantsInternesCommissionAoDetailComponent,
					},
					{
						path: "participants-externes",
						component:
							ParticipantsExternesCommissionAoDetailComponent,
					},
					{
						path: "ligneBP-form",
						component: LigneBordereauPrixFormComponent,
					},
					{
						path: "echantillon-show",
						component: EchantillonAoDetailComponent,
					},
					{
						path: "ao-detail",
						component: AoDetailComponent,
						children: [
							{
								path: "ao-visite",
								component: AoVisiteComponent,
							},
							{
								path: "commission",
								component: CommissionComponent,
							},
							{
								path: "journal",
								component: AoJournauxComponent,
							},
							{
								path: "ligneBP-form",
								component: LigneBordereauPrixFormComponent,
							},
							{
								path: "circuit-validation",
								component: ValiDgComponent,
							},
							{
								path: "valide-tresorerie",
								component: ValideTresorerieComponent,
							},
							{
								path: "valide-dg-service",
								component: ValideDgServiceComponent,
							},
							{
								path: "prestataires",
								component: PrestatairesComponent,
							},
							{
								path: "ao-echantillon",
								component: AoEchantillonComponent,
							},
							{
								path: "pieces-jointes",
								component: PjAoComponent,
							},
							{
								path: "ao-statut",
								component: AoStatutComponent,
							},
						],
					},
					{
						path: "ao-edit",
						component: AoEditComponent,
					},
					{
						path: "ao-edit-sm",
						component: AoEditSmComponent,
					},
					{
						path: "ao-list",
						component: AoListComponent,
					},
					{
						path: "ao-consultation-list",
						component: AoConsultationListComponent,
						data: {
							defaultSort: "id,desc",
						},
					},
					{
						path: "ao-consultation-add",
						component: AoConsultationAddComponent,
						
					},
					{
						path: "ao-consultation-edit",
						component: AoConsultationEditComponent,
						
					},
					{
						path: "ao-consultation-detail",
						component: AoConsultationDetailComponent,
						children: [
							{
								path: "ao-visite",
								component: AoVisiteComponent,
							},
							{
								path: "commission",
								component: CommissionComponent,
							},
							{
								path: "journal",
								component: AoJournauxComponent,
							},
							{
								path: "ligneBP-form-consultation",
								component: LigneBordereauPrixFormConsultationComponent,
							},
							{
								path: "circuit-validation-consultation",
								component: ValiDgConsultationComponent,
							},
							{
								path: "valide-tresorerie-consultation",
								component: ValideTresorerieConsultationComponent,
							},
							{
								path: "valide-dg-service-consultation",
								component: ValiDgServiceConsultationComponent,
							},
							{
								path: "prestataires",
								component: PrestatairesComponent,
							},
							{
								path: "ao-echantillon",
								component: AoEchantillonComponent,
							},
							{
								path: "pieces-jointes",
								component: PjAoComponent,
							},
							{
								path: "ao-statut",
								component: AoStatutComponent,
							},
						],
					},
					{
						path: "ao-form",
						component: AoFormComponent,
					},
					{
						path: "ao-recherche",
						component: AoRechercheComponent,
					},
					{
						path: "ao-maintien-offre",
						component: AoMaintienOffreComponent,
					},
					{
						path: "consultation-architecturale",
						component: ConsultationArchitecturaleListComponent,
					},
					{
						path: "consultation-architecturale-edit/:id",
						component: ConsultationArchitecturaleEditComponent,
					},

					{
						path: "consultation-architecturale-add",
						component: ConsultationArchitecturaleFormComponent,
					},
					{
						path: "ca-detail",
						component: CaDetailComponent,
						children: [
							{
								path: "visa-president",
								component: ValidePresidentComponent,
							},
							{
								path: "visa-dgs",
								component: ValideDgsComponent,
							},
							{
								path: "visa-tresorier",
								component: ValideTresorierComponent,
							},
							{
								path: "ca-visite",
								component: CaVisiteComponent,
							},
							{
								path: "ca-journaux",
								component: CaJournauxComponent,
							},
							{
								path: "ca-commission",
								component: CaCommissionComponent,
							},
							{
								path: "ca-architectes",
								component: CaArchitecteComponent,
							},
						],
					},
				],
			},
		]),
		NgxPermissionsModule.forChild(),
		TranslateModule.forChild(),
		PartialsModule,
		MaterialsModule,
	],
	entryComponents: [ShowSeanceDialogComponent, SeanceResultatDefComponent, EditLotMarcheComponent,ShowPjCommentaireComponent,
		SeanceDialogComponent,
		ModalShowCalendrierAoComponent,
		ModalShowCalendrierBcComponent,
		AoValidationDialogComponent,
		EditVisiteCaComponent,
		//ConfirmDialogComponent,
		EditLigneBpComponent,
		EditVisiteAoComponent,
		EditLigneEchantillonComponent,
		EditEchantillonComponent,
		ConcelAoComponent,
		ValiderBcModalComponent,
		ValiderContratModalComponent,
		EditJournalComponent,
		EditSecteurComponent,
		EditArchitectInfiComponent,
		EditLotAoComponent,
		EditAgrementAoComponent,
		EditArchitecteComponent,
		LettreMaintienDialogComponent,
		DialogALertAOComponent
	],
	exports: [TranslateModule, MaterialsModule,PrestatairesComponent],
	providers: [
		{
			provide: MatPaginatorIntl,
			deps: [TranslateService],
			useFactory: (translateService: TranslateService) =>
				new PaginatorI18n(translateService).getPaginatorIntl(),
		},
	],
})
export class MarcheModule {}
