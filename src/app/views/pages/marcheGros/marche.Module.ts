import { ListTypeComponent } from './list-type/list-type.component';
import { DialogAddCategorieComponent } from './list-categorie-produit/dialog-add-categorie/dialog-add-categorie.component';
import { DialogComponent } from './list-type-hangar/dialog/dialog.component';
// import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { ListTypeEmbalageComponent } from "./list-type-embalage/list-type-embalage.component";
import { AddTypeEmbalageComponent } from "./add-type-embalage/add-type-embalage.component";
import { ModificationTypeEmbalageComponent } from "./modification-type-embalage/modification-type-embalage.component";
// import { ModificationTypeTarifictionComponent } from "./modification-type-tarifiction/modification-type-tarifiction.component";
import { DetailTypeEmbalageComponent } from "./detail-type-embalage/detail-type-embalage.component";
import { DetailTypeHangarComponent } from "./detail-type-hangar/detail-type-hangar.component";
import { DetailTypeProduitComponent } from "./detail-type-produit/detail-type-produit.component";
// import { DetailTypeTarifictionComponent } from "./detail-type-tarifiction/detail-type-tarifiction.component";
import { MarcheComponent } from "./marche.component";
import { ModificationTypeProduitComponent } from "./modification-type-produit/modification-type-produit.component";
import { ModificationTypeHangarComponent } from "./modification-type-hangar/modification-type-hangar.component";
import { ListTypeHangarComponent } from "./list-type-hangar/list-type-hangar.component";
import { ListTypeTarifictionComponent } from "./list-type-tarifiction/list-type-tarifiction.component";
import { ListTypeProduitComponent } from "./list-type-produit/list-type-produit.component";
import { AddTypeHangarComponent } from "./add-type-hangar/add-type-hangar.component";
// import { AddTypeTarifictionComponent } from "./add-type-tarifiction/add-type-tarifiction.component";
import { AddTypeProduitComponent } from "./add-type-produit/add-type-produit.component";
import { DialogEditComponent } from './list-type-hangar/dialog-edit/dialog-edit.component';
import { ListCategorieProduitComponent } from './list-categorie-produit/list-categorie-produit.component';
import { DialogAddTypeComponent } from './list-type/dialog-add-type/dialog-add-type.component';
import { DialogEditCategorieComponent } from './list-categorie-produit/dialog-edit-categorie/dialog-edit-categorie.component';
import { DialogEditTypeComponent } from './list-type/dialog-edit-type/dialog-edit-type.component';
import { ProduitResolveServiceService } from './Service/produit-resolve-service.service';
import { EmballageResolveServiceService } from './Service/emballage-resolve-service.service';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
	declarations: [
		DialogEditCategorieComponent,
		DialogEditTypeComponent,
		DialogAddCategorieComponent,
		ListTypeTarifictionComponent,
		ListTypeProduitComponent,
		// AddTypeTarifictionComponent,
		AddTypeProduitComponent,
		MarcheComponent,
		DialogComponent ,
		ListCategorieProduitComponent,
		DialogEditComponent ,
		// DetailTypeTarifictionComponent,
		DetailTypeProduitComponent,
		DetailTypeHangarComponent,
		DetailTypeEmbalageComponent,
		DialogAddTypeComponent,
		// ModificationTypeTarifictionComponent,
		ModificationTypeProduitComponent,
		ModificationTypeHangarComponent,
		ModificationTypeEmbalageComponent,
		ListTypeEmbalageComponent,
		ListTypeHangarComponent,
		AddTypeHangarComponent,
		AddTypeEmbalageComponent,
		ListTypeComponent,
		AddTypeComponent,
		// AddCategorieComponent,
	],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		MatPaginatorModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: MarcheComponent,
				children: [

					// {
					// 	path: "detail-type-tarifiction",
					// 	component: DetailTypeTarifictionComponent,
					// },
					{
						path: "detail-type-embalage",
						component: DetailTypeEmbalageComponent,
					},
					{
						path: "detail-type-hangar",
						component: DetailTypeHangarComponent,
					},
					{
						path: "detail-type-produit/:id",
						component: DetailTypeProduitComponent,
						resolve: {
							detailProduit: ProduitResolveServiceService,
						  },
					},

					{
						path: "list-type-embalage",
						component: ListTypeEmbalageComponent,
						data: {
							defaultSort: "id,desc",
						  },
					},

					{
						path: "list-type-hangar",
						component: ListTypeHangarComponent,
						data: {
							defaultSort: "id,desc",
						  },
					},
					// {
					// 	path: "list-type-tarifiction",
					// 	component: ListTypeTarifictionComponent,
					// 	data: {
					// 		defaultSort: "id,desc",
					// 	  },
					// },
					{
						path: "list-type-produit",
						component: ListTypeProduitComponent,
						data: {
							defaultSort: "id,desc",
						  },
					},
					{
						path: "list-categorie-produit",
						component: ListCategorieProduitComponent,
						data: {
							defaultSort: "id,desc",
						  },
						  children: [
							{
								path: "dialog-edit-categorie/:id",
								component: DialogEditCategorieComponent,
							},
							{
								path: "dialog-add-categorie",
								component: DialogAddCategorieComponent,
							},
						  ]

					},

					// {
					// 	path: "modification-type-tarifiction/:id",
					// 	component: ModificationTypeTarifictionComponent,
					// },
					{
						path: "modification-type-embalage/:id",
						component: ModificationTypeEmbalageComponent,
						resolve: {
							emballage: EmballageResolveServiceService,
						  },
					},
					{
						path: "modification-type-hangar/:id",
						component: ModificationTypeHangarComponent,
					},
					{
						path: "modification-type-produit/:id",
						component: ModificationTypeProduitComponent,
						resolve: {
							produit: ProduitResolveServiceService,
						  },

					},

					{
						path: "add-type-embalage",
						component: AddTypeEmbalageComponent,
					},
					{
						path: "add-type-hangar",
						component: AddTypeHangarComponent,
					},
					// {
					// 	path: "add-type-tarifiction",
					// 	component: AddTypeTarifictionComponent,
					// },
					{
						path: "add-type-produit",
						component: AddTypeProduitComponent,
					},
					{
						path: "add-type",
						component: AddTypeComponent,
					},
					// {
					// 	path: "add-categorie",
					// 	component: AddCategorieComponent,
					// },
					{
						path: "list-type",
						component: ListTypeComponent,
						data: {
							defaultSort: "id,desc",
						  },
						  children: [
							{
								path: "dialog-edit-type/:id",
								component: DialogEditTypeComponent,
							},
							{
								path: "dialog-add-type",
								component: DialogAddTypeComponent,
							},
						  ]
					},

				],
			},
		]),
	],
	bootstrap: [DialogComponent, DialogEditComponent, DialogAddCategorieComponent, DialogAddTypeComponent,DialogEditTypeComponent]
})
export class MarcheModule { }
