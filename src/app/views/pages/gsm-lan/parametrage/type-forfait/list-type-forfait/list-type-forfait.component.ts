import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeForfaitService } from '../type-forfait.service';

@Component({
  selector: 'kt-list-type-forfait',
  templateUrl: './list-type-forfait.component.html',
  styleUrls: ['./list-type-forfait.component.scss']
})
export class ListTypeForfaitComponent implements OnInit {
	dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
		"label",
		"prix",
		
		"actions",
	];
  constructor(private route: ActivatedRoute,
    private service: TypeForfaitService,
    private router: Router,

  ) { }
  pageIndex
  pageSize
  ngOnInit() {
	this.route.queryParams.subscribe(params => {
		this.pageIndex = parseInt(params['pageIndex']) || 0;
		this.pageSize = +params['pageSize'] || 5; // Default page size

		const id = params['id'];
	});
    this.service.getAll().subscribe((res)=>{
      
      this.dataSource=new MatTableDataSource(res)
    })
  }
  add(): void {
		this.router.navigate(["gsmLan/add-type-forfait"]);
	}  

  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
  handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
			


			this.service.Pagination(pageIndex, pageSize).subscribe((data: any) => {

        this.dataSource=new MatTableDataSource( data.content)
				this.dataSource.data.length = data.totalElements
			});
		

	}
	edit(value): void {
		console.log(value);
		this.router.navigate(["gsmLan/add-type-forfait"], {
			queryParams: { id: value.id, pageIndex: this.pageIndex, pageSize: 5 },
		});
	}
	show(value){
		this.router.navigate(["gsmLan/show-type-forfait"], {
			queryParams: { id: value.id },
		});
	}
}
