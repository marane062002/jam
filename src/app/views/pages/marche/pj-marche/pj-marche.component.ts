import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { AoService } from '../../shared/ao.service';
import { delay } from 'rxjs/operators';
import { environment } from "./../../../../../environments/environment";

interface typePJ {
  libelle: string;
}

@Component({
  selector: 'kt-pj-marche',
  templateUrl: './pj-marche.component.html',
  styleUrls: ['./pj-marche.component.scss']
})
export class PjMarcheComponent implements OnInit {
  id: number;
  numF : any;
  private unsubscribe: Subscription[] = [];
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  // ============================================
  // Presentation de datasource
  // ============================================
  displayedColumns: string[] = [
    "icon",
    "name",
    "type",
    "dateFile",
    "fSize",
    "actions",
  ];
  // ============================================
  // Declarations
  // ============================================
  dataSource = new MatTableDataSource<any>();
  isLoadingResults = true;
  isLoading = true;
  public uploadFiles: Array<File>;
  addFileForm: FormGroup;
  // ============================================
  // Controles pagination
  // ============================================
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  typePJ: typePJ[];

  formData = { type: "" }
  type: string;
  activeBtn: boolean = true;

  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fileService: FilesUtilsService,
    private notification: NotificationService,
    private translate: TranslateService
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    console.log(" This id : " + this.id);

  }

  ngOnInit() {

    this.fileService.fileSizeDetector();

    this.addFileForm = this.formBuilder.group({
      _file: [],
    });


    this.typePJ = [
      { libelle: "Engagement" },
      { libelle: "Approbation" },
      { libelle: "Phases marché" },
      { libelle: "Ordres service" },
      { libelle: "Ordres d'arrêt" },
      { libelle: "Ordres de reprise" },
      { libelle: "Décomptes" },
      { libelle: "Livrables" },
      { libelle: "Receptions provisoire" },
      { libelle: "Receptions définitive" },
      { libelle: "Mise en demeure" },
      { libelle: "Resiliation" },
      { libelle: "Avenants" },
      { libelle: "Pénalités pour retard" },
      { libelle: "Intérêt moratoires" },
      { libelle: "Autres" },
    ];

    this.isLoading = false;
    this.getAssociationFiles();

  }

  /**
	 * On Destroy
	 */
  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
    console.log("destroy");
  }

  // ============================================
  // Recuperer tous les association
  // ============================================
  public getAssociationFiles() {
    //this.id = this.route.snapshot.params["id"];
    //this.service.getFilesById("/PjAssociation/Allpjs/", this.id).then(
    this.service.getByIdFiles(this.id)
      .pipe(delay(300))
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
          this.isLoadingResults = false;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
          this.isLoadingResults = false;
        }
      );

  }
  // ============================================
  // Filter de recherche
  // ============================================
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // =================================================================
  // Download file from server
  // =================================================================
  onClickPjName(e, id) {
    //console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    window.open(environment.API_ALFRESCO_URL + "/PjMarche/" + r);
  }
  // =================================================================
  // Delete file from server
  // =================================================================
  onDeleteFile(id: any) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      console.log("Delete file ID: " + id);
      this.service
        .deletefiles("/PjMarche/", id)
        .subscribe((data) => {
          console.log("File  deleted : " + id);
          this.isLoading = true;
          this.dataSource = new MatTableDataSource([]);
          this.getAssociationFiles();
        });
      // Notification
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );

    }
  }
  // ============================================================
  // get file name
  // ============================================================
  FileName(file) {
    return this.fileService.getFileName(file);
  }
  // ============================================================
  // get file extension & icons
  // ============================================================
  FileExtension(file) {
    return this.fileService.getExtensionFile(file);
  }
  // ============================================================
  // Upload files
  // ============================================================
  fileChange(event) {
    this.uploadFiles = event.target.files;
    if (event.target.files.length > 0) {
     // this.type = this.formData.type;
      console.log("file size !! " + event.target.files.length + " / type :: " + this.type);
      this.addFileForm.patchValue(this.uploadFiles);
    }
  }

  // ============================================
  // OnSubmit
  // ============================================
  onSubmit() {
    const controls = this.addFileForm.controls;
    /** check form */
    if (this.addFileForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    console.log("id : " + this.id + " et file " + this.uploadFiles.length + " / type :: " + this.type);
    if (this.uploadFiles != null) {
      this.service.updloadFile(this.uploadFiles, this.id, this.type)
        .subscribe(
          (res) => {
            console.log("File inserted " + JSON.stringify(res));
            this.isLoading = true;  
            this.dataSource = new MatTableDataSource([]);
            this.getAssociationFiles();
            // reset file input
            this.inputFile.nativeElement.value = '';
            this.formData = { type: "" };
          },
          (err) => console.log("File not inserted " + JSON.stringify(err))
        );
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
      );
    }

  }
  // ============================================
  // reset file
  // ============================================
  resetFile() {
    // reset file input
    this.inputFile.nativeElement.value = '';
    this.addFileForm.get('_file').reset();
    this.formData.type = null;
  }

  onChangeType(f) {
    this.type = f.value;
    console.log(" Type file :: " + this.type)
    this.activeBtn = false;
  }
  // ============================================
  // File size converter
  // ============================================
 humanFgetFormattedFileSizeileSize(size) {
  if (size < 1024) return size + ' B'
  let i = Math.floor(Math.log(size) / Math.log(1024))
  this.numF = (size / Math.pow(1024, i))
  let round = Math.round(this.numF)
  this.numF = round < 10 ? this.numF.toFixed(2) : round < 100 ? this.numF.toFixed(1) : round
  return `${this.numF} ${'KMGTPEZY'[i-1]}B`
}
}
