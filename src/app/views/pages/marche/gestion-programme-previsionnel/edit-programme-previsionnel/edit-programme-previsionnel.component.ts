import { Component, OnInit } from '@angular/core';
import { AoService } from '../../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../../utils/spinner.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { GestionDesTypesAoService } from '../../../parametrage/Services/gestion-des-types-ao.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../../../app/core/auth';

@Component({
  selector: 'kt-edit-programme-previsionnel',
  templateUrl: './edit-programme-previsionnel.component.html',
  styleUrls: ['./edit-programme-previsionnel.component.scss']
})
export class EditProgrammePrevisionnelComponent implements OnInit {
  formData = {
    heureOuverturePlis:null,
    typePrestation: { id: "" },
    // sousTypePrestation:"",
    objet: "",
    lieuExecution: "",
    lieuLivraison: "",
    idPresident:0,
    imputationBudgetaire: "",
    natureAo: { id: 0 },
    modePassation: "",
    periodeLancement: null,
    dateOuverturePlis: null,
    coordonneServiceConcerne: "",
    quantite: '',
    estimation: '',
    marcheDestinePME: '',
    numRef: 0,
  }
  typePrestation: number;
  listSousTypePrestationAo;
  lisTypePrestationAo
  natureAoAll

  // ServiceConcerne=['Division des études planification et systéme d\'information',
  // 'Division des grands services et logistiques',
  // 'Division technique (service batiment)',
  // 'Division technique (service des espaces vert et de proprete)',
  // 'Division technique (service voirie)',
  // 'Division de l\'action sociale',
  // 'Service de la cooperation decentralisée et du partenariat',
  // 'Bureau communal d \'hygiene',
  // 'Division culturelle et sportive',
  // 'Abattoirs communaux',
  // 'Division technique',
  // 'Division des affaires juridiques et du contentieux judiciaire',
  // 'Centre communal d\'archive et documentation']
  ServiceConcerne = [
    'Division etudes planification et transformation digitale',
    'Division urbanisme et aménagement urbain',
    'Division des affaires techniques',
    'Division des affaires culturelles et sportives',
    'Division de l\'action sociale',
    'Division budget,comptabilité et marchés publics',
    'Division des Grands services et logistique',
    'Division de Gestion des ressources   financières',]
  checkLang
  constructor(private authService:AuthService,private datePipe: DatePipe,private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService, private translate: TranslateService, private router: Router, private service: AoService, private serviceTypeAo: GestionDesTypesAoService,) {
    this.checkLang = window.localStorage.getItem("language");

  }
  typesAO
  id
  President
  ngOnInit() {
    this.authService.getUserWherePresidentTrue().then((res)=>{
      this.President=res
      
    })
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == "ar") {
        this.checkLang = "ar";
      } else if (event.lang == "fr") {
        this.checkLang = "fr";
      }
    });
    this.serviceTypeAo.getAll().then((res) => {
      this.typesAO = res

    })
    this.service.getAllNatureAo().subscribe((data) => {
      this.natureAoAll = data;
    });
    this.service.getAllTypePrestationAo().subscribe((data) => {
      this.lisTypePrestationAo = data;

    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params["id"];
      // this.backPage = params["page"];
    });
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

    this.service.getProgrammePrevisionnelById(this.id).pipe(
      finalize(() => {
        this.spinnerService.stop(spinnerRef); // stop spinner
      })
    ).subscribe((res) => {
      this.formData = res
      
      this.formData.dateOuverturePlis = new Date(res.dateOuverturePlis);
      
      this.formData.heureOuverturePlis = `${this.formData.heureOuverturePlis[0].toString().padStart(2, '0')}:${this.formData.heureOuverturePlis[1].toString().padStart(2, '0')}`;

      
      if (this.formData.dateOuverturePlis != null && this.formData.heureOuverturePlis!=null) {
        let a=typeof this.formData.dateOuverturePlis
        
				this.formData.dateOuverturePlis = this.datePipe.transform(this.formData.dateOuverturePlis, 'yyyy-MM-dd')+' '+this.formData.heureOuverturePlis;
			
      }
      if (this.formData.typePrestation.id == '1') {
        this.isTravaux = true
        this.isFournitures = false
        this.isServices = false

      }

      if (this.formData.typePrestation.id == '2') {
        this.isTravaux = false

        this.isFournitures = true
        this.isServices = false


      }
      if (this.formData.typePrestation.id == '3') {
        this.isFournitures = false
        this.isTravaux = false

        this.isServices = true

      }
      if (this.formData.natureAo.id == 6) {
        this.isVisible1 = true;
      } else {
        this.isVisible1 = false;
        this.formData.modePassation=null

      }
      this.formData.periodeLancement = new Date(res.periodeLancement).toISOString();


    })
  }
  isTravaux
  isFournitures
  isServices


  selectedTypePrestationAo(p1, p2) {
    let p = Number(p1)
    if (p && p2) {
      return p === p2
    }
    return false;
  }
  selectedValuePresident(p1, p2) {
    let p = Number(p1)
    
    if (p && p2) {
      return p === p2
    }
    return false;
  }
  selectedValuemodePassation(p1, p2) {
    let p = Number(p1)
    if (p && p2) {
      return p === p2
    }
    return false;
  }
  onChangeTypePrestationAo(f) {
    if (f.value == '1') {
      this.isTravaux = true
      this.isFournitures = false
      this.isServices = false
      this.formData.quantite = null
      this.formData.lieuLivraison = null
    }

    if (f.value == '2') {
      this.isTravaux = false

      this.isFournitures = true
      this.isServices = false
      this.formData.lieuExecution = null

    }
    if (f.value == '3') {
      this.isFournitures = false
      this.isTravaux = false
      this.formData.quantite = null
      this.formData.lieuLivraison = null
      this.isServices = true

    }


  }
  isVisible1
  selectedmodePassation(event) {
    if (event.value == 6) {
      this.isVisible1 = true;
    } else {
      this.formData.modePassation=null
      this.isVisible1 = false;
    }
  }
  backList() {
    /* this.router.navigate(["/marches/ao-list"]); */
    this.router.navigate(["/marches/list-programme-previsionnel"]);
  }
  onSubmit() {


    this.formData.heureOuverturePlis= this.formData.dateOuverturePlis.split(" ")[1];
    
    if (this.formData.dateOuverturePlis != null && this.formData.heureOuverturePlis!=null) {
      let a=typeof this.formData.dateOuverturePlis
      
      this.formData.dateOuverturePlis = this.datePipe.transform(this.formData.dateOuverturePlis, 'yyyy-MM-dd')+' '+this.formData.heureOuverturePlis;
    
    this.formData.dateOuverturePlis=new Date(this.formData.dateOuverturePlis)
    }
    
    this.service.editProgrammePrevisionnel(this.formData).subscribe((res) => {
      this.router.navigate(["/marches/list-programme-previsionnel"]);



    });


  }
}
