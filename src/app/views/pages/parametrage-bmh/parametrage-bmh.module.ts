import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
	MatDialogModule,
	MatIconModule,
	MatStepperModule,
    MatTableModule,
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { ParametrageBmhComponent } from "./parametrage-bmh.component";
import { ListTypesComponent } from "./list-types/list-types.component";
import { AddTypesComponent } from './add-types/add-types.component';
import { UpdTypeComponent } from './upd-type/upd-type.component';
import { DetailsTypeComponent } from './details-type/details-type.component';
import { ListConstateurComponent} from './list-constateur/list-constateur.component';
import { AddConstateurComponent } from './add-constateur/add-constateur.component';
import { UpdateConstateurComponent } from './update-constateur/update-constateur.component';
import { DetailsConstateurComponent } from "./details-constateur/details-constateur.component";
import { ListTypeExamenComponent } from './list-type-examen/list-type-examen.component';
import { AddTypeExamenComponent } from './add-type-examen/add-type-examen.component';
import { UpdateTypeExamenComponent } from './update-type-examen/update-type-examen.component';
import { DetailsTypeExamenComponent } from './details-type-examen/details-type-examen.component';
import { ListMedecinOperantComponent } from './list-medecin-operant/list-medecin-operant.component';
import { AddMedecinOperantComponent } from './add-medecin-operant/add-medecin-operant.component';
import { UpdateMedecinOperantComponent } from './update-medecin-operant/update-medecin-operant.component';
import { DetailsMedecinOperantComponent } from './details-medecin-operant/details-medecin-operant.component';
import { ListStatusComponent } from './list-status/list-status.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { DetailsStatusComponent } from './details-status/details-status.component';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { AddVehiculeComponent } from './add-vehicule/add-vehicule.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { DetailsVehiculeComponent } from './details-vehicule/details-vehicule.component';
import { ListConducteurComponent } from './list-conducteur/list-conducteur.component';
import { AddConducteurComponent } from './add-conducteur/add-conducteur.component';
import { UpdateConducteurComponent } from './update-conducteur/update-conducteur.component';
import { DetailsConducteurComponent } from './details-conducteur/details-conducteur.component';
import { ListTypeControleComponent } from './list-type-controle/list-type-controle.component';
import { AddTypeControleComponent } from './add-type-controle/add-type-controle.component';
import { UpdateTypeControleComponent } from './update-type-controle/update-type-controle.component';
import { DetailsTypeControleComponent } from './details-type-controle/details-type-controle.component';
import { ListSousTypeComponent } from './list-sous-type/list-sous-type.component';
import { AddSousTypeComponent } from './add-sous-type/add-sous-type.component';
import { DetailsSousTypeComponent } from './details-sous-type/details-sous-type.component';
import { UpdateSousTypeComponent } from './update-sous-type/update-sous-type.component';
import { ListTypeAnalyseComponent } from './list-type-analyse/list-type-analyse.component';
import { AddTypeAnalyseComponent } from './add-type-analyse/add-type-analyse.component';
import { UpdateTypeAnalyseComponent } from './update-type-analyse/update-type-analyse.component';
import { DetailsTypeAnalyseComponent } from './details-type-analyse/details-type-analyse.component';
import { ListDecisionComponent } from './list-decision/list-decision.component';
import { AddDecisionComponent } from './add-decision/add-decision.component';
import { UpdateDecisionComponent } from './update-decision/update-decision.component';
import { DetailsDecisionComponent } from './details-decision/details-decision.component';
import { ListEtablissementComponent } from './list-etablissement/list-etablissement.component';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';
import { UpdateEtablissementComponent } from './update-etablissement/update-etablissement.component';
import { DetailsEtablissementComponent } from './details-etablissement/details-etablissement.component';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { UpdateAgentComponent } from './update-agent/update-agent.component';
import { DetailsAgentComponent } from './details-agent/details-agent.component';
import { ListConventionComponent } from './list-convention/list-convention.component';
import { AddConventionComponent } from './add-convention/add-convention.component';
import { UpdateConventionComponent } from './update-convention/update-convention.component';
import { DetailsConventionComponent } from './details-convention/details-convention.component';
import { ListTypeVaccinationComponent } from './list-type-vaccination/list-type-vaccination.component';
import { AddTypeVaccinationComponent } from './add-type-vaccination/add-type-vaccination.component';
import { DetailsTypeVaccinationComponent } from './details-type-vaccination/details-type-vaccination.component';
import { UpdateTypeVaccinationComponent } from './update-type-vaccination/update-type-vaccination.component';
import { ListTypeDeclarrationComponent } from './list-type-declarration/list-type-declarration.component';
import { DetailsTypeDeclarrationComponent } from './details-type-declarration/details-type-declarration.component';
import { AddTypeDeclarrationComponent } from './add-type-declarration/add-type-declarration.component';
import { UpdateTypeDeclarrationComponent } from './update-type-declarration/update-type-declarration.component';
import { ListAnimalComponent } from './list-animal/list-animal.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { UpdateAnimalComponent } from './update-animal/update-animal.component';
import { DetailsAnimalComponent } from './details-animal/details-animal.component';
import { ListVaccinationStatutComponent } from './list-vaccination-statut/list-vaccination-statut.component';
import { AddVaccinationStatutComponent } from './add-vaccination-statut/add-vaccination-statut.component';
import { DetailsVaccinationStatutComponent } from './details-vaccination-statut/details-vaccination-statut.component';
import { UpdateVaccinationStatutComponent } from './update-vaccination-statut/update-vaccination-statut.component';
import { ListObjetSortieComponent } from './list-objet-sortie/list-objet-sortie.component';
import { AddObjetSortieComponent } from './add-objet-sortie/add-objet-sortie.component';
import { UpdateObjetSortieComponent } from './update-objet-sortie/update-objet-sortie.component';
import { DetailsObjetSortieComponent } from './details-objet-sortie/details-objet-sortie.component';
import { ListTypeTraitementComponent } from './list-type-traitement/list-type-traitement.component';
import { AddTypeTraitementComponent } from './add-type-traitement/add-type-traitement.component';
import { UpdateTypeTraitementComponent } from './update-type-traitement/update-type-traitement.component';
import { DetailsTypeTraitementComponent } from './details-type-traitement/details-type-traitement.component';
import { ListEquipeComponent } from './list-equipe/list-equipe.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { UpdateEquipeComponent } from './update-equipe/update-equipe.component';
import { DetailsEquipeComponent } from './details-equipe/details-equipe.component';
import { ListQuantiteComponent } from './list-quantite/list-quantite.component';
import { AddQuantiteComponent } from './add-quantite/add-quantite.component';
import { UpdateQuantiteComponent } from './update-quantite/update-quantite.component';
import { DetailsQuantiteComponent } from './details-quantite/details-quantite.component';
import { ListProduitUtiliseComponent } from './list-produit-utilise/list-produit-utilise.component';
import { AddProduitUtiliseComponent } from './add-produit-utilise/add-produit-utilise.component';
import { UpdateProduitUtiliseComponent } from './update-produit-utilise/update-produit-utilise.component';
import { DetailsProduitUtiliseComponent } from './details-produit-utilise/details-produit-utilise.component';
import { ListCommuneComponent } from './list-commune/list-commune.component';
import { AddCommuneComponent } from './add-commune/add-commune.component';
import { UpdateCommuneComponent } from './update-commune/update-commune.component';
import { DetailsCommuneComponent } from './details-commune/details-commune.component';
import { ListArrondissementComponent } from './list-arrondissement/list-arrondissement.component';
import { AddArrondissementComponent } from './add-arrondissement/add-arrondissement.component';
import { UpdateArrondissementComponent } from './update-arrondissement/update-arrondissement.component';
import { DetailsArrondissementComponent } from './details-arrondissement/details-arrondissement.component';
import { ListQuartierComponent } from './list-quartier/list-quartier.component';
import { AddQuartierComponent } from './add-quartier/add-quartier.component';
import { UpdateQuartierComponent } from './update-quartier/update-quartier.component';
import { DetailsQuartierComponent } from './details-quartier/details-quartier.component';
import { ListTraitementEffectueComponent } from './list-traitement-effectue/list-traitement-effectue.component';
import { AddTraitementEffectueComponent } from './add-traitement-effectue/add-traitement-effectue.component';
import { UpdateTraitementEffectueComponent } from './update-traitement-effectue/update-traitement-effectue.component';
import { DetailsTraitementEffectueComponent } from './details-traitement-effectue/details-traitement-effectue.component';
import { ListCartesComponent } from './list-cartes/list-cartes.component';
import { ListActionComponent } from './list-action/list-action.component';
import { ListProgrammeComponent } from './list-programme/list-programme.component';
import { ListControleurComponent } from './list-controleur/list-controleur.component';
import { AddControleurComponent } from './add-controleur/add-controleur.component';
import { UpdateControleurComponent } from './update-controleur/update-controleur.component';
import { DetailsControleurComponent } from './details-controleur/details-controleur.component';


