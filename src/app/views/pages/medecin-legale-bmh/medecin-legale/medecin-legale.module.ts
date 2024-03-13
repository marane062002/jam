import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedecinLegaleComponent } from './medecin-legale.component';
import { TranslateModule } from "@ngx-translate/core";
import { ListDecesNaturelComponent } from '../list-deces-naturel/list-deces-naturel.component';
import { AddDecesNaturelComponent } from '../add-deces-naturel/add-deces-naturel.component';
import { UpdateDecesNaturelComponent } from '../update-deces-naturel/update-deces-naturel.component';
import { DetailsDecesNaturelComponent } from '../details-deces-naturel/details-deces-naturel.component';
// import { MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { ListObstaclesComponent } from '../list-obstacles/list-obstacles.component';
import { AddObstaclesComponent } from '../add-obstacles/add-obstacles.component';
import { UpdateObstaclesComponent } from '../update-obstacles/update-obstacles.component';
import { DetailsObstaclesComponent } from '../details-obstacles/details-obstacles.component';
import { ListExamenComponent } from '../list-examen/list-examen.component';
import { AddExamenComponent } from '../add-examen/add-examen.component';
import { UpdateExamenComponent } from '../update-examen/update-examen.component';
import { DetailsExamenComponent } from '../details-examen/details-examen.component';
import { ListAutopsieComponent } from '../list-autopsie/list-autopsie.component';
import { AddAutopsieComponent } from '../add-autopsie/add-autopsie.component';
import { UpdateAutopsieComponent } from '../update-autopsie/update-autopsie.component';
import { DetailsAutopsieComponent } from '../details-autopsie/details-autopsie.component';
import { ListPrelevementComponent } from '../list-prelevement/list-prelevement.component';
import { AddPrelevementComponent } from '../add-prelevement/add-prelevement.component';
import { UpdatePrelevementComponent } from '../update-prelevement/update-prelevement.component';
import { DetailsPrelevementComponent } from '../details-prelevement/details-prelevement.component';
import { ListCadavreComponent } from '../list-cadavre/list-cadavre.component';
import { AddCadavreComponent } from '../add-cadavre/add-cadavre.component';
import { UpdateCadavreComponent } from '../update-cadavre/update-cadavre.component';
import { DetailsCadavreComponent } from '../details-cadavre/details-cadavre.component';
import { ListOrganismeComponent } from '../list-organisme/list-organisme.component';
import { AddOrganismeComponent } from '../add-organisme/add-organisme.component';
import { UpdateOrganismeComponent } from '../update-organisme/update-organisme.component';
import { DetailsOrganismeComponent } from '../details-organisme/details-organisme.component';
import { ListFourgonComponent } from '../list-fourgon/list-fourgon.component';
import { AddFourgonComponent } from '../add-fourgon/add-fourgon.component';
import { UpdateFourgonComponent } from '../update-fourgon/update-fourgon.component';
import { DeatilsFourgonComponent } from '../deatils-fourgon/deatils-fourgon.component';
import { ListMorgueComponent } from '../list-morgue/list-morgue.component';
import { AddMorgueComponent } from '../add-morgue/add-morgue.component';
import { UpdateMorgueComponent } from '../update-morgue/update-morgue.component';
import { DetailsMorgueComponent } from '../details-morgue/details-morgue.component';
import { ListEnterementInhumComponent } from '../list-enterement-inhum/list-enterement-inhum.component';
import { AddEnterementInhumComponent } from '../add-enterement-inhum/add-enterement-inhum.component';
import { UpdateEnterementInhumComponent } from '../update-enterement-inhum/update-enterement-inhum.component';
import { DetailsEnterementInhumComponent } from '../details-enterement-inhum/details-enterement-inhum.component';
import { ListOrigineComponent } from '../list-origine/list-origine.component';
import { AddOrigineComponent } from '../add-origine/add-origine.component';
import { UpdateOrigineComponent } from '../update-origine/update-origine.component';
import { DetailsOrigineComponent } from '../details-origine/details-origine.component';
import { ListTransfertComponent } from '../list-transfert/list-transfert.component';
import { AddTransfertComponent } from '../add-transfert/add-transfert.component';
import { UpdateTransfertComponent } from '../update-transfert/update-transfert.component';
import { DetailsTransfertComponent } from '../details-transfert/details-transfert.component';
import { ListNouveauNeComponent } from '../list-nouveau-ne/list-nouveau-ne.component';
import { AddNouveauNeComponent } from '../add-nouveau-ne/add-nouveau-ne.component';
import { UpdateNouveauNeComponent } from '../update-nouveau-ne/update-nouveau-ne.component';
import { DetailsNouveauNeComponent } from '../details-nouveau-ne/details-nouveau-ne.component';
import { TransformDatePipe } from '../transform-date.pipe';
import { PagesModule } from '../../pages.module';
import { SortirObstaclesComponent } from '../sortir-obstacles/sortir-obstacles.component';
import { PopupComponent } from '../details-obstacles/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupDecesComponent } from '../details-deces-naturel/popup-deces/popup-deces.component';


