import { StatisticsModule } from './views/pages/statistics/statistics.module';
import { SortieModule } from './views/pages/sortie/sortie.module';
import { VaccinationModule } from './views/pages/vaccination/vaccination.module';
import { EnterrementModule } from './views/pages/enterrement/enterrement.module';
// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./views/theme/base/base.component";
// Auth
import { AuthGuard } from "./core/auth";
import { ErrorPageComponent } from "./views/theme/content/error-page/error-page.component";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("./views/pages/auth/auth.module").then((m) => m.AuthModule),
	},

	{
		path: "",
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			//********************TR 2**********************************/
			{
				path: "gestionStock",

				loadChildren: () => import("./views/pages/gestion-stocks/gestion-stock.module").then((m) => m.GestionStockModule),
			},
			{
				path: "pesee",

				loadChildren: () => import("./views/pages/pesee/pesee.module").then((m) => m.PeseeModule),
			},
			
			{
				path: "audiences",

				loadChildren: () => import("./views/pages/audiences/audiences.module").then((m) => m.AudiencesModule),
			},

			{
				path: "marcheGros",

				loadChildren: () => import("./views/pages/marcheGros/marche.Module").then((m) => m.MarcheModule),
			},
			{
				path: "statistiques",

				loadChildren: () => import("./views/pages/statistiques/statistiques.module").then((m) => m.StatistiquesModule),
			},
			{
				path: "stock",

				loadChildren: () =>
					import("./views/pages/stock/stock.module").then(m=>m.stockModule)
			},
			{
				path: "parametrage",

				loadChildren: () => import("./views/pages/parametrage/parametrage.module").then((m) => m.ParametrageModule),
			},
			{
				path: "gestionParcAuto",

				loadChildren: () => import("./views/pages/gestion-parc-auto/gestion-parc-auto.module").then((m) => m.GestionParcAutoModule),
			},

			//********************ADIL**********************************/
			{
				path: "personnel",

				loadChildren: () => import("./views/pages/rh/personnel/personnel.module").then((m) => m.PersonnelModule),
			},
			{
				path: "permanence",
				loadChildren: () => import("./views/pages/rh/permanence/permanence.module").then((m) => m.PermanenceModule),
			},
			{
				path: "notation",
				loadChildren: () => import("./views/pages/rh/notation/notation.module").then((m) => m.NotationModule),
			},
			{
				path: "attestation",
				loadChildren: () => import("./views/pages/rh/attestation/attestation.module").then((m) => m.AttestationModule),
			},
			{
				path: "presence",
				loadChildren: () => import("./views/pages/rh/presence/presence.module").then((m) => m.PresenceModule),
			},
			{
				path: "conge",
				loadChildren: () => import("./views/pages/rh/conge/conge.module").then((m) => m.CongeModule),
			},
			{
				path: "prestataire",
				loadChildren: () => import("./views/pages/projet/prestataire/prestataire.module").then((m) => m.PrestataireModule),
			},
			{
				path: "projet",
				loadChildren: () => import("./views/pages/projet/projet/projet.module").then((m) => m.ProjetModule),
			},

			{
				path: "patrimoine",
				loadChildren: () => import("./views/pages/patrimoine-communal/patrimoine/patrimoine.module").then((m) => m.PatrimoineModule),
			},
			{
				path: "immatriculation",
				loadChildren: () => import("./views/pages/immatriculation/immatriculation/immatriculation.module").then((m) => m.ImmatriculationModule),
			},
			{
				path: "marche",
				loadChildren: () => import("./views/pages/patrimoine-communal/marche/marche.module").then((m) => m.MarcheModule),
			},
			{
				path: "locataire",
				loadChildren: () => import("./views/pages/patrimoine-communal/locataire/locataire.module").then((m) => m.LocataireModule),
			},
			{
				path: "habitation",
				loadChildren: () => import("./views/pages/patrimoine-communal/habitation/habitation.module").then((m) => m.HabitationModule),
			},
			{
				path: "toilette",
				loadChildren: () => import("./views/pages/patrimoine-communal/toilette/toilette.module").then((m) => m.ToiletteModule),
			},
			{
				path: "domaine",
				loadChildren: () => import("./views/pages/patrimoine-communal/domaine/domaine.module").then((m) => m.DomaineModule),
			},
			{
				path: "user",
				loadChildren: () => import("./views/pages/user-roles-md/user-roles.module").then((m) => m.UserolesModule),
			},
			//********************NAIMA*********************************/
			{
				path: "reclamations",
				loadChildren: () => import("./views/pages/reclamations/reclamations.module").then((m) => m.ReclamationsModule),
			},
			{
				path: "personne-physique",
				loadChildren: () => import("./views/pages/personne-physique/personne-physique.module").then((m) => m.PersonnePhysiqueModule),
			},
			{
				path: "personne-morale",
				loadChildren: () => import("./views/pages/personne-morale/personne-morale.module").then((m) => m.PersonneMoraleModule),
			},
			{
				path: "autorisations",
				loadChildren: () => import("./views/pages/autorisations/autorisations.module").then((m) => m.AutorisationsModule),
			},
			{
				path: "reservations",
				loadChildren: () => import("./views/pages/reservations/reservations.module").then((m) => m.ReservationsModule),
			},
			{
				path: "affaires-conseil",
				loadChildren: () => import("./views/pages/affaires-conseil/affaires-conseil.module").then((m) => m.AffairesConseilModule),
			},
			{
				path: "marches",
				loadChildren: () => import("./views/pages/marche/marche.module").then((m) => m.MarcheModule),
			},

			//********************RACHID**********************************/
			{
				path: "intervention-rapide",
				loadChildren: () => import("./views/pages/travaux-communaux/intervention-rapide/intervention-rapide.module").then((m) => m.InterventionRapideModule),
			},
			{
				path: "projet-urbanisme",
				loadChildren: () => import("./views/pages/travaux-communaux/projet-urbanisme/projet-urbanisme.module").then((m) => m.ProjetUrbanismeModule),
			},
			{
				path: "insertion-publicitaire",
				loadChildren: () => import("./views/pages/insertion-publicitaire/insertion-publicitaire/insertion-publicitaire.module").then((m) => m.InsertionPublicitaireModule),
			},
			{
				path: "insertion-media",
				loadChildren: () => import("./views/pages/insertion-publicitaire/insertion-media/insertion-media.module").then((m) => m.InsertionMediaModule),
			},
			{
				path: "immobilisation",
				loadChildren: () => import("./views/pages/immobilisation/immobilisation/immobilisation.module").then((m) => m.ImmobilisationModule),
			},
			{
				path: "emplacement",
				loadChildren: () => import("./views/pages/immobilisation/emplacement/emplacement.module").then((m) => m.EmplacementModule),
			},
			{
				path: "reforme",
				loadChildren: () => import("./views/pages/immobilisation/reforme/reforme.module").then((m) => m.ReformeModule),
			},
			// {
			// 	path: "parc",
			// 	loadChildren: () =>
			// 		import(
			// 			"./views/pages/parc/parc.module"
			// 		).then((m) => m.parcModule),
			// },
			{
				path: "courriers-entrants",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/bureau-order/courriers-entrants/courriers-entrants.module").then((m) => m.CourriersEntrantsModule),
			},
			{
				path: "courriers-convocations",
				loadChildren: () => import("./views/pages/bureau-order/courriers-convocations/courriers-convocations.module").then((m) => m.CourriersConvocationsModule),
			},
			{
				path: "statistiques-bo",
				loadChildren: () => import("./views/pages/bureau-order/statistiques-bo/statistiques-bo.module").then((m) => m.StatistiquesBOModule),
			},
			{
				path: "top-management",
				loadChildren: () => import("./views/pages/bureau-order/top-management/top-management.module").then((m) => m.TopManagementModule),
			},
			{
				path: "courriers-sortants",
				loadChildren: () => import("./views/pages/bureau-order/courriers-sortants/courriers-sortants.module").then((m) => m.CourriersSortantsModule),
			},
			{
				path: "destinataire-courrier",
				loadChildren: () => import("./views/pages/bureau-order/destinataire-courrier/destinataire-courrier.module").then((m) => m.DestinataireCourrierModule),
			},
			{
				path: "origine-courriers-sortants",
				loadChildren: () => import("./views/pages/bureau-order/origine-courriers-sortants/origine-courriers-sortants.module").then((m) => m.OrigineCourriersSortantsModule),
			},
			{
				path: "personne-physique",
				loadChildren: () => import("./views/pages/bureau-order/personne-physique/personne-physique.module").then((m) => m.PersonnePhysiqueModule),
			},
			{
				path: "partenaires-externe",
				loadChildren: () => import("./views/pages/bureau-order/partenaires-externe/partenaires-externe.module").then((m) => m.PartenairesExterneModule),
			},
			{
				path: "personnel-courriers",
				loadChildren: () => import("./views/pages/bureau-order/personnel-courriers/personnel-courriers.module").then((m) => m.PersonnelCourriersModule),
			},
			{
				path: "parc",
				loadChildren: () =>
					import(
						"./views/pages/parc/parc.module"
					).then((m) => m.ParcModule),
			},
			{
				path: "courriers-refuses",
				loadChildren: () => import("./views/pages/bureau-order/courriers-refuses/courriers-refuses.module").then((m) => m.CourriersRefusesModule),
			},
			{
				path: "associations",
				loadChildren: () => import("./views/pages/associations/associations.module").then((m) => m.AssociationsModule),
			},
			{
				path: "subventions",
				loadChildren: () => import("./views/pages/subventions/subventions/subventions.module").then((m) => m.SubventionsModule),
			},
			{
				path: "conventions",
				loadChildren: () =>
					import(
						"./views/pages/conventions/convention.module"
					).then((m) => m.ConventionModule),
			},
			{
				path: "festivales",
				loadChildren: () => import("./views/pages/festivales/festivales.module").then((m) => m.FestivalesModule),
			},
			{
				path: "logistique",
				loadChildren: () => import("./views/pages/logistique/logistique.module").then((m) => m.LogistiqueModule),
			},
			{
				path: "acquisition",
				loadChildren: () => import("./views/pages/acquisition/acquisition.module").then((m) => m.AcquisitionModule),
			},
			{
				path: "locaux",
				loadChildren: () => import("./views/pages/locaux/locaux/locaux.module").then((m) => m.LocauxModule),
			},
			{
				path: "projet-partenariat",
				loadChildren: () => import("./views/pages/projet-partenariat/projet-partenariat/projet-partenariat.module").then((m) => m.ProjetPartenariatModule),
			},
			{
				path: "activites",
				loadChildren: () => import("./views/pages/activites/activites/activites.module").then((m) => m.ActivitesModule),
			},
			{
				path: "hebergement",
				loadChildren: () => import("./views/pages/subventions/hebergement/hebergement.module").then((m) => m.HebergementModule),
			},
			{
				path: "restauration",
				loadChildren: () => import("./views/pages/subventions/restauration/restauration.module").then((m) => m.RestaurationModule),
			},
			{
				path: "impression",
				loadChildren: () => import("./views/pages/subventions/impression/impression.module").then((m) => m.ImpressionModule),
			},
			{
				path: "document-admin",
				loadChildren: () => import("./views/pages/document-admin/document-admin.module").then((m) => m.DocumentAdminModule),
			},
			{
				path: "divers",
				loadChildren: () => import("./views/pages/subventions/divers/divers.module").then((m) => m.DiversModule),
			},
			//*******************************MAJ YUSSEF ***************************** */
			{
				path: "beneficiaire",
				loadChildren: () => import("./views/pages/patrimoine-communal/beneficiaire/beneficiaire.module").then((m) => m.BeneficiaireModule),
			},
			{
				path: "festivales",
				loadChildren: () => import("./views/pages/festivales/festivales.module").then((m) => m.FestivalesModule),
			},
			//*******************************Ahmed AOUARI ***************************** */

			{
				path: "statistique",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/bureau-order/statistique/statiatique.module").then((m) => m.StatistiquesModule),
			},

			// Tanche 2

			{
				path: "convention",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/pack/convention/convention.module").then((m) => m.ConventionModule),
			},
			{
				path: "programme",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/pack/programme/programme.module").then((m) => m.ProgrammeModule),
			},
			{
				path: "projet",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/pack/projet/projet.module").then((m) => m.ProjetModule),
			},
			{
				path: "bmh",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/parametrage-bmh/parametrage-bmh.module").then((m) => m.ParametrageBmhModule),
			},
			{
				path: "bmh1",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/medecin-legale-bmh/medecin-legale/medecin-legale.module").then((m) => m.MedecinLegaleModule),
			},

			{
				path: "etablissement",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/etablissement/etablissement.module").then((m) => m.EtablissementModule),
			},
			{
				path: "actdecision",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/decision/decision.module").then((m) => m.DecisionModule),
			},
			{
				path: "cartesanitaire",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/carte-sanitaire/carte-sanitaire.module").then((m) => m.CarteSanitaireModule),
			},
			{
				path: "enterrement",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/enterrement/enterrement.module").then((m) => m.EnterrementModule),
			},
			{
				path: "vaccination",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/vaccination/vaccination.module").then((m) => m.VaccinationModule),
			},
			{
				path: "sortie",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/sortie/sortie.module").then((m) => m.SortieModule),
			},
			{
				path: "statistiques",
				//component:CourriersEntrantsComponent,
				loadChildren: () => import("./views/pages/statistics/statistics.module").then((m) => m.StatisticsModule),
			},
			// {
			// 	// path: "etab",
			// 	// //component:CourriersEntrantsComponent,
			// 	// loadChildren: () => import("./views/pages/parametrage-bmh/list-etablissement/list-etablissement.component.html").then((m) => m.MedecinLegaleModule),
			// },
			// ***************************** ERROR ********************************
			{ path: "error", component: ErrorPageComponent },
			{ path: "", redirectTo: "", pathMatch: "full" },
			{ path: "**", redirectTo: "", pathMatch: "full" },
		],
	},
	//{path: '**', redirectTo: 'error', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
