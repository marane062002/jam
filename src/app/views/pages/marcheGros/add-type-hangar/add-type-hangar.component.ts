import { Component, OnInit, } from '@angular/core';
import { Router } from "@angular/router";
import { HangarService } from '../Service/hangar.service';

@Component({
  selector: 'kt-add-type-Hangar',
  templateUrl: './add-type-Hangar.component.html',
  styleUrls: ['./add-type-Hangar.component.scss']
})
export class AddTypeHangarComponent implements OnInit {
  maxId: number;

  constructor(private router: Router, private hangarService: HangarService) { }

  ngOnInit() {

  }
  // onAddHangar(): void {
  //   // Fetch maxId from the API when the user clicks on the "Ajouter Hangar" button
  //   this.hangarService.getMaxId().subscribe(
  //     (res) => {
  //       this.maxId = res.body;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching max ID:', error);
  //     }
  //   );
  // }

  RetourAudiance(): void {
    this.router.navigate(["pages/Marche/list-type-Hangar"]);
  }

  onAddHangar(){
    
  }
}
