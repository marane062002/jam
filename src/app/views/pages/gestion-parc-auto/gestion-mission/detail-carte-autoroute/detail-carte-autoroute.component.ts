import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'detail-carte-autoroute',
  templateUrl: './detail-carte-autoroute.component.html',
  styleUrls: ['./detail-carte-autoroute.component.scss']
})
export class DetailCarteAutorouteComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private router:Router) { }

  ngOnInit() {
  }

  openModalAjouterCarteJawaz(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  affectationCarteAutoroute(){
    this.router.navigateByUrl('/home/gestion-parc-auto/carte-autoroute')
    Swal.fire({
      title: 'Carte autoroute a été affecté avec succés',
      icon: 'success',
    });
  }

}
