import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategorieProduit } from '../../../../../core/_base/layout/models/categorie-produit';
import { TypeProduit } from '../../../../../core/_base/layout/models/type-produit';
import { CatService } from '../../Service/cat-service.service';
import { TypeServiceService } from '../../Service/type-service.service';

@Component({
	selector: 'kt-dialog-edit-type',
	templateUrl: './dialog-edit-type.component.html',
	styleUrls: ['./dialog-edit-type.component.scss']
})
export class DialogEditTypeComponent implements OnInit {
	loading: boolean = false
	type: TypeProduit
	Cat: CategorieProduit
	categori: CategorieProduit[]

	typeform = new FormGroup({
		numArticleProduit: new FormControl('', [Validators.required]),
		nomArticleProduit: new FormControl('', [Validators.required]),

		categorieProduit: new FormGroup({
			id: new FormControl('', Validators.required),
		}),

	});
	isSelected: boolean = false

	constructor(
		public dialogRef: MatDialogRef<DialogEditTypeComponent>,
		private router: Router,
		private catService: CatService,
		private typeService: TypeServiceService, @Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {

		this.catService.query().subscribe((res: any) => {
			console.log("les categorie==========>", res.body);
			this.categori = res.body
			let cat = this.typeform.get("categorieProduit")
			this.filteredBanks = cat.get("id").valueChanges.pipe(
				startWith(""),
				map((value) => this._filter(value || ""))
			);

		})
		if (this.data.id) {

			this.typeService.getById(this.data.id).subscribe((res: any) => {

				this.typeform.patchValue({ ...res.body })
				this.Cat = new CategorieProduit(res.body.categorieProduit.refCategori, res.body.categorieProduit.nomCategori, res.body.categorieProduit.id);
				console.log('Cat', this.Cat);

			})
		}


	}

	showButton: boolean = false;

	private _filter(value: string): CategorieProduit[] {
		const filterValue = value.toLowerCase();
		let list: CategorieProduit[] = this.categori.filter(
			(option) =>
				option.nomCategori.toLowerCase().indexOf(filterValue) > -1
		);
		this.showButton = list.length === 0;
		return list;
	}
	resetForm() {
		this.loading = false;
		this.typeform.reset();
		this.dialogRef.close();
	}
	public filteredBanks: Observable<CategorieProduit[]> = new Observable<CategorieProduit[]>();

	onSelectionChange(event: any) {
		console.log("event.target cat", event.option.value);
		if (event.option.value) {
			let selectedTypeV = this.categori.filter(
				(item) => item.id == event.option.value
			);
			this.Cat = selectedTypeV[0];

			console.log("cat=====>", this.Cat);

		}
	}
	onSubmit() {
		let type = {
			id: this.data.id,
			numArticleProduit: this.typeform.get("numArticleProduit").value,
			nomArticleProduit: this.typeform.get("nomArticleProduit").value,
			categorieProduit: this.Cat

		}


		this.typeService.update(type)
			.subscribe(data => {
				console.log('111111', data)



			}
				, error => {
					console.log(error)
				});

		this.dialogRef.close();
		location.reload()

	}

	getvehicule(id: number) {
		return this.categori.find(cat => cat.id === id).nomCategori;
	}


}
