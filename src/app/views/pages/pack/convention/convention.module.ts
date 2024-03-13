import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { ConventionComponent } from './convention.component';
import { AddConventionComponent } from './add-convention/add-convention.component';
import { UpdConventionComponent } from './upd-convention/upd-convention.component';
import { DetailleConventionComponent } from './detaille-convention/detaille-convention.component';
import { ListConventionComponent } from './list-convention/list-convention.component';
import { TabAComponent } from './tab-a/tab-a.component';
import { UpdTableComponent } from './upd-table/upd-table.component';
import { DetailleTableComponent } from './detaille-table/detaille-table.component';
import { AddTableComponent } from './add-table/add-table.component';
import { PagesModule } from '../../pages.module';
import { MaterialsModule } from '../../utils/materials/materials.module';
import { AutorisationComponent } from './detaille-convention/autorisation/autorisation.component';
import { ConflitComponent } from './detaille-convention/conflit/conflit.component';
import { PartiePreneurListComponent } from './partie-preneur-list/partie-preneur-list.component';
import { NewPartiePreneurComponent } from './new-partie-preneur/new-partie-preneur.component';
import { DetailPartiePreneurComponent } from './detail-partie-preneur/detail-partie-preneur.component';
import { AddAutorisationComponent } from './detaille-convention/autorisation/add-autorisation/add-autorisation.component';
import { AddConflitComponent } from './detaille-convention/conflit/add-conflit/add-conflit.component';
import { ButsComponent } from './detaille-convention/buts/buts.component';
import { AddButComponent } from './detaille-convention/buts/add-but/add-but.component';
import { ContributionListComponent } from './detaille-convention/contribution-list/contribution-list.component';
import { ContributionNewComponent } from './detaille-convention/contribution-list/contribution-new/contribution-new.component';
import { ListAvanceComponent } from './detaille-convention/list-avance/list-avance.component';
import { CouteSuiviComponent } from './detaille-convention/coute-suivi/coute-suivi.component';
import { CouteSuiviNewComponent } from './detaille-convention/coute-suivi/coute-suivi-new/coute-suivi-new.component';
import { AvanceNewComponent } from './detaille-convention/list-avance/avance-new/avance-new.component';
import { AuditComponent } from './detaille-convention/audit/audit.component';
import { NewAuditComponent } from './detaille-convention/audit/new-audit/new-audit.component';
import { EngagementComponent } from './detaille-convention/engagement/engagement.component';
import { NewEngagementComponent } from './detaille-convention/engagement/new-engagement/new-engagement.component';
import { SuiviContributionComponent } from './detaille-convention/suivi-contribution/suivi-contribution.component';
import { NewSuiviContributionComponent } from './detaille-convention/suivi-contribution/new-suivi-contribution/new-suivi-contribution.component';
import { ExecutionProjetComponent } from './detaille-convention/execution-projet/execution-projet.component';
import { NewExecutionProjetComponent } from './detaille-convention/execution-projet/new-execution-projet/new-execution-projet.component';
import { ConsistanceConventionComponent } from './detaille-convention/consistance-convention/consistance-convention.component';
import { NewConsistanceConventionComponent } from './detaille-convention/consistance-convention/new-consistance-convention/new-consistance-convention.component';
import { StatistiqueConventionComponent } from './statistique-convention/statistique-convention.component';




@NgModule({
  declarations: [
	ConventionComponent,
	AddConventionComponent,
	UpdConventionComponent,
	DetailleConventionComponent,
	ListConventionComponent,
	TabAComponent,
	UpdTableComponent,
	DetailleTableComponent,
	AddTableComponent,
	AutorisationComponent,
	ConflitComponent,
	PartiePreneurListComponent,
	NewPartiePreneurComponent,
	DetailPartiePreneurComponent,
	AddAutorisationComponent,
	AddConflitComponent,
	ButsComponent,
	AddButComponent,
	ContributionListComponent,
	ContributionNewComponent,
	ListAvanceComponent,
	CouteSuiviComponent,
	CouteSuiviNewComponent,
	AuditComponent,
	NewAuditComponent,
	AvanceNewComponent,
	EngagementComponent,
	NewEngagementComponent,
	SuiviContributionComponent,
	NewSuiviContributionComponent,
	ExecutionProjetComponent,
	NewExecutionProjetComponent,
	ConsistanceConventionComponent,
	StatistiqueConventionComponent,
	NewConsistanceConventionComponent

  ],
  entryComponents: [
	AddAutorisationComponent,
	AddConflitComponent,
	AddButComponent,
	ContributionNewComponent,
	CouteSuiviNewComponent,
	NewAuditComponent,
	AvanceNewComponent,
	NewEngagementComponent,
	NewSuiviContributionComponent,
	NewExecutionProjetComponent,
	NewConsistanceConventionComponent

  ],
  imports: [
	PagesModule,
	  CommonModule,
	  FormsModule,
	  ReactiveFormsModule,
	  TranslateModule.forChild(),
	  MaterialsModule,
	  RouterModule.forChild([
		{
		  path: "",
		  component: ConventionComponent,
		  children: [
			{
				path: "statistique-convention",
				component: StatistiqueConventionComponent
			},
			{
				path: "new-convention",
				component: AddConventionComponent,
			},
			{
				path: "listconvention",
				component: ListConventionComponent,
			},
			{
				path: "detailleConvention",
				component: DetailleConventionComponent,
				children: [
					{
						path: "Autorisation",
						component: AutorisationComponent,
					},
					{
						path: "Conflit",
						component: ConflitComponent,
					},
					{
						path: "Buts",
						component: ButsComponent,
					},
					{
						path: "Contribution",
						component: ContributionListComponent,
					},
					{
						path: "avance",
						component: ListAvanceComponent,
					},
					{
						path: "Suivi",
						component: CouteSuiviComponent,
					},
					{
						path: "audit",
						component: AuditComponent,
					},
					{
						path: "engagement",
						component: EngagementComponent,
					},
					{
						path: "suiviContrubition",
						component: SuiviContributionComponent,
					},
					{
						path: "executionProjet",
						component: ExecutionProjetComponent,
					},
					{
						path: "consistanceConvention",
						component: ConsistanceConventionComponent,
					}
					
				]
			},
			{
				path: "updt-convention",
				component: UpdConventionComponent,
			},
			
			{
				path: "tabA-convention",
				component: TabAComponent,
			},
			{
				path: "add-tab-convention",
				component: AddTableComponent,
			},
			{
				path: "upd-tab-convention",
				component: UpdTableComponent,
			},
			{
				path: "detaille-tab-convention",
				component: DetailleTableComponent,
			},
			{
				path: "detaille-tab-convention",
				component: DetailleTableComponent,
			},
			{
				path: "PartiePreneurList",
				component: PartiePreneurListComponent,
			},
			{
				path: "new-PartiePreneur",
				component: NewPartiePreneurComponent,
			},
			{
				path: "detaille-PartiePreneur",
				component: DetailPartiePreneurComponent,
			}
		  ]


		}

	  ]),
  ]
})
export class ConventionModule { }
