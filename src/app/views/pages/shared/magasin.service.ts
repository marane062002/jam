import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class mgService {
	
	private baseUrl = environment.biencommunalUrl + "/MarcheMagasinController/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjMagasin";

    constructor(private http: HttpClient) { }
    save(convention:any){
		return this.http.post<any[]>(this.baseUrl+"magasins/new",convention, {responseType: 'text' as 'json'});
	}
	
	all( id){
		return this.http.get<any[]>(this.baseUrl+"magasins/"+id);
	}
    findById(id:number){
		return this.http.get<any[]>(this.baseUrl+"magasins/marche/"+id);
	}
	delete(id){
		return this.http.delete(this.baseUrl+"magasins/delete/"+id,{responseType: 'text' as 'json'});
	}

	findOneById(id:number,id2:number){
		return this.http.get<any[]>(this.baseUrl+"magasin/marche/"+id+"/"+id2);
	}

	nouvellepj(v, id, sModule) {
		if (v.length != 0) {
			const formda: FormData = new FormData();
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
			formda.append("id", id);
			formda.append("sModule", sModule);
			return this.http.post<any>(this.baseUrl1 + "/multiplefileupload",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}

	deleteByIdFiles(f): Observable<any> {
		return this.http.delete<Observable<any>>(this.baseUrl1 + "/" + f);
	}

	getAllPjImm(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + id);
	}

	downoldFile(alfresco_id,a){
		const pattern1 = /pdf$/i;
		const pattern2 = /png$/i;
		const pattern3 = /xlsx$/i;
		const pattern4 = /docx$/i;
		const pattern5 = /jpeg$/i;
		const pattern6 = /csv$/i;
		const options = {
		   
		   responseType: 'arraybuffer' as 'json'
		 }; 
	   
		 this.http.get(this.baseUrl1+'/'+alfresco_id, options)
		   .subscribe((data: any) => {
			if (pattern1.test(a)) {
				const blob = new Blob([data], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if (pattern2.test(a)) {
				const blob = new Blob([data], { type: 'image/png' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern3.test(a)){
				const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern4.test(a)){
				const blob = new Blob([data], { type: 'application/msword' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern5.test(a)){
				const blob = new Blob([data], { type: 'image/jpeg' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
			if(pattern6.test(a)){

				const blob = new Blob([data], { type: 'text/csv' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			}
		   });
	   }


	   /* downoldFile(alfresco_id, a) {
		const options = {

			responseType: 'arraybuffer' as 'json'
		};
		this.http.get(this.baseUrl1 + '/' + alfresco_id, options)
			.subscribe((data: any) => {
				if (a == 'pdf.svg') {
					const blob = new Blob([data], { type: 'application/pdf' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				else if (a == 'png.svg') {
					const blob = new Blob([data], { type: 'image/png' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if(a=='xls.svg'){
					const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if(a=='doc.svg'){
					const blob = new Blob([data], { type: 'application/msword' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
			    if(a=='jpg.svg'){					const blob = new Blob([data], { type: 'image/jpeg' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				if(a=='csv.svg'){
					const blob = new Blob([data], { type: 'text/csv' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				}
				
			});
	} */
}