@NgModule({
	declarations: [
		ParametrageBmhComponent,
        ListTypesComponent,
        AddTypesComponent,
        UpdTypeComponent,
        DetailsTypeComponent,
		ListConstateurComponent,
		AddConstateurComponent,
		UpdateConstateurComponent,
		DetailsConstateurComponent,
		ListTypeExamenComponent,
		AddTypeExamenComponent,
		UpdateTypeExamenComponent,
		DetailsTypeExamenComponent,
		ListMedecinOperantComponent,
		AddMedecinOperantComponent,
		UpdateMedecinOperantComponent,
		DetailsMedecinOperantComponent,
		ListStatusComponent,
		AddStatusComponent,
		UpdateStatusComponent,
		DetailsStatusComponent,
		ListVehiculeComponent,
		AddVehiculeComponent,
		UpdateVehiculeComponent,
		DetailsVehiculeComponent,
		ListConducteurComponent,
		AddConducteurComponent,
		UpdateConducteurComponent,
		DetailsConducteurComponent,
		ListTypeControleComponent,
		AddTypeControleComponent,
		UpdateTypeControleComponent,
		DetailsTypeControleComponent,
		ListSousTypeComponent,
		AddSousTypeComponent,
		DetailsSousTypeComponent,
		UpdateSousTypeComponent,
		ListTypeAnalyseComponent,
		AddTypeAnalyseComponent,
		UpdateTypeAnalyseComponent,
		DetailsTypeAnalyseComponent,
		ListDecisionComponent,
		AddDecisionComponent,
		UpdateDecisionComponent,
		DetailsDecisionComponent,
		ListEtablissementComponent,
		AddEtablissementComponent,
		UpdateEtablissementComponent,
		DetailsEtablissementComponent,
		ListAgentComponent,
		AddAgentComponent,
		UpdateAgentComponent,
		DetailsAgentComponent,
		ListConventionComponent,
		AddConventionComponent,
		UpdateConventionComponent,
		DetailsConventionComponent,
		ListTypeVaccinationComponent,
		AddTypeVaccinationComponent,
		DetailsTypeVaccinationComponent,
		UpdateTypeVaccinationComponent,
		ListTypeDeclarrationComponent,
		DetailsTypeDeclarrationComponent,
		AddTypeDeclarrationComponent,
		UpdateTypeDeclarrationComponent,
		ListAnimalComponent,
		AddAnimalComponent,
		UpdateAnimalComponent,
		DetailsAnimalComponent,
		ListVaccinationStatutComponent,
		AddVaccinationStatutComponent,
		DetailsVaccinationStatutComponent,
		UpdateVaccinationStatutComponent,
		ListObjetSortieComponent,
		AddObjetSortieComponent,
		UpdateObjetSortieComponent,
		DetailsObjetSortieComponent,
		ListTypeTraitementComponent,
		AddTypeTraitementComponent,
		UpdateTypeTraitementComponent,
		DetailsTypeTraitementComponent,
		ListEquipeComponent,
		AddEquipeComponent,
		UpdateEquipeComponent,
		DetailsEquipeComponent,
		ListQuantiteComponent,
		AddQuantiteComponent,
		UpdateQuantiteComponent,
		DetailsQuantiteComponent,
		ListProduitUtiliseComponent,
		AddProduitUtiliseComponent,
		UpdateProduitUtiliseComponent,
		DetailsProduitUtiliseComponent,
		ListCommuneComponent,
		AddCommuneComponent,
		UpdateCommuneComponent,
		DetailsCommuneComponent,
		ListArrondissementComponent,
		AddArrondissementComponent,
		UpdateArrondissementComponent,
		DetailsArrondissementComponent,
		ListQuartierComponent,
		AddQuartierComponent,
		UpdateQuartierComponent,
		DetailsQuartierComponent,
		ListTraitementEffectueComponent,
		AddTraitementEffectueComponent,
		UpdateTraitementEffectueComponent,
		DetailsTraitementEffectueComponent,
		ListCartesComponent,
		ListActionComponent,
		ListProgrammeComponent,
		ListControleurComponent,
		AddControleurComponent,
		UpdateControleurComponent,
		DetailsControleurComponent,
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
        MatTableModule,
		RouterModule.forChild([
			{
				path: "",
				component: ParametrageBmhComponent,
				children: [
					{
						path: "list-types",
						component: ListTypesComponent,
					},
					{
						path: "add-types",
						component: AddTypesComponent,
					},
					{
						path: "upd-type/:id",
						component: UpdTypeComponent,
					},
					{
						path: "details-type/:id",
						component: DetailsTypeComponent,
					},
					{
						path: "list-constateur",
						component: ListConstateurComponent,
					},
					{
						path: "add-constateur",
						component: AddConstateurComponent,
					},
					{
						path: "update-constateur/:id",
						component: UpdateConstateurComponent,
					},
					
					{
						path: "details-constateur/:id",
						component: DetailsConstateurComponent,
					},
					{
						path: "list-type-examen",
						component: ListTypeExamenComponent,
					},
					{
						path: "add-type-examen",
						component: AddTypeExamenComponent,
					},
					{
						path: "update-type-examen/:id",
						component: UpdateTypeExamenComponent,
					},
					{
						path: "details-type-examen/:id",
						component: DetailsTypeExamenComponent,
					},
					{
						path: "list-medecin-operant",
						component: ListMedecinOperantComponent,
					},
					{
						path: "add-medecin-operant",
						component: AddMedecinOperantComponent,
					},
					{
						path: "update-medecin-operant/:id",
						component: UpdateMedecinOperantComponent,
					},
					{
						path: "details-medecin-operant/:id",
						component: DetailsMedecinOperantComponent,
					},
					{
						path:"list-status",
						component:ListStatusComponent
					},
					{
						path:"add-status",
						component:AddStatusComponent
					},
					{
						path:"update-status/:id",
						component:UpdateStatusComponent
					},
					{
						path:"details-status/:id",
						component:DetailsStatusComponent
					},
					{
						path:"list-vehicule",
						component:ListVehiculeComponent
					},
					{
						path:"add-vehicule",
						component:AddVehiculeComponent
					},
					{
						path:"update-vehicule/:id",
						component:UpdateVehiculeComponent
					},
					{
						path:"details-vehicule/:id",
						component:DetailsVehiculeComponent
					},
					{
						path:"list-conducteur",
						component:ListConducteurComponent
					},
					{
						path:"add-conducteur",
						component:AddConducteurComponent
					},
					{
						path:"details-conducteur/:id",
						component:DetailsConducteurComponent
					},
					{
						path:"update-conducteur/:id",
						component:UpdateConducteurComponent
					},
					{
						path:"list-type-controle",
						component:ListTypeControleComponent
					},
					{
						path:"update-type-controle/:id",
						component:UpdateTypeControleComponent
					},
					{
						path:"details-type-controle/:id",
						component:DetailsTypeControleComponent
					},
					{
						path:"add-type-controle",
						component:AddTypeControleComponent
					},
					{
						path:"list-sous-type",
						component:ListSousTypeComponent
					},
					{
						path:"add-sous-type",
						component:AddSousTypeComponent
					},
					{
						path:"update-sous-type/:id",
						component:UpdateSousTypeComponent
					},
					{
						path:"details-sous-type/:id",
						component:DetailsSousTypeComponent
					},
					{
						path:"list-type-analyse",
						component:ListTypeAnalyseComponent
					},
					{
						path:"add-type-analyse",
						component:AddTypeAnalyseComponent
					},
					{
						path:"update-type-analyse/:id",
						component:UpdateTypeAnalyseComponent
					},
					{
						path:"details-type-analyse/:id",
						component:DetailsTypeAnalyseComponent
					},
					{
						path:"add-decision",
						component:AddDecisionComponent
					},
					{
						path:"list-decision",
						component:ListDecisionComponent
					},
					{
						path:"update-decision/:id",
						component:UpdateDecisionComponent
					},
					{
						path:"details-decision/:id",
						component:DetailsDecisionComponent
					},
					{
						path:"list-etablissement",
						component:ListEtablissementComponent
					},
					{
						path:"add-etablissement",
						component:AddEtablissementComponent
					},
					{
						path:"update-etablissement/:id",
						component:UpdateEtablissementComponent
					},
					{
						path:"details-etablissement/:id",
						component:DetailsEtablissementComponent
					},
					{
						path:"list-agent",
						component:ListAgentComponent
					},
					{
						path:"add-agent",
						component:AddAgentComponent
					},
					{
						path:"update-agent/:id",
						component:UpdateAgentComponent
					},
					{
						path:"details-agent/:id",
						component:DetailsAgentComponent
					},
					{
						path:"list-convention",
						component:ListConventionComponent
					},
					{
						path:"add-convention",
						component:AddConventionComponent
					},
					{
						path:"update-convention/:id",
						component:UpdateConventionComponent
					},
					{
						path:"details-convention/:id",
						component:DetailsConventionComponent
					},
					{
						path:"list-type-vaccination",
						component:ListTypeVaccinationComponent
					},
					{
						path:"add-type-vaccination",
						component:AddTypeVaccinationComponent
					},
					{
						path:"update-type-vaccination/:id",
						component:UpdateTypeVaccinationComponent
					},
					{
						path:"details-type-vaccination/:id",
						component:DetailsTypeVaccinationComponent
					},
					{
						path:"list-type-declarration",
						component:ListTypeDeclarrationComponent
					},
					{
						path:"add-type-declarration",
						component:AddTypeDeclarrationComponent
					},
					{
						path:"update-type-declarration/:id",
						component:UpdateTypeDeclarrationComponent
					},
					{
						path:"details-type-declarration/:id",
						component:DetailsTypeDeclarrationComponent
					},
					{
						path:"list-animal",
						component:ListAnimalComponent
					},
					{
						path:"add-animal",
						component:AddAnimalComponent
					},
					{
						path:"update-animal/:id",
						component:UpdateAnimalComponent
					},
					{
						path:"details-animal/:id",
						component:DetailsAnimalComponent
					},
					{
						path:"list-vaccination-statut",
						component:ListVaccinationStatutComponent
					},
					{
						path:"add-vaccination-statut",
						component:AddVaccinationStatutComponent
					},
					{
						path:"update-vaccination-statut/:id",
						component:UpdateVaccinationStatutComponent
					},
					{
						path:"details-vaccination-statut/:id",
						component:DetailsVaccinationStatutComponent
					},
					{
						path:"list-objet-sortie",
						component:ListObjetSortieComponent
					},
					{
						path:"add-objet-sortie",
						component:AddObjetSortieComponent
					},
					{
						path:"update-objet-sortie/:id",
						component:UpdateObjetSortieComponent
					},
					{
						path:"details-objet-sortie/:id",
						component:DetailsObjetSortieComponent
					},
					{
						path:"list-type-traitement",
						component:ListTypeTraitementComponent
					},
					{
						path:"add-type-traitement",
						component:AddTypeTraitementComponent
					},
					{
						path:"update-type-traitement/:id",
						component:UpdateTypeTraitementComponent
					},
					{
						path:"details-type-traitement/:id",
						component:DetailsTypeTraitementComponent
					},
					{
						path:"list-equipe",
						component:ListEquipeComponent
					},
					{
						path:"add-equipe",
						component:AddEquipeComponent
					},
					{
						path:"update-equipe/:id",
						component:UpdateEquipeComponent
					},
					{
						path:"details-equipe/:id",
						component:DetailsEquipeComponent
					},
					{
						path:"list-quantite",
						component:ListQuantiteComponent
					},
					{
						path:"add-quantite",
						component:AddQuantiteComponent
					},
					{
						path:"update-quantite/:id",
						component:UpdateQuantiteComponent
					},
					{
						path:"details-quantite/:id",
						component:DetailsQuantiteComponent
					},
					{
						path:"list-produit-utilise",
						component:ListProduitUtiliseComponent
					},
					{
						path:"add-produit-utilise",
						component:AddProduitUtiliseComponent
					},
					{
						path:"update-produit-utilise/:id",
						component:UpdateProduitUtiliseComponent
					},
					{
						path:"details-produit-utilise/:id",
						component:DetailsProduitUtiliseComponent
					},
					{
						path:"list-commune",
						component:ListCommuneComponent
					},
					{
						path:"add-commune",
						component:AddCommuneComponent
					},
					{
						path:"update-commune/:id",
						component:UpdateCommuneComponent
					},
					{
						path:"details-commune/:id",
						component:DetailsCommuneComponent
					},
					{
						path:"list-arrondissement",
						component:ListArrondissementComponent
					},
					{
						path:"add-arrondissement",
						component:AddArrondissementComponent
					},
					{
						path:"update-arrondissement/:id",
						component:UpdateArrondissementComponent
					},
					{
						path:"details-arrondissement/:id",
						component:DetailsArrondissementComponent
					},
					{
						path:"list-quartier",
						component:ListQuartierComponent
					},
					{
						path:"add-quartier",
						component:AddQuartierComponent
					},
					{
						path:"update-quartier/:id",
						component:UpdateQuartierComponent
					},
					{
						path:"details-quartier/:id",
						component:DetailsQuartierComponent
					},
					{
						path:"list-controleur",
						component:ListControleurComponent
					},
					{
						path:"add-controleur",
						component:AddControleurComponent
					},
					{
						path:"update-controleur/:id",
						component:UpdateControleurComponent
					},
					{
						path:"details-controleur/:id",
						component:DetailsControleurComponent
					},
					{
						path:"list-traitement-effectue",
						component:ListTraitementEffectueComponent
					},
					{
						path:"add-traitement-effectue",
						component:AddTraitementEffectueComponent
					},
					{
						path:"update-traitement-effectue/:id",
						component:UpdateTraitementEffectueComponent
					},
					{
						path:"details-traitement-effectue/:id",
						component:DetailsTraitementEffectueComponent
					},
					{
						path:"list-cartes",
						component:ListCartesComponent 
					},
					{
						path:"list-action",
						component: ListActionComponent
					},
					{
						path:"list-programme",
						component: ListProgrammeComponent
					},
				],
			},
		]),
	],
})
export class ParametrageBmhModule {}
