import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
// import { SharedURLS } from "../../../../core/_base/layout/shared/shared-url";
// import { createRequestOption } from "../../../../core/request/request-util";
// import { createRequestOption } from "../../../core/request/request-util";
// import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

// getAllarticle(req?:any): Observable<any> {
//   const options = createRequestOption(req);
//   let headers = new HttpHeaders().set("content-type", "application/json").set("Access-Control-Allow-Origin", "*");
  
// return this.http.get<any[]>(SharedURLS.article+'list', { params: options, observe: "response", headers: headers })
// }


}

