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
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idao = params["id"];
    });
  }
  // ==================================================================
  //
  // ==================================================================
  idcommission;
  commission = {
    id: 0,
    typeCommission: { id: 0, libelle: "" },
    dateOuveture: null,
    ao: { id: 0 },
  };
  formDataCommssion = {
    dateOuveture: null,
    typeCommission: { id: 1, libelle: "" },
    ao: { id: 1 },
  };
  // ==================================================================
  //
  // ==================================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idcommission = params["id"];
    });
    this.service.getCommissionById(this.idcommission).subscribe((data) => {
      console.log("Commission : " + JSON.stringify(data, null, 2));
      this.commission = data;
      if (this.commission.dateOuveture != null)
        this.commission.dateOuveture = new Date(data.dateOuveture).toISOString();
    });
  }
  // ==================================================================
  //
  // ==================================================================
  ShowOffreDeposee() {
    console.log(this.commission);
    this.router.navigate(["/marches/commission-detail/offres-deposees"], {
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
    this.router.navigate(
      ["/marches/commission-detail/participants-externes"],
      { queryParams: { id: this.commission.id } }
    );
  }
  // ==================================================================
  //
  // ==================================================================
  ShowPI() {
    this.router.navigate(
      ["/marches/commission-detail/participants-internes"],
      { queryParams: { id: this.commission.id } }
    );
  }
  // ==================================================================
  //
  // ==================================================================
  backList(id) {
    this.router.navigate(["/marches/ao-detail/commission"], {
      queryParams: { id: id },
    });
  }
  onSubmit(form) {
    this.formDataCommssion.ao.id = this.idao;
    this.service.sendCommission(this.formDataCommssion)
      .subscribe((res) => {
      });
  }
}
