import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import { TranslateService } from '@ngx-translate/core';
import { ExcelAssociationService } from '../../../utils/excel-association.service';

@Component({
  selector: 'kt-export-excel-dialog',
  templateUrl: './export-excel-dialog.component.html',
  styleUrls: ['./export-excel-dialog.component.scss']
})
export class ExportExcelDialogComponent implements OnInit {
	selectedValueCherche: string[] = [""];
  searchOptions
  searchOptionsValues

  columns: any[]=[];
	footerData: any[][] = [];
    constructor(		private programeServie: ProgrammeService,		private translate: TranslateService,
    private excelService: ExcelAssociationService,@Inject(MAT_DIALOG_DATA) public formData: any) { }

  ngOnInit() {
   
            //   "", "", 
            //   "", "", 
            //   "", ""]
    this.searchOptions = [
      { value: 'ORIENTATIONS_STRATEGIQUES', label: 'PAGES.PROGRAMME.ORIENTATIONS_STRATEGIQUES' },
      { value: 'CODE_ORIENTATION', label: 'PAGES.PROGRAMME.CODE_ORIENTATION' },
      { value: 'AXE', label: 'PAGES.PROGRAMME.AXE' },
      { value: 'CODE_AXE', label: 'PAGES.PROGRAMME.CODE_AXE' },
      { value: 'OBJECTIFS_STRATEGIQUES', label: 'PAGES.PROGRAMME.OBJECTIFS_STRATEGIQUES' },
      { value: 'OBJECTIFS_OPERATIONNELS', label: 'PAGES.PROGRAMME.OBJECTIFS_OPERATIONNELS' },
      { value: 'NUMERO_PROJET', label: 'PAGES.PROGRAMME.NUMERO_PROJET' },
      { value: 'CODE_PROJET', label: 'PAGES.PROGRAMME.CODE_PROJET' },
      { value: 'PROJET', label: 'PAGES.PROGRAMME.PROJET' },
      { value: 'CONVENTION', label: 'PAGES.PROGRAMME.CONVENTION' },
      { value: 'NIVEAU', label: 'PAGES.PROGRAMME.NIVEAU' },
      { value: 'NATURE_PROJET', label: 'PAGES.PROGRAMME.NATURE_PROJET' },
      { value: 'CHEF_PROJET', label: 'PAGES.PROGRAMME.CHEF_PROJET' },
      { value: 'LIEU', label: 'PAGES.PROGRAMME.LIEU' },
      { value: 'MAITRE_OUVRAGE', label: 'PAGES.PROGRAMME.MAITRE_OUVRAGE' },
      { value: 'MAITRE_OUVRAGE_DELEGUE', label: 'PAGES.PROGRAMME.MAITRE_OUVRAGE_DELEGUE' },
      { value: 'ANNEE', label: 'PAGES.PROGRAMME.ANNEE' },
      { value: 'ETAT_AVANCEMENT_PROJET', label: 'PAGES.PROGRAMME.ETAT_AVANCEMENT_PROJET' },
      { value: 'DELAI', label: 'PAGES.PROGRAMME.DELAI' },
      { value: 'PHASE', label: 'PAGES.PROGRAMME.PHASE' },
      { value: 'COUT', label: 'PAGES.PROGRAMME.COUT' },
      { value: 'CONTRIBUTION_COMUNE', label: 'PAGES.PROGRAMME.CONTRIBUTION_COMUNE' },
      { value: 'CONTRIBUTION_COMUNE_PREMIERE_ANNE', label: 'PAGES.PROGRAMME.CONTRIBUTION_COMUNE_PREMIERE_ANNE' },
      { value: 'TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE', label: 'PAGES.PROGRAMME.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE' },
      { value: 'CONTRIBUTION_COMUNE_DEUXIEME_ANNE', label: 'PAGES.PROGRAMME.CONTRIBUTION_COMUNE_DEUXIEME_ANNE' },
      { value: 'TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE', label: 'PAGES.PROGRAMME.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE' },
      { value: 'CONTRIBUTION_COMUNE_TROISIEME_ANNE', label: 'PAGES.PROGRAMME.CONTRIBUTION_COMUNE_TROISIEME_ANNE' },
      { value: 'TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE', label: 'PAGES.PROGRAMME.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE' },
      { value: 'CONTRIBUTION_COMMUNE_TROIS_ANNEE', label: 'PAGES.PROGRAMME.CONTRIBUTION_COMMUNE_TROIS_ANNEE' },
      { value: 'CONTRIBUTION_PARTENAIRE_TROIS_ANNEE', label: 'PAGES.PROGRAMME.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE' },
      { value: 'CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE', label: 'PAGES.PROGRAMME.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE' },
      { value: 'CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE', label: 'PAGES.PROGRAMME.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE' },
      { value: 'MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE', label: 'PAGES.PROGRAMME.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE' },
      { value: 'MONTANT_INDISPO_COMMUNE', label: 'PAGES.PROGRAMME.MONTANT_INDISPO_COMMUNE' },

    ];
    this.searchOptionsValues=this.searchOptions.map((a)=>a.value)
    
  }
  doSomething(event: any, select: MatSelect) {
		this.selectedValueCherche = event;
    
	}
  onSubmit(){
    this.selectedValueCherche
    
  }


