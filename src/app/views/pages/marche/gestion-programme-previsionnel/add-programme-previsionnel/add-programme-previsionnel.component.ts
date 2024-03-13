import { Component, OnInit } from '@angular/core';
import { AoService } from '../../../shared/ao.service';
import { GestionDesTypesAoService } from '../../../parametrage/Services/gestion-des-types-ao.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../app/core/auth';

@Component({
  selector: 'kt-add-programme-previsionnel',
  templateUrl: './add-programme-previsionnel.component.html',
  styleUrls: ['./add-programme-previsionnel.component.scss']
})
export class AddProgrammePrevisionnelComponent implements OnInit {
  formData = {
    heureOuverturePlis:null,
    typePrestation: { id: "" },
    // sousTypePrestation:"",
    objet:"", 
    lieuExecution:"",
    lieuLivraison:"",
    idPresident:0,
    imputationBudgetaire:"",
    natureAo: { id: "" },
		modePassation: "",
		periodeLancement: null,
		dateOuverturePlis: null,
		coordonneServiceConcerne: "",
    quantite:'',
    estimation:'',
		marcheDestinePME: '',
		numRef: '',
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
  ServiceConcerne=[
    'Division etudes planification et transformation digitale',
    'Division urbanisme et aménagement urbain',
    'Division des affaires techniques',
    'Division des affaires culturelles et sportives',
    'Division de l\'action sociale',
    'Division budget,comptabilité et marchés publics',
    'Division des Grands services et logistique',
    'Division de Gestion des ressources   financières',]
    President
  constructor( private authService:AuthService, private router: Router,private service: AoService,private serviceTypeAo:GestionDesTypesAoService,) { }
  typesAO
  ngOnInit() {
    this.authService.getUserWherePresidentTrue().then((res)=>{
      this.President=res
      
    })
    this.serviceTypeAo.getAll().then((res)=>{
			this.typesAO=res
			
		})
    this.service.getAllNatureAo().subscribe((data) => {
			this.natureAoAll = data;
		});
    this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
      
		});
  }
  isTravaux
  isFournitures
  isServices

		 

	
	onChangeTypePrestationAo(f) {
    if(f.value=='1'){
this.isTravaux=true
this.isFournitures=false
this.isServices=false

this.listSousTypePrestationAo=["Travaux","Aménagement","Travaux d\'entretien","Travaux de maintenance","Travaux de réfection","Consultation Architecturale"]
    }

    if(f.value=='2'){
      this.isTravaux=false

      this.isFournitures=true
      this.isServices=false

      this.listSousTypePrestationAo=["Achat","Equipement","Fournitures","Achat de vaccin","Achat de produit désinfectants","Achat de produit dératisation","Achat de petit matériel","matériel"]

    }
    if(f.value=='3'){
      this.isFournitures=false
      this.isTravaux=false

      this.isServices=true
      this.listSousTypePrestationAo=["Frais d\'animation artistique et culturelle",
      "Hébergement,de restauration et de réception",
      "Location de matériel des fêtes","Impression","Transport",
      "Frais de réception","Location","Frais de transport","Entretien","Entretien de photocopieuses et mobilier de bureau","Gardiennage","Frais d\'hospitalisation","Assurance"
      ,"Etude technique","Etude géotechnique","Etude","Concour Architecturale","Contôle technique","Etude topographique","Suivie et accompagnement","Conception","Maintenance","service",
    "Ordonnancement et pilotage","Etude Architecturale","Conception et suivi des travaux","Prestation de mise à jour","Le systéme d\'archifage"]

    }
    
	
	}
  isVisible1
  selectedmodePassation(event) {
		if (event.value == 6) {
			this.isVisible1 = true;
		} else {
			this.isVisible1 = false;
		}
	}
  backList() {
		/* this.router.navigate(["/marches/ao-list"]); */
		this.router.navigate(["/marches/list-programme-previsionnel"]);
	}
  onSubmit() {
	
			this.formData.heureOuverturePlis= this.formData.dateOuverturePlis.split("T")[1];
      
		
			this.service.addProgrammePrevisionnel(this.formData).subscribe((res) => {
			  this.router.navigate(["/marches/list-programme-previsionnel"]);

				
			
			});
		
	
	}
}
