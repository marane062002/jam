import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';

interface typePJ {
  libelle: string;
}

@Component({
  selector: 'kt-doc-admin-adjucataire',
  templateUrl: './doc-admin-adjucataire.component.html',
  styleUrls: ['./doc-admin-adjucataire.component.scss']
})
export class DocAdminAdjucataireComponent implements OnInit {
  // ====================================================================
  //
  // ====================================================================
  id: number;
  ShowSuccessShare = false;
  isLoadingForShare = false;
  private unsubscribe: Subscription[] = [];
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  // ====================================================================
  //
  // ====================================================================
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
  // ====================================================================
  //
  // ====================================================================
  public uploadFiles: Array<File>;
  addFileForm: FormGroup;
  typePJ: typePJ[];
  formData = { type: "" }
  formData2 = {};
  marche = { "statutMarche": { "id": 1 } };
  type: string;
  activeBtn: boolean = true;
  // ====================================================================
  //
  // ====================================================================
  ngOnInit() {
    this.service.findMarcheByAo_Id(this.id).subscribe(data => {
      console.log(data)
      this.marche = data;
    })

    this.fileService.fileSizeDetector();

    this.addFileForm = this.formBuilder.group({
      _file: [],
    });

    this.typePJ = [
      { libelle: "RC" },
      { libelle: "Attestation fiscale" },
    ];
  }
  // ====================================================================
  //
  // ====================================================================
  onClickOM($event) {
    this.marche.statutMarche.id = 2;
    this.service.sendMarcheDocPrestataire(this.marche).subscribe(data => {
      this.formData2 = data;
    })
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
      this.isLoadingForShare = true;
       this.marche.statutMarche.id = 2;
      
      this.service.sendMarcheDocPrestataire(this.marche).subscribe(data => {
        this.formData2 = data;
      })

      this.service.updloadFile(this.uploadFiles, this.id, this.type)
        .subscribe(
          (res) => {
            console.log("File inserted " + JSON.stringify(res));
            this.isLoadingForShare = false;
            this.ShowSuccessShare = true;
            setTimeout(() => {
              this.hideS();
            }, 1500);
            // reset file input
            this.inputFile.nativeElement.value = '';
            this.formData = { type: "" };
          },
          (err) => console.log("File not inserted " + JSON.stringify(err))
        );
        /*
      this.notification.success(
        this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
      );
      */
    }
  }
  // ====================================================================
  //
  // ====================================================================
  hideS() {
    this.ShowSuccessShare = false;
  }
  // ====================================================================
  //
  // ====================================================================
  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
    console.log("destroy");
  }
  // ====================================================================
  //
  // ====================================================================
  fileChange(event) {
    this.uploadFiles = event.target.files;
    if (event.target.files.length > 0) {
      // this.type = this.formData.type;
      console.log("file size !! " + event.target.files.length + " / type :: " + this.type);
      this.addFileForm.patchValue(this.uploadFiles);
    }
  }
  // ====================================================================
  //
  // ====================================================================
  resetFile() {
    // reset file input
    this.inputFile.nativeElement.value = '';
    this.addFileForm.get('_file').reset();
    this.formData.type = null;
  }
  // ====================================================================
  //
  // ====================================================================
  onChangeType(f) {
    this.type = f.value;
    console.log(" Type file :: " + this.type)
    this.activeBtn = false;
  }
}