  exportTable() {
    
		if (this.formData.form.value.chefProjet.length == 0) {
			this.formData.form.value.chefProjet = "";
		}

		if (this.formData.listChefProjet.length != 0) {
			this.formData.form.value.chefProjet = `(${this.formData.listChefProjet.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.axe.length == 0) {
			this.formData.form.value.axe = "";
		}
		if (this.formData.listAxe.length != 0) {
			this.formData.form.value.axe = `(${this.formData.listAxe.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.lieu.length == 0) {
			this.formData.form.value.lieu = "";
		}
		if (this.formData.listLieu.length != 0) {
			this.formData.form.value.lieu = `(${this.formData.listLieu.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.codeOrientation.length == 0) {
			this.formData.form.value.codeOrientation = "";
		}
		if (this.formData.listCodeOrientation.length != 0) {
			this.formData.form.value.codeOrientation = `(${this.formData.listCodeOrientation.map((item) => `'${item}'`).join(", ")})`;
		}

		if (this.formData.form.value.maitreOuvrage.length == 0) {
			this.formData.form.value.maitreOuvrage = "";
		}
		if (this.formData.listMaitreOuvrage.length != 0) {
			this.formData.form.value.maitreOuvrage = `(${this.formData.listMaitreOuvrage.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.maitreOuvrageDelegue.length == 0) {
			this.formData.form.value.maitreOuvrageDelegue = "";
		}
		if (this.formData.listMaitreOuvrageDelegue.length != 0) {
			this.formData.form.value.maitreOuvrageDelegue = `(${this.formData.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.niveau.length == 0) {
			this.formData.form.value.niveau = "";
		}
		if (this.formData.listNiveau.length != 0) {
			this.formData.form.value.niveau = `(${this.formData.listNiveau.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.orientationStrategique.length == 0) {
			this.formData.form.value.orientationStrategique = "";
		}
		if (this.formData.listOrientationStrategique.length != 0) {
			this.formData.form.value.orientationStrategique = `(${this.formData.listOrientationStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.objectifOperationnel.length == 0) {
			this.formData.form.value.objectifOperationnel = "";
		}
		if (this.formData.listObjectifOperationnel.length != 0) {
			this.formData.form.value.objectifOperationnel = `(${this.formData.listObjectifOperationnel.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.objectifStrategique.length == 0) {
			this.formData.form.value.objectifStrategique = "";
		}
		if (this.formData.listObjectifStrategique.length != 0) {
			this.formData.form.value.objectifStrategique = `(${this.formData.listObjectifStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.etatAvancement.length == 0) {
			this.formData.form.value.etatAvancement = "";
		}
		if (this.formData.listEtatsAvancement.length != 0) {
			this.formData.form.value.etatAvancement = `(${this.formData.listEtatsAvancement.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formData.form.value.convention != undefined) {
			if (this.formData.form.value.convention.length == 0) {
				this.formData.form.value.convention = [];
			}
		} else {
			this.formData.form.value.convention = [];

		}
		if (this.formData.listConventions != undefined) {
			if (this.formData.listConventions.length != 0) {
				this.formData.form.value.convention = this.formData.listConventions;
			}
		}

		if (this.formData.form.value.nature != undefined) {
			if (this.formData.form.value.nature.length == 0) {

				this.formData.form.value.nature = [];
			}
		}
		if (this.formData.listNature != undefined) {
			if (this.formData.listNature.length != 0) {

				this.formData.form.value.nature = this.formData.listNature;
			}
		}
		// if (localStorage.getItem("language") == "fr") {

      const formValue = this.formData.form.value;
      const selectedColumns = this.selectedValueCherche;
			
      this.programeServie.research(0, 500, formValue).subscribe(
        (res: any) => {
            console.log(res);
            const data: any[] = res.content;
            const json = data.map(item => new excelDateProgramme(item));

            const sheetName = localStorage.getItem("language") === "fr" ? "Planification" : "برنامج عمل جماعة مراكش";

            // Call your exportAsExcelFile1 method
            this.excelService.exportAsExcelFile1("Planification", "", this.searchOptionsValues, json, this.footerData, "Planification", sheetName, selectedColumns);
        },
        (err) => {
            console.log(err);
        }
    );
		// }
		// if (localStorage.getItem("language") == "ar") {
		// 	this.programeServie.research(0, 500, this.formData).subscribe(
		// 		(res: any) => {
		// 			console.log(res);
		// 			let data: any[] = res.content;
		// 			let json = data.map((item) => new excelDateProgramme(item));
    //       if(this.selectedValueCherche.includes('ORIENTATIONS_STRATEGIQUES')){
    //         this.columns.push("التوجهات الاستراتيجية")
    //       }
		// 			(this.columns = ["التوجهات الاستراتيجية", "رمز التوجه", "المحاور", "رمر المحور", "الأهداف الاستراتيجية", "الأهداف التنفيذية",
    //        "رقم المشروع", "رمز المشروع", "المشاريع", "اتفاقية", "المستوى", "طبيعة المشروع", "تتبع المشروع", "الموقع", "صاحب المشروع المنتدب", 
    //        "السنة", "مدته", "المرحلة", "التكلفة الاجمالية(مليون درهم)", "مساهمة الجماعة(مليون درهم)", "مساهمة الجماعة السنة الاولى (م.د)", 
    //        "التكلفة الاجمالية السنة الاولى (م.د)", "مساهمة الجماعة السنة الثانية (م.د)", "التكلفة الاجمالية السنة الثانية (م.د)", 
    //        "مساهمة الجماعة السنة الثالثة (م.د)", "التكلفة الاجمالية السنة الثالثة (م.د)", "مساهمة الجماعة لتلاث سنوات الأولى (م.د)",
    //         "مساهمة الشركاء لتلاث سنوات الأولى(م.د)", "التكلفة الاجمالية لتلاث سنوات الأولى(م.د)", "التكلفة الاجمالية لتلاث سنوات الثانية (م.د)", 
    //         "المبلغ المتوفر للجماعة لتلاث سنوات الأولى (م.د)", "المبلغ غير المتوفر للجماعة  لتلاث سنوات الأولى (م.د)"]), this.excelService.exportAsExcelFileAr("برنامج عمل جماعة مراكش", "", this.columns, json, this.footerData, "Planification", this.translate.instant("MENU.listProgramme"));
		// 		},
		// 		(err) => {
		// 			console.log(err);
		// 		}
		// 	);
		// }
	}
}
export class excelDateProgramme {
	id: number;
	ANNEE;

	// dateFin: string;
	//numeroprojet:string;

	PROJET: string;
	CODE_PROJET: string;
	MAITRE_OUVRAGE: string;
	MAITRE_OUVRAGE_DELEGUE: string;
	CHEF_PROJET: string;
	AXE: string;
	CODE_AXE: string;
	ORIENTATIONS_STRATEGIQUES: string;

	CODE_ORIENTATION: string;

	OBJECTIFS_STRATEGIQUES: string;

	OBJECTIFS_OPERATIONNELS: string;

	LIEU: string;

	COUT: string;

	description: string;

	NATURE_PROJET: string;

	NIVEAU: string;

	programmePhaseBudgets;

	NUMERO_PROJET: string;

	PHASE: string;

	DELAI: string;

	CONTRIBUTION_COMUNE_PREMIERE_ANNE: string;

	CONTRIBUTION_COMUNE_DEUXIEME_ANNE: string;

	CONTRIBUTION_COMUNE_TROISIEME_ANNE: string;

	TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE: string;

	TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE: string;

	TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE: string;

	CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE: string;

	MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE: string;

	MONTANT_INDISPO_COMMUNE: string;

	CONTRIBUTION_COMMUNE_TROIS_ANNEE: string;

	CONTRIBUTION_PARTENAIRE_TROIS_ANNEE: string;

	CONTRIBUTION_COMUNE: string;

	totalContributionPh2: string;

	CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE: string;

	CONVENTION: string;

	ETAT_AVANCEMENT_PROJET: string;

	constructor(item: any) {
		if (localStorage.getItem("language") == "fr") {
			if (item.orientationStrategique != null) {
				this.ORIENTATIONS_STRATEGIQUES = item.orientationStrategique;
			}
			else {
				this.ORIENTATIONS_STRATEGIQUES = '-'
			}

			if (item.codeOrientation != null) {
				this.CODE_ORIENTATION = item.codeOrientation;
			}
			else {
				this.CODE_ORIENTATION = '-';
			}

			if (item.axe != null) {
				this.AXE = item.axe;
			} else {
				this.AXE = '-';
			}

			if (item.codeAxe != null) {
				this.CODE_AXE = item.codeAxe;
			}
			else {
				this.CODE_AXE = '-';
			}

			if (item.objectifStrategique != null) {
				this.OBJECTIFS_STRATEGIQUES = item.objectifStrategique;
			}
			else {
				this.OBJECTIFS_STRATEGIQUES = '-';
			}

			if (item.objectifOperationnel != null) {
				this.OBJECTIFS_OPERATIONNELS = item.objectifOperationnel;
			}
			else {
				this.OBJECTIFS_OPERATIONNELS = '-';
			}

			if (item.numeroprojet != null) {
				this.NUMERO_PROJET = item.numeroprojet;
			}
			else {
				this.NUMERO_PROJET = '-';
			}

			if (item.codeProjet != null) {
				this.CODE_PROJET = item.codeProjet;
			}
			else {
				this.CODE_PROJET = '-';
			}


			if (item.nameProjet != null) {
				this.PROJET = item.nameProjet;
			}
			else {
				this.PROJET = '-';
			}

			if (item.sousProjets.length > 0) {
				for (let i = 0; i < item.sousProjets.length; i++) {
					if (item.sousProjets[i] != null && item.sousProjets[i].object != null && item.sousProjets[i].object != "") {
						this.CONVENTION = item.sousProjets[i].object;
					} else {
						this.CONVENTION = "-";
					}
				}
			}
			else {
				this.CONVENTION = "-";
			}


			if (item.niveau != null) {
				this.NIVEAU = item.niveau;
			}
			else {
				this.NIVEAU = '-';
			}

			if (item.nature != null) {
				this.NATURE_PROJET = item.nature;
			}
			else {
				this.NATURE_PROJET = '-';
			}

			if (item.chefProjet != null) {
				this.CHEF_PROJET = item.chefProjet;
			}
			else {
				this.CHEF_PROJET = '-';
			}

			if (item.localisation != null) {
				this.LIEU = item.localisation;
			}
			else {
				this.LIEU = '-';
			}

			if (item.maitreOuvrage != null) {
				this.MAITRE_OUVRAGE = item.maitreOuvrage;
			}
			else {
				this.MAITRE_OUVRAGE = '-';
			}



			if (item.maitreOuvrageDelegue != null) {
				this.MAITRE_OUVRAGE_DELEGUE = item.maitreOuvrageDelegue;
			} else {
				this.MAITRE_OUVRAGE_DELEGUE = "-";
			}

			if (item.date != null) {
				this.ANNEE = new Date(item.date).toLocaleString("en-GB");
			}
			else {
				this.ANNEE = '-';
			}

			if (item.etatAvancement != null) {
				if (item.etatAvancement == "NON_LANCES") {
					this.ETAT_AVANCEMENT_PROJET = "Non lancé";
				}
				if (item.etatAvancement == "EN_COURS") {
					this.ETAT_AVANCEMENT_PROJET = "En cours";
				}
				if (item.etatAvancement == "ACHEVES") {
					this.ETAT_AVANCEMENT_PROJET = "Achevé";
				}
				if (item.etatAvancement == "EN_ARRET") {
					this.ETAT_AVANCEMENT_PROJET = "En arrêt";
				}
				if (item.etatAvancement == "ANNULE") {
					this.ETAT_AVANCEMENT_PROJET = "Annulé";
				}
			} else {
				this.ETAT_AVANCEMENT_PROJET = "-";
			}

			if (item.delai != null) {
				this.DELAI = item.delai;
			}
			else {
				this.DELAI = '-';
			}


			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].phase != null) {
						this.PHASE = item.programmePhaseBudgets[i].phase.name;
					} else {
						this.PHASE = "-";
					}
				}
			} else {
				this.PHASE = "-"
			}


			if (item.cout != null) {
				this.COUT = item.cout;
			}
			else {
				this.COUT = '-';
			}
			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2 != null) {
						this.CONTRIBUTION_COMUNE = item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune1 != null) {
						this.CONTRIBUTION_COMUNE_PREMIERE_ANNE = item.programmePhaseBudgets[i].contributionComune1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPremiereAnnee != null) {
						this.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE = item.programmePhaseBudgets[i].totalContributionPremiereAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
					}
				}
			}
			else {
				this.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune2 != null) {
						this.CONTRIBUTION_COMUNE_DEUXIEME_ANNE = item.programmePhaseBudgets[i].contributionComune2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee != null) {
						this.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE = item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
					}
				}
			}
			else {
				this.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune3 != null) {
						this.CONTRIBUTION_COMUNE_TROISIEME_ANNE = item.programmePhaseBudgets[i].contributionComune3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee != null) {
						this.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE = item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
					}
				}
			}
			else {
				this.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionCommune != null) {
						this.CONTRIBUTION_COMMUNE_TROIS_ANNEE = item.programmePhaseBudgets[i].contributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMMUNE_TROIS_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMMUNE_TROIS_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionPartenaires != null) {
						this.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE = item.programmePhaseBudgets[i].contributionPartenaires.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContribution != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "1") {
								this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = item.programmePhaseBudgets[i].totalContribution.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = "-";
							}
						}
					} else {
						this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPh2 != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "2") {
								this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = item.programmePhaseBudgets[i].totalContributionPh2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = "-";
							}
						}
					} else {
						this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantDispoCommune3PA != null) {
						this.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE = item.programmePhaseBudgets[i].montantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE = "-";
					}
				}
			}
			else {
				this.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantIndispoCommune != null) {
						this.MONTANT_INDISPO_COMMUNE = item.programmePhaseBudgets[i].montantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.MONTANT_INDISPO_COMMUNE = "-";
					}
				}
			}
			else {
				this.MONTANT_INDISPO_COMMUNE = "-";
			}

		}
		if (localStorage.getItem("language") == "ar") {
			if (item.orientationStrategiqueAr != null) {
				this.ORIENTATIONS_STRATEGIQUES = item.orientationStrategiqueAr;
			}
			else {
				this.ORIENTATIONS_STRATEGIQUES = '-'
			}

			if (item.codeOrientation != null) {
				this.CODE_ORIENTATION = item.codeOrientation;
			}
			else {
				this.CODE_ORIENTATION = '-';
			}

			if (item.axeAr != null) {
				this.AXE = item.axeAr;
			} else {
				this.AXE = '-';
			}

			if (item.codeAxe != null) {
				this.CODE_AXE = item.codeAxe;
			}
			else {
				this.CODE_AXE = '-';
			}

			if (item.objectifStrategiqueAr != null) {
				this.OBJECTIFS_STRATEGIQUES = item.objectifStrategiqueAr;
			}
			else {
				this.OBJECTIFS_STRATEGIQUES = '-';
			}

			if (item.objectifOperationnelAr != null) {
				this.OBJECTIFS_OPERATIONNELS = item.objectifOperationnelAr;
			}
			else {
				this.OBJECTIFS_OPERATIONNELS = '-';
			}

			if (item.numeroprojet != null) {
				this.NUMERO_PROJET = item.numeroprojet;
			}
			else {
				this.NUMERO_PROJET = '-';
			}

			if (item.codeProjet != null) {
				this.CODE_PROJET = item.codeProjet;
			}
			else {
				this.CODE_PROJET = '-';
			}


			if (item.nameProjet != null) {
				this.PROJET = item.nameProjet;
			}
			else {
				this.PROJET = '-';
			}

			if (item.sousProjets.length > 0) {
				for (let i = 0; i < item.sousProjets.length; i++) {
					if (item.sousProjets[i] != null && item.sousProjets[i].object != null && item.sousProjets[i].object != "") {
						this.CONVENTION = item.sousProjets[i].object;
					} else {
						this.CONVENTION = "-";
					}
				}
			}
			else {
				this.CONVENTION = "-";
			}


			if (item.niveau != null) {
				this.NIVEAU = item.niveau;
			}
			else {
				this.NIVEAU = '-';
			}

			if (item.natureAr != null) {
				this.NATURE_PROJET = item.natureAr;
			}
			else {
				this.NATURE_PROJET = '-';
			}

			if (item.chefProjetAr != null) {
				this.CHEF_PROJET = item.chefProjetAr;
			}
			else {
				this.CHEF_PROJET = '-';
			}

			if (item.localisationAr != null) {
				this.LIEU = item.localisationAr;
			}
			else {
				this.LIEU = '-';
			}

			if (item.maitreOuvrage != null) {
				this.MAITRE_OUVRAGE = item.maitreOuvrage;
			}
			else {
				this.MAITRE_OUVRAGE = '-';
			}



			if (item.maitreOuvrageDelegue != null) {
				this.MAITRE_OUVRAGE_DELEGUE = item.maitreOuvrageDelegue;
			} else {
				this.MAITRE_OUVRAGE_DELEGUE = "-";
			}

			if (item.date != null) {
				this.ANNEE = new Date(item.date).toLocaleString("en-GB");
			}
			else {
				this.ANNEE = '-';
			}

			if (item.etatAvancement != null) {
				if (item.etatAvancement == "NON_LANCES") {
					this.ETAT_AVANCEMENT_PROJET = "Non lancé";
				}
				if (item.etatAvancement == "EN_COURS") {
					this.ETAT_AVANCEMENT_PROJET = "En cours";
				}
				if (item.etatAvancement == "ACHEVES") {
					this.ETAT_AVANCEMENT_PROJET = "Achevé";
				}
				if (item.etatAvancement == "EN_ARRET") {
					this.ETAT_AVANCEMENT_PROJET = "En arrêt";
				}
				if (item.etatAvancement == "ANNULE") {
					this.ETAT_AVANCEMENT_PROJET = "Annulé";
				}
			} else {
				this.ETAT_AVANCEMENT_PROJET = "-";
			}

			if (item.delai != null) {
				this.DELAI = item.delai;
			}
			else {
				this.DELAI = '-';
			}


			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].phase != null) {
						this.PHASE = item.programmePhaseBudgets[i].phase.name;
					} else {
						this.PHASE = "-";
					}
				}
			} else {
				this.PHASE = "-"
			}


			if (item.cout != null) {
				this.COUT = item.cout;
			}
			else {
				this.COUT = '-';
			}
			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2 != null) {
						this.CONTRIBUTION_COMUNE = item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune1 != null) {
						this.CONTRIBUTION_COMUNE_PREMIERE_ANNE = item.programmePhaseBudgets[i].contributionComune1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPremiereAnnee != null) {
						this.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE = item.programmePhaseBudgets[i].totalContributionPremiereAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
					}
				}
			}
			else {
				this.TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune2 != null) {
						this.CONTRIBUTION_COMUNE_DEUXIEME_ANNE = item.programmePhaseBudgets[i].contributionComune2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee != null) {
						this.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE = item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
					}
				}
			}
			else {
				this.TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune3 != null) {
						this.CONTRIBUTION_COMUNE_TROISIEME_ANNE = item.programmePhaseBudgets[i].contributionComune3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee != null) {
						this.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE = item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
					}
				}
			}
			else {
				this.TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionCommune != null) {
						this.CONTRIBUTION_COMMUNE_TROIS_ANNEE = item.programmePhaseBudgets[i].contributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_COMMUNE_TROIS_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_COMMUNE_TROIS_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionPartenaires != null) {
						this.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE = item.programmePhaseBudgets[i].contributionPartenaires.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_PARTENAIRE_TROIS_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContribution != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "1") {
								this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = item.programmePhaseBudgets[i].totalContribution.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = "-";
							}
						}
					} else {
						this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPh2 != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "2") {
								this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = item.programmePhaseBudgets[i].totalContributionPh2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = "-";
							}
						}
					} else {
						this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = "-";
					}
				}
			}
			else {
				this.CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantDispoCommune3PA != null) {
						this.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE = item.programmePhaseBudgets[i].montantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE = "-";
					}
				}
			}
			else {
				this.MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantIndispoCommune != null) {
						this.MONTANT_INDISPO_COMMUNE = item.programmePhaseBudgets[i].montantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.MONTANT_INDISPO_COMMUNE = "-";
					}
				}
			}
			else {
				this.MONTANT_INDISPO_COMMUNE = "-";
			}
		}
	}



}