@NgModule({
	exports:[TransformDatePipe],
  declarations: [TransformDatePipe,
    MedecinLegaleComponent,
    ListDecesNaturelComponent,
    AddDecesNaturelComponent,
    UpdateDecesNaturelComponent,
    DetailsDecesNaturelComponent,
    ListObstaclesComponent,
    AddObstaclesComponent,
    UpdateObstaclesComponent,
    DetailsObstaclesComponent,
	ListExamenComponent,
	AddExamenComponent,
	UpdateExamenComponent,
	DetailsExamenComponent,
	ListAutopsieComponent,
	AddAutopsieComponent,
	UpdateAutopsieComponent,
	DetailsAutopsieComponent,
	ListPrelevementComponent,
	AddPrelevementComponent,
	UpdatePrelevementComponent,
	DetailsPrelevementComponent,
	ListCadavreComponent,
	AddCadavreComponent,
	UpdateCadavreComponent,
	DetailsCadavreComponent,
	ListOrganismeComponent,
	AddOrganismeComponent,
	UpdateOrganismeComponent,
	DetailsOrganismeComponent,
	ListFourgonComponent,
	AddFourgonComponent,
	UpdateFourgonComponent,
	DeatilsFourgonComponent,
	ListMorgueComponent,
	AddMorgueComponent,
	UpdateMorgueComponent,
	DetailsMorgueComponent,
	ListEnterementInhumComponent,
	AddEnterementInhumComponent,
	UpdateEnterementInhumComponent,
	DetailsEnterementInhumComponent,
	ListOrigineComponent,
	AddOrigineComponent,
	UpdateOrigineComponent,
	DetailsOrigineComponent,
	ListTransfertComponent,
	AddTransfertComponent,
	UpdateTransfertComponent,
	DetailsTransfertComponent,
	ListNouveauNeComponent,
	AddNouveauNeComponent,
	DetailsNouveauNeComponent,
	UpdateNouveauNeComponent,

	SortirObstaclesComponent,

	ListObstaclesComponent,
	
	ListTransfertComponent,
		
	ListExamenComponent,
	ListAutopsieComponent,
	ListPrelevementComponent,
  ],
  imports: [
	MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatStepperModule,
	MatCheckboxModule,
	MatRadioModule,
	PagesModule,


    TranslateModule.forChild(),
    RouterModule.forChild([
			{
				path: "",
				component: MedecinLegaleComponent,
				children: [
					{
						path: "list-deces-naturel",
						component: ListDecesNaturelComponent,
					},
					{
						path: "add-deces-naturel",
						component: AddDecesNaturelComponent,
					},
          			{
						path: "update-deces-naturel/:id",
						component: UpdateDecesNaturelComponent,
					},
					{
						path: "details-deces-naturel/:id",
						component: DetailsDecesNaturelComponent,
					},
         			{
						path: "list-obstacles",
						component: ListObstaclesComponent,
					},
					{
						path: "add-obstacles",
						component: AddObstaclesComponent,
					},
          			{
						path: "update-obstacles/:id",
						component: UpdateObstaclesComponent,
					},
					{
						path: "details-obstacles/:id",
						component: DetailsObstaclesComponent,
					},
					{
						path: "list-examen",
						component: ListExamenComponent,
					},
					{
						path: "sortir-obstacles",
						component: SortirObstaclesComponent,
					},
					{
						path: "add-examen/:id",
						component: AddExamenComponent,
					},
          			{
						path: "update-examen/:id",
						component: UpdateExamenComponent,
					},
					{
						path: "details-examen/:id",
						component: DetailsExamenComponent,
					},
					{
						path: "list-autopsie",
						component: ListAutopsieComponent,
					},
					{
						path: "add-autopsie/:id",
						component: AddAutopsieComponent,
					},
          			{
						path: "update-autopsie/:id",
						component: UpdateAutopsieComponent,
					},
					{
						path: "details-autopsie/:id",
						component: DetailsAutopsieComponent,
					},
					{
						path: "list-prelevement",
						component: ListPrelevementComponent,
					},
					{
						path: "add-prelevement/:id",
						component: AddPrelevementComponent,
					},
          			{
						path: "update-prelevement/:id",
						component: UpdatePrelevementComponent,
					},
					{
						path: "details-prelevement/:id",
						component: DetailsPrelevementComponent,
					},
					{
						path: "list-cadavre",
						component: ListCadavreComponent,
					},
					{
						path: "add-cadavre/:id",
						component: AddCadavreComponent,
					},
          			{
						path: "update-cadavre/:id",
						component: UpdateCadavreComponent,
					},
					{
						path: "details-cadavre/:id",
						component: DetailsCadavreComponent,
					},
					{
						path: "list-organisme",
						component: ListOrganismeComponent,
					},
					{
						path: "add-organisme",
						component: AddOrganismeComponent,
					},
          			{
						path: "update-organisme/:id",
						component: UpdateOrganismeComponent,
					},
					{
						path: "details-organisme/:id",
						component: DetailsOrganismeComponent,
					},
					{
						path: "list-fourgon",
						component: ListFourgonComponent,
					},
					{
						path: "add-fourgon",
						component: AddFourgonComponent,
					},
          			{
						path: "update-fourgon/:id",
						component: UpdateFourgonComponent,
					},
					{
						path: "details-fourgon/:id",
						component: DeatilsFourgonComponent,
					},
					{
						path: "list-morgue",
						component: ListMorgueComponent,
					},
					{
						path: "add-morgue",
						component: AddMorgueComponent,
					},
          			{
						path: "update-morgue/:id",
						component: UpdateMorgueComponent,
					},
					{
						path: "details-morgue/:id",
						component: DetailsMorgueComponent,
					},
					{
						path: "list-enterementInhum",
						component: ListEnterementInhumComponent,
					},
					{
						path: "add-enterementInhum/:id",
						component: AddEnterementInhumComponent,
					},
          			{
						path: "update-enterementInhum/:id",
						component: UpdateEnterementInhumComponent,
					},
					{
						path: "details-enterementInhum/:id",
						component: DetailsEnterementInhumComponent,
					},
					{
						path: "list-origine",
						component: ListOrigineComponent,
					},
					{
						path: "add-origine",
						component: AddOrigineComponent,
					},
          			{
						path: "update-origine/:id",
						component: UpdateOrigineComponent,
					},
					{
						path: "details-origine/:id",
						component: DetailsOrigineComponent,
					},
					{
						path: "list-transfert",
						component: ListTransfertComponent,
					},
					{
						path: "add-transfert/:id",
						component: AddTransfertComponent,
					},
          			{
						path: "update-transfert/:id",
						component: UpdateTransfertComponent,
					},
					{
						path: "details-transfert/:id",
						component: DetailsTransfertComponent,
					},
					{
						path: "list-nouveauNe",
						component: ListNouveauNeComponent,
					},
					{
						path: "add-nouveauNe",
						component: AddNouveauNeComponent,
					},
          			{
						path: "update-nouveauNe/:id",
						component: UpdateNouveauNeComponent,
					},
					{
						path: "details-nouveauNe/:id",
						component: DetailsNouveauNeComponent,
					},
          ]
        }
      ])
	],
	entryComponents:[
		PopupComponent,
		PopupDecesComponent
	]
	// bootstrap: [
	// 	ListExamenComponent,
	// 	ListAutopsieComponent,
	// 	ListPrelevementComponent,
	// ],


})
export class MedecinLegaleModule { }
