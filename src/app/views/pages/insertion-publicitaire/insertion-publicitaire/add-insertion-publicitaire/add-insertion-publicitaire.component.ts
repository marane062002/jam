import {
	Component,
	OnInit,
	EventEmitter,
	Output,
	ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { InsertPubService } from "../../../utils/insert-pub.service";
import { MatSelectChange, MatSelect } from "@angular/material";
import { OrganisationService } from "../../../organisation/organisation.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import * as $ from "jquery";

@Component({
	selector: "kt-add-insertion-publicitaire",
	templateUrl: "./add-insertion-publicitaire.component.html",
	styleUrls: ["./add-insertion-publicitaire.component.scss"],
})
export class AddInsertionPublicitaireComponent implements OnInit {
	// ==================================================
	//
	// ==================================================
	selectedList: number;
	divisions: any;
	services: any;
	loading = false;
	medias: any;
	statuts: any;
	supports: any;
	selectedValue: String;
	submitted = false;
	// upload file attributes
	uploadFileForm: FormGroup;
	upform: any;
	public file;
	public uploadFiles: Array<File>;
	addForm: FormGroup;
	addFileForm: FormGroup;
	//today's date
	todayDate: Date = new Date();
	// =============================================
	// date debut change
	// =============================================
	dateDebutchange() {
		this.addForm.controls["datePublication"].setValue(null);
	}
	// ==================================================
	//
	// ==================================================
	constructor(
		private service: InsertPubService,
		private service1: OrganisationService,
		private router: Router,
		private formBuilder: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService
	) {}
	// ==================================================
	//
	// ==================================================
	ngOnInit() {
		this.addForm = this.formBuilder.group({
			id: [],
			numEdition: ["", Validators.required],
			dateEdition: ["", Validators.required],
			datePublication: ["", Validators.required],
			objet: ["", Validators.required],
			idDivision: ["", Validators.required],
			idService: ["", Validators.required],
			factureInsertionPublicitaire: this.formBuilder.group({
				id: [],
				numeroFacture: ["", Validators.required],
				montantHT: ["", Validators.required],
				montantTtc: ["", Validators.required],
				statutFacturel: this.formBuilder.group({
					id: [],
					libelle: [""],
				}),
			}),
			supportPublicitaire: [, Validators.required],
			media: [, Validators.required],
		});

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		// Check file methode
		this.fileCheck();

		//Charger les types des courriers
		//this.getMedias();

		// get all statuts
		this.getStatuts();

		// get all supports media
		this.getSupports();

		// set current date
		this.addForm.controls["dateEdition"].setValue(this.currentDate());

		// get all devision
		this.service1.getRessource("/divisions/index").subscribe((data) => {
			this.divisions = data;
			//console.log(data);
		});
	}
	// ==================================================
	//
	// ==================================================
	onSubmit() {
		//console.log("Validation du fourmulaire :" + this.findInvalidControls());
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;
		this.addPublicitaire();
	}
	// ==================================================
	//
	// ==================================================
	currentDate() {
		const currentDate = new Date();
		return currentDate.toLocaleDateString("en-GB");
	}
	// ==================================================
	//
	// ==================================================
	addPublicitaire() {
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/insertionPublicitaires/new", this.addForm.value)
			.subscribe(
				(data) => {
					this.router.navigate([
						"insertion-publicitaire/list-insertion-publicitaire",
					]);

					// upload files to alfresco GED
					if (this.uploadFiles != null) {
						this.service
							.updloadFilePublicitaire(this.uploadFiles, data)
							.subscribe(
								(res) => console.log(res),
								(err) => console.log(err)
							);
					}
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
						)
					);
				},
				(error) => {
					alert(error);
				}
			);
	}
	// ==================================================
	//
	// ==================================================
	private getMediasBySupport(support: any) {
		this.service
			.getObjectById("/MediaPublicitaires/support/", support.id)
			.subscribe(
				(data) => {
					this.medias = data;
				},
				(err) => {
					console.log(err);
				}
			);
	}
	// ==================================================
	//
	// ==================================================
	private getStatuts() {
		this.service.getAllObject("/StatutFacturels/index").subscribe(
			(data) => {
				this.statuts = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ==================================================
	//
	// ==================================================
	private getSupports() {
		this.service.getAllObject("/SupportPublicitaires/index").subscribe(
			(data) => {
				this.supports = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ==================================================
	// test save data
	// ==================================================
	public save(data: NgForm) {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			console.log(data);
		}
	}
	// ==================================================
	//
	// ==================================================
	// back button
	backList() {
		this.router.navigate([
			"insertion-publicitaire/list-insertion-publicitaire",
		]);
	}
	// ==================================================
	//
	// ==================================================
	// Add media
	addMedia() {
		this.router.navigate(["insertion-media/add-insertion-media"]);
	}
	// ==================================================
	//
	// ==================================================
	// Initialiser le formulaire
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// ==================================================
	//
	// ==================================================
	// getter
	public getObjet() {
		return this.addForm.get("objet");
	}
	// ==================================================
	//
	// ==================================================
	// upload files
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			//console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm.patchValue(this.uploadFiles);
			//console.log("OK get");
		}
	}
	// ==================================================
	//
	// ==================================================
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<
		MatSelectChange
	>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// ==================================================
	// Select changed
	// ==================================================
	selectionChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		this.selectedList = event.value;
		this.addForm.get("idService").reset();
		if (this.selectedList != 0) {
			this.getAllServiceByDivision(this.selectedList);
		} else {
			this.services = null;
		}
	}
	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};

	// ==================================================
	// Support changed
	// ==================================================
	supportChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		this.selectedList = event.value;
		this.addForm.get("media").reset();
		if (this.selectedList != null) {
			this.getMediasBySupport(this.selectedList);
		} else {
			this.services = null;
		}
	}
	// ============================================
	// Liste des services
	// ============================================
	private getAllServiceByDivision(id: number) {
		this.service1.getRessourceById(id, "/services/divisions/").subscribe(
			(data) => {
				this.services = data;
				if (this.services != "") {
					this.addForm.get("idService").enable();
				} else {
					this.addForm.get("idService").disable();
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================
	// Checking control validation
	// ============================================
	/**
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.addForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
	// ============================================
	// check file size
	// ============================================
	fileCheck() {
		$(function () {
			// We can attach the `fileselect` event to all file inputs on the page
			$(document).on("change", ":file", function () {
				var input = $(this),
					numFiles = input.get(0).files
						? input.get(0).files.length
						: 1,
					label =  (new String(input.val())).replace(/\\/g, "/").replace(/.*\//, "");
				input.trigger("fileselect", [numFiles, label]);
			});

			// We can watch for our custom `fileselect` event like this
			$(document).ready(function () {
				$(":file").on("fileselect", function (event, numFiles, label) {
					var input = $(this).parents(".input-group").find(":text"),
						log = numFiles > 1 ? numFiles + " وثائق مختارة" : label;

					if (input.length) {
						input.val(log);
					} else {
						if (log) alert(log);
					}
				});
			});
		});
	}
}
