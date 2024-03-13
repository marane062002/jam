import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AoService } from '../../shared/ao.service';

@Component({
  selector: 'kt-commission-edit',
  templateUrl: './commission-edit.component.html',
  styleUrls: ['./commission-edit.component.scss']
})
export class CommissionEditComponent implements OnInit {
  // ==================================================================
  //
  // ==================================================================
  idao;
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.idao = params["id"];
    // });
  }
  // ==================================================================
  //
  // ==================================================================
  idcommission;
  commission = {
    id: 0,
    typeCommission: { id: 0, libelle: "" },
    dateOuveture: null,
    dateProchaineSeance: null,
    ao: { id: 0 },
  };
  formDataCommssion = {
    id: 0,
    dateOuveture: null,
    dateProchaineSeance: null,
    typeCommission: { id: 1, libelle: "" },
    ao: { id: 1 },
  };
  ao
  // ==================================================================
  //
  // ==================================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idcommission = params["id"];
      this.idao = params['idao']
    });
    this.service.data$.subscribe(res => this.idao = res);
    this.service.getAoById(this.idao).subscribe((res) => {
      this.ao = res
    })
    this.service.getCommissionById(this.idcommission).subscribe((data) => {
      console.log("Commission : " + JSON.stringify(data, null, 2));
      this.commission = data;

      if (this.commission.dateOuveture != null)
        this.commission.dateOuveture = new Date(data.dateOuveture).toISOString();

      if (this.commission.dateProchaineSeance != null)
        this.dateProchaineSeance = new Date(data.dateProchaineSeance).toISOString();
    });
  }
  // ==================================================================
  //
  // ==================================================================
  ShowOffreDeposee() {
    console.log(this.commission);
    this.router.navigate(["/marches/commission-edit/offres-deposees"], {
      queryParams: {
        id: this.commission.ao.id,
        typecommission: this.commission.typeCommission.id,
      },
    });
  }
  // ==================================================================
  //
  // ==================================================================
  ShowPE() {
    this.idao;

    this.service.sendData(this.idao);
    this.service.sendData(this.commission.id);
    this.router.navigate(
      ["/marches/commission-edit/participants-externes"]
    );
  }
  ShowPET() {

    this.idao;

    this.service.sendData(this.idao);
    this.service.sendData(this.commission.id);

    this.router.navigate(
      ["/marches/commission-edit/participants-externes-technique"]
    );
  }
  // ==================================================================
  //
  // ==================================================================
  ShowPI() {
    this.service.sendData(this.commission.id);

    this.service.sendData(this.idao);
    this.router.navigate(
      ["/marches/commission-edit/participants-internes"]
    );
  }

  ShowPIT() {
    this.idao
    this.service.sendData(this.commission.id);

    this.service.sendData(this.idao);
    this.router.navigate(
      ["/marches/commission-edit/participants-internes-tehnique"]
    );
  }
  // ==================================================================
  //
  // ==================================================================
  backList(id) {
    this.router.navigate(["/marches/ao-consultation-detail/commission"], {
      queryParams: { id: id },
    });
  }
  dateProchaineSeance; // Declare the property
  onSubmit(form) {

    let c = {
      dateProchaineSeance: new Date(this.dateProchaineSeance).toISOString(),
      dateOuveture: this.commission.dateOuveture,
      id: this.idcommission,
      ao: { id: this.idao },
      typeCommission: this.commission.typeCommission
    }
    this.service.sendCommission(c)
      .subscribe((res) => {
        this.router.navigate(["/marches/ao-consultation-detail/commission"], {
          queryParams: { id: this.idao },
        });
      });
  }
}
