import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SpinnerService } from '../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
import { formatDate } from "@angular/common";
import Swal from "sweetalert2";
import { AuthService } from "../../../../core/auth";

@Component({
    selector: "kt-marche-detail",
    templateUrl: "./marche-detail.component.html",
    styleUrls: ["./marche-detail.component.scss"],
})
export class MarcheDetailComponent implements OnInit {
    checkLang: string;
    // ==========================================================
    //
    // ==========================================================
    constructor(
        private service: AoService,
        private authService: AuthService,
        private orgService:OrganisationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service1: OrganisationService,
        private translate: TranslateService,
        private spinnerService: SpinnerService,
    ) { }
    // ==========================================================
    //
    // ==========================================================
    id;
    divisionLibelle;
    serviceLibelle;
    
    // ==========================================================
    //
    // ==========================================================
    marche 
	// = {
    //     id: 1,
    //     adjucataire: {
    //         id: 1,
    //         nom: "",
    //         adresse: "",
    //         mail: "",
    //         rc: "",
    //         ice: "",
    //         idFisc: "",
    //         tel: "",
    //     },
    //     ao:{
    //         id: ""
            
    //     },
    //     statutMarche: { id: 1, libelle: "" },
    //     descriptif: "",
    //     responsableMarche: 0,
    //     service: 0,
    //     division: 0,
    //     dateNotification: null,
    //     mntEngage: 0,
    //     plafondRetenu: 0,
    //     prctRetenu: 0,
    //     cautionDefinitive: 0,
    //     delaisExecution: 0,
    //     dateDebutMarche: null,
    //     modePassation: { id: 0, libelle: "" },
    //     objet: "",
    //     mntAdjucataire: 0,
    //     numMarche: "",
    //     createurUser: "",
    //     modificateurUser: "",
    //     updateDate: "",
    //     creationDate: "",
    // };
    // ==========================================================
    //
    // ==========================================================
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.id = params["id"];
        });
        this.checkLang = window.localStorage.getItem("language");
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            if (event.lang == 'ar') {
                this.checkLang = 'ar';
            } else if (event.lang == 'fr') {
                this.checkLang = 'fr';
            }
        });
        this.getMarcheDetails();
        this.service.getAoById(this.id).subscribe((res)=>{
            this.authService.getUserByUserName(res.createurUser).then((user) => {
                
                this.orgService.findEntityById(user.idDivision,'/divisions/show2/').subscribe((entity) => {
                    
                    if(this.checkLang=='fr'){
                        this.divisionLibelle=entity.libelleFR

                    }
                    if(this.checkLang=='ar'){
                        this.divisionLibelle=entity.libelle

                    }
                
                })
                this.orgService.findEntityById(user.idService,'/services/find/').subscribe((entity) => {
                    
                    if(this.checkLang=='fr'){
                        this.serviceLibelle=entity.libelleFR

                    }
                    if(this.checkLang=='ar'){
                        this.serviceLibelle=entity.libelle

                    }
                
                })
            })
		
        })
		
    }
    // ==========================================================
    //
    // ==========================================================
    getMarcheDetails() {
        // var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

        
        this.service.findMarcheByAo_Id(this.id)
            // .pipe(finalize(() => {
            //  this.spinnerService.stop(spinnerRef);// stop spinner
            // }))
            .subscribe((data) => {
                
                this.marche = data;
                this.marche.dateDebutMarche = new Date(data.dateDebutMarche).toISOString();

                console.log("afetrLoad : " + JSON.stringify(data, null, 2))
                // this.getDivisionEtService();
            },
                (err) => {
                    console.log(err);
                });
    }
    // ==========================================================
    //
    // ==========================================================
    async getDivisionEtService() {
        
        await this.service1
            .findEntityById(this.marche.division, "/divisions/find/")
            .subscribe((d) => {
                if (this.checkLang == 'ar') {
                    this.divisionLibelle = d.libelle;
                } else if (this.checkLang == 'fr') {
                    this.divisionLibelle = d.libelleFR;
                }
            });

        await this.service1
            .findEntityById(this.marche.service, "/services/find/")
            .subscribe((s) => {
                if (s)
                    if (this.checkLang == 'ar') {
                        this.serviceLibelle = s.libelle;
                    } else if (this.checkLang == 'fr') {
                        this.serviceLibelle = s.libelleFR;
                    }
            });
    }
    // ==========================================================
    //
    // ==========================================================
    AddDocAdminAdj() {
        this.router.navigate(["marches/marche-detail/doc-admin-adjucataire"], {
            queryParams: { id: this.id},
        });
        
    }
    // ==========================================================
    //
    // ==========================================================
    AddEngagApprob() {
        console.log("Engagement et approbation !")
        this.router.navigate(["marches/marche-detail/engagement-approbation"], {
            queryParams: { id: this.marche.id },
        });
    }
    // ==========================================================
    //
    // ==========================================================
    AddOrdreService() {
        this.router.navigate(["marches/marche-detail/ordre-service"], {
            queryParams: { id: this.marche.id },
        });
    }
    // ==========================================================
    //
    // ==========================================================
    AddOrdreArretReprise() {
        this.router.navigate(["marches/marche-detail/ordre-arret-reprise"], {
            queryParams: { id: this.marche.id},
        });
    }
    // ==========================================================
    //
    // ==========================================================
    AddComiteMarche() {
        this.router.navigate(["marches/marche-detail/comite-marche"], {
            queryParams: { id: this.marche.id },
        });
    }
    // ==========================================================
    //
    // ==========================================================
    AddPhase() {
        this.router.navigate(["marches/marche-detail/phase-marche"], {
            queryParams: { id: this.marche.id },
        });
    }
    // ==========================================================
    //
    // ==========================================================
    AddFacture() {
        this.router.navigate(["marches/marche-detail/facture-phases-marche"], {
            queryParams: { id: this.marche.id  },
        });
    }
    // =========================================================,=
    //
    // ==========================================================
    AddLivrable() {
        this.router.navigate(["marches/marche-detail/livrable-phases-marche"], {
            queryParams: { id: this.marche.id  },
        });
    }
    // =================================================================
    // Reception Div Technique | updated on 03-12-20
    // =================================================================
    AddReceptions() {
        this.router.navigate(["marches/marche-detail/receptions"], {
            queryParams: { id: this.marche.id  },
        });
    }
    // ==================================================================
    // Mise en demeureet résiliation Div Technique | updated on 03-12-20
    // ==================================================================
    AddMisEnDemeureResiliation() {
        this.router.navigate(["marches/marche-detail/mise-en-demeure-resiliation"], {
            queryParams: { id: this.marche.id  },
        });
    }
    // ==================================================================
    // Travaux supplimentaires Div Technique | updated on 15-01-21
    // ==================================================================
    AddTravauxSupplimentaires() {
        this.router.navigate(["marches/marche-detail/travaux-supplimentaires"], {
            queryParams: { id: this.marche.id  },
        });
    }
    // ==================================================================
    // Penalités pour retard et interets moratoires Div Technique | updated on 18-02-21
    // ==================================================================
    AddPenalitesEtInterets() {
        this.router.navigate(["marches/marche-detail/penalites-interet"], {
            queryParams: { id: this.marche.id  },
        });
    }
    // ==================================================================
    // PJ manager | updated on 04-01-21
    // ==================================================================
    AddPJ() {
        this.router.navigate(["marches/marche-detail/pj-marche"], {
            queryParams: { id: this.marche.id  },
        });
    }

    // ============================================
    // Historique
    // ============================================
    showHitory() {
        Swal.fire({
            title: 'Informations',
            icon: 'info',
            confirmButtonText: 'Fermer',
            html: '<table width="100%">' +
                '<tbody>' +
                '<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Créer par :</th>' +
                '<td style="font-size: 15px;" class="donnee_show">' + this.getCreator(this.marche.createurUser) + '</td>' +
                '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Date création :</th>' +
                '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.marche.creationDate) + '</td>' +
                '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Date modification :</th>' +
                '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.marche.updateDate) + '</td>' +
                '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Modifier par :</th>' +
                '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getModificator(this.marche.modificateurUser) + '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>',
        })
    }
    showAO(){
        this.router.navigate(["/marches/ao-detail"], {
            queryParams: { id: this.marche.ao.id },
        });
    }
    // ============================================
    // get Creator
    // ============================================
    getCreator(user): string {
        var result = "Pas d'information";
        if (user != null) {
            result = this.marche.createurUser;
        }
        return result;
    }
    // ============================================
    // get Modificator
    // ============================================
    getModificator(user): string {
        var result = "Pas d'information";
        if (user != null) {
            result = this.marche.modificateurUser;
        }
        return result;
    }
    // ============================================
    // Date format
    // ============================================
    getDates(date): string {
        var result = "Pas d'information";
        if (date != null) {
            result = formatDate(date, 'dd/MM/yyyy HH:mm', 'ar-MA');
        }
        return result;
    }
    // ============================================
    tabClick(tab) {
        console.log(tab.index);
        switch (tab.index) {
            case 0:
                return this.AddDocAdminAdj();
            case 1:
                return this.AddEngagApprob();
            case 2:
                return this.AddPhase();
            case 3:
                return this.AddOrdreService();
            case 4:
                return this.AddOrdreArretReprise();
            case 5:
                return this.AddComiteMarche();
            case 6:
                return this.AddFacture();
            case 7:
                return this.AddLivrable();
            case 8:
                return this.AddReceptions();
            case 9:
                return this.AddMisEnDemeureResiliation();
            case 10:
                return this.AddTravauxSupplimentaires();
            case 11:
                return this.AddPenalitesEtInterets();
            case 12:
                return this.AddPJ();
            default:
                return 0;
        }
    }
}
