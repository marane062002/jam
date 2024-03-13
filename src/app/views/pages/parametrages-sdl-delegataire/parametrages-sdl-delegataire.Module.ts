import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListStructureDelegataireComponent } from './list-structure-delegataire/list-structure-delegataire.component';
import { AddStructureDelegataireComponent } from './add-structure-delegataire/add-structure-delegataire.component';
import { UpdStructureDelegataireComponent } from './upd-structure-delegataire/upd-structure-delegataire.component';

import { ListStructureSdlComponent } from './list-structure-sdl/list-structure-sdl.component';
import { AddStructureSdlComponent } from './add-structure-sdl/add-structure-sdl.component';
import { UpdStructureSdlComponent } from './upd-structure-sdl/upd-structure-sdl.component';

import { ParametragesSdlDelegataireComponent } from './parametrages-sdl-delegataire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PagesModule } from '../pages.module';
import { MaterialsModule } from '../utils/materials/materials.module';
// TypeIndicateurDelegataire
import { ListTypeIndicateurDelegataireComponent } from './list-type-indicateur-delegataire/list-type-indicateur-delegataire.component';
import { AddTypeIndicateurDelegataireComponent } from './add-type-indicateur-delegataire/add-type-indicateur-delegataire.component';
import { UpdTypeIndicateurDelegataireComponent } from './upd-type-indicateur-delegataire/upd-type-indicateur-delegataire.component';
// TypeIndicateurSdl
import { ListTypeIndicateurSdlComponent } from './list-type-indicateur-sdl/list-type-indicateur-sdl.component';
import { AddTypeIndicateurSdlComponent } from './add-type-indicateur-sdl/add-type-indicateur-sdl.component';
import { UpdTypeIndicateurSdlComponent } from './upd-type-indicateur-sdl/upd-type-indicateur-sdl.component';
import {SdlRoutingResolveService} from '../delegataire/service/sdl/sdl-routing-resolve.service';
import {StructureDelegataireRoutingResolveService} from './service/structureDelegataire/structure-delegataire-routing-resolve.service';
import {StructureSdlRoutingResolveService} from './service/structureSdl/structure-sdl-routing-resolve.service';
import {TypeIndicDelegataireRoutingResolveService} from './service/typeIndicDelegataire/type-indic-delegataire-routing-resolve.service';
import {TypeIndicSdlRoutingResolveService} from './service/typeIndicSdl/type-indic-sdl-routing-resolve.service';

@NgModule({
	declarations: [
		ParametragesSdlDelegataireComponent,

		ListStructureDelegataireComponent,
		AddStructureDelegataireComponent,
		UpdStructureDelegataireComponent,

		ListStructureSdlComponent,
		AddStructureSdlComponent,
		UpdStructureSdlComponent,

		ListTypeIndicateurDelegataireComponent,
		AddTypeIndicateurDelegataireComponent,
		UpdTypeIndicateurDelegataireComponent,

		ListTypeIndicateurSdlComponent,
		AddTypeIndicateurSdlComponent,
		UpdTypeIndicateurSdlComponent,
	],

	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		MatTabsModule,
		RouterModule.forChild([
			{
				path: "",
				component: ParametragesSdlDelegataireComponent,
				children: [
					{
						path: 'list-structure-delegataire',
						component: ListStructureDelegataireComponent,
					},
					{
						path: 'add-structure-delegataire',
						component: AddStructureDelegataireComponent,
					},
					{
						path: 'upd-structure-delegataire/:id',
						component: UpdStructureDelegataireComponent,
						resolve: {
							structureDelegataire: StructureDelegataireRoutingResolveService,
						}
					},
					{
						path: 'list-structure-sdl',
						component: ListStructureSdlComponent,
					},
					{
						path: 'add-structure-sdl',
						component: AddStructureSdlComponent,
					},
					{
						path: 'upd-structure-sdl/:id',
						component: UpdStructureSdlComponent,
						resolve: {
							structureSdl: StructureSdlRoutingResolveService,
						}
					},
					{
						path: 'list-type-indicateur-delegataire',
						component: ListTypeIndicateurDelegataireComponent,
					},
					{
						path: 'add-type-indicateur-delegataire',
						component: AddTypeIndicateurDelegataireComponent,
					},
					{
						path: 'upd-type-indicateur-delegataire/:id',
						component: UpdTypeIndicateurDelegataireComponent,
						resolve: {
							typeIndicDelegataire: TypeIndicDelegataireRoutingResolveService,
						}
					},
					{
						path: 'list-type-indicateur-sdl',
						component: ListTypeIndicateurSdlComponent,
					},
					{
						path: 'add-type-indicateur-sdl',
						component: AddTypeIndicateurSdlComponent,
					},
					{
						path: 'upd-type-indicateur-sdl/:id',
						component: UpdTypeIndicateurSdlComponent,
						resolve: {
							typeIndicSdl: TypeIndicSdlRoutingResolveService,
						}
					},
				],
			},
		]),
	],
})
export class ParametragesSdlDelegataireModule {}
