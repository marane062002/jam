import { Component, OnInit } from '@angular/core';

import { Observable, Observer, BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { environment } from "./../../../../../environments/environment";
import { FilesUtilsService } from '../../utils/files-utils.service';
import { DemandesService } from '../../utils/demandes.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Association360Tab, MANDATS } from "../../associations/show-association/show-association.component";
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'kt-show-demandes-soutien-logistique',
  templateUrl: './show-demandes-soutien-logistique.component.html',
  styleUrls: ['./show-demandes-soutien-logistique.component.scss']
})
export class ShowDemandesSoutienLogistiqueComponent implements OnInit {

  // ============================================
  demandeDetails: any;
  demandeDataSource = new MatTableDataSource<any>();

  // ============================================
  // Datasource mandat
  // ============================================
  details: any;
  dataSource = new MatTableDataSource<any>();
  files: Observable<any>;
  filesRquests: Observable<any>;
  filesResponse: Observable<any>;
  isLoading = true;
  history: boolean = false;


  // =====================================
  // Declarations
  // =====================================
  asyncTabs: Observable<Association360Tab[]>;
  selected = new FormControl(0);
  id: Number;
  // id2: string;
  isLoadingResults = true;
  start: boolean = true;
  assocInfo: boolean = false;
  nbMembre: number = 0;
  nbrH: number = 0;
  nbrF: number = 0;

  public obs$: Observable<any[]>;
  myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  varData: any;
  // ============================================
  // Constructeur
  // ============================================
  constructor(private router: Router, private filesUtil: FilesUtilsService, private demandeService: DemandesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    // this.id2 = this.route.snapshot.params["id2"];

    this.demandeService.getDemandesById('/demande/getDemandesById/', this.id).subscribe(
      (data) => {
        console.log("12222222222");
        console.log(data);
        this.details = data;
        this.dataSource = new MatTableDataSource(data);
      },

      (error) => {
        console.log(error);
      }
    );
    this.filesRquests = this.demandeService.getByIdRequestsOrResponse(this.id, '/DemandeRequest');
    this.filesResponse = this.demandeService.getByIdRequestsOrResponse(this.id, '/DemandeResponse');

  }
  // =====================================
  // get file name
  // ============================================================
  FileName(file) {
    return this.filesUtil.getFileName(file);
  }
  // ============================================================
  // get file extension & icons
  // ============================================================
  FileExtension(file) {
    return this.filesUtil.getExtensionFile(file);
  }
  // =================================================================
  // Download file from server
  // =================================================================
  onClickPjName(e, id) {
    //console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    window.open(environment.API_ALFRESCO_URL + "/PjDemande/" + r);
  }
  // =================================================================
  // back to list
  // =====================================
  back() {
    this.router.navigate(["/demandes/list-demandes-soutien-logistique"]);
  }
}
