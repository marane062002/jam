import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RhModule } from "../rh.module";

//*************************** */
import { AttestationComponent } from "./attestation.component";
import { AttestationIndexComponent } from "./attestation-index/attestation-index.component";
import { AttestationNewComponent } from "./attestation-new/attestation-new.component";
import { AttestationShowComponent } from "./attestation-show/attestation-show.component";
import { AttestationValidateComponent } from "./attestation-validate/attestation-validate.component";
import { PrintPageComponent } from "./print-page/print-page.component";

@NgModule({
	declarations: [
		AttestationComponent,
		AttestationIndexComponent,
		AttestationNewComponent,
		AttestationShowComponent,
		AttestationValidateComponent,
		PrintPageComponent,
	],
	imports: [
		RhModule,

		//*************************************
		RouterModule.forChild([
			{
				path: "",
				component: AttestationComponent,
				children: [
					{
						path: "attestation-index",
						component: AttestationIndexComponent,
					},
					{
						path: "attestation-new",
						component: AttestationNewComponent,
					},
					{
						path: "attestation-show",
						component: AttestationShowComponent,
					},
					{
						path: "attestation-validate",
						component: AttestationValidateComponent,
					},
					{
						path: "print-page",
						component: PrintPageComponent,
					},
				],
			},
		]),
	],
})
export class AttestationModule {}
