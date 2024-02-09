import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { ExcelAssociationService } from '../../../utils/excel-association.service';
import { TranslateService } from '@ngx-translate/core';
import { ConsistanceConventionService } from '../../../../../views/pages/shared/consistance-convention.service';
import { ExecutionProjetService } from '../../../../../views/pages/shared/execution-projet.service';
import { ProgrammeRetroService } from '../../../shared/ProgrammeRetroService';

@Component({
  selector: 'kt-show-programme-retroplanning',
  templateUrl: './show-programme-retroplanning.component.html',
  styleUrls: ['./show-programme-retroplanning.component.scss']
})
export class ShowProgrammeRetroplanningComponent implements OnInit {
  language = localStorage.getItem('language');
  id;
  programmeRetro;
  consistances;
  emplacements;

  constructor(public consistanceConvention: ConsistanceConventionService, public executionProjet: ExecutionProjetService,
    private translate: TranslateService, private router: Router, private excelService: ExcelAssociationService, private activatedRoute: ActivatedRoute,
    private fileUtils: FilesUtilsService,
    public dialog: MatDialog,
    private programmeRetroService: ProgrammeRetroService) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
      this.programmeRetroService.findById(this.id).subscribe((res: any) => {
        console.log("Res: " + JSON.stringify(res));
        this.programmeRetro = res;
        this.emplacements=res.emplacement;
        this.consistances=res.consistance;
      }, err => {
        console.log(err);
      })
      // this.files = this.programmeRetroService.getByIdFiles(this.id);
    });

  }

 /*  FileName(file) {
    return this.fileUtils.getFileName(file);
  }

  FileExtension(file) {
    return this.fileUtils.getExtensionFile(file);
  }

  onClickPjName(a, e, id) {
    console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    //window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
    this.programmeRetroService.downoldFile(r, a);
  } */


  RetourEmbalages(): void {
    this.router.navigate(["programme/retroplanning-programme"]);

  }

}
