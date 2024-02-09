import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { delay } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import * as XLSX from "xlsx";
import { createRequestOption } from "../gestion-parc-auto/common/request/request-util";
import { Pageable } from "../utils/pagination/pageable";

@Injectable({
	providedIn: "root",
})
export class AoService {
	
	private baseUrl = environment.marcheUrl + "/Ao/";
	private baseUrlSeance = environment.marcheUrl + "/Seance/";
	private baseUrlPieceJointeSeance = environment.API_ALFRESCO_URL + "/PieceJointeSeance";
	// private baseUrlPjSeance = environment.marcheUrl + "/Ao/";
	private baseUrl8 = environment.marcheUrl + "/ProgrammePrevisionnel/";
	private baseUrl111 = environment.marcheUrl + "/Ao";
	private baseUrl2 = environment.marcheUrl + "/Marche/";
	private baseUrl1 = environment.API_ALFRESCO_URL + "/PjAoG";
	private baseUrl11 = environment.API_ALFRESCO_URL + "/PjImm";
	private baseUrl3 = environment.API_ALFRESCO_URL + "/PjMarche";
	private baseUrl4 = environment.API_ALFRESCO_URL + "/PjBC";
	private baseUrl5 = environment.marcheUrl + "/Config/";
	private baseUrl6 = environment.marcheUrl + "/Reports/";
	private baseUrl7 = environment.marcheUrl + "/HistoriqueCommentaire/";
	private baseUrl10 = environment.marcheUrl + "/HistoriqueAo/";
	private baseUrl12 = environment.marcheUrl + "/HistoriqueUpdateStatutToComment/";
	private baseUrl13 = environment.marcheUrl + "/HistoriqueUpdateStatutToEnAttenteValidation/";
	private baseUrl14 = environment.marcheUrl + "/HistoriqueUpdateStatutToValide/";
	private baseUrl15 = environment.marcheUrl + "/HistoriqueUpdateStatutFromValide/";
	private baseUrl16 = environment.marcheUrl + "/HistoriqueUpdateStatutMarche/";
	private baseUrl9 = environment.API_ALFRESCO_URL + "/PjCommentaire/";


	constructor(private http: HttpClient, private datePipe: DatePipe) { }
	SM: number;
	PourcentageTechnique: number;
	PourcentageFinancier: number;
	ModePassationAo: String;
	/** Print report */

	updateStatutOffer(id:number, statut:number, value){
		return this.http.post<any[]>(this.baseUrl+"updateStatutOffer/"+id+"/"+statut,value);
	}
	
	getAllByOrganisme(){
		return this.http.get<any[]>(this.baseUrl+"ao-organisme/all");
	}

	getMarcheByFilterParameters(dateDebut, dateFin, typeMarche, prestataire){
		
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("typeMarche", typeMarche);
		queryParams = queryParams.append("prestataire", prestataire);

		return this.http.get<any[]>(this.baseUrl2+"recherche", {params: queryParams});
	} 

	getAoByFilterParameters(dateDebut, dateFin, typeMarche, statut){
		  
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		queryParams = queryParams.append("typeMarche", typeMarche);
		queryParams = queryParams.append("statut", statut);

		return this.http.get<any[]>(this.baseUrl+"recherche", {params: queryParams});
	}
	async allrecherche(){
		return await this.http	.get<any>(this.baseUrl + "allrecherche")	.pipe(delay(300))	.toPromise();
	}
	getMarchePMEPeriod(dateDebut, dateFin): Observable<any>{
		
		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);

		return this.http.get<any[]>(this.baseUrl+"ao-organisme/period", {params: queryParams});
	}

	getMarchePME(): Observable<any>{
		return this.http.get<any[]>(this.baseUrl+"ao-organisme/all");
	}

	getAllTypeAoOrderedByTypeAo(): Observable<any[]>{
		return this.http.get<any[]>(this.baseUrl+"statistique");
	}

	getAllTypeAoBetweenPeriodOrderedByTypeAo(dateDebut, dateFin): Observable<any[]>{

		let queryParams = new HttpParams();
		queryParams = queryParams.append("dateDebut", dateDebut);
		queryParams = queryParams.append("dateFin", dateFin);
		
		return this.http.get<any[]>(this.baseUrl+"statistique/period", {params: queryParams});
	}

	printFile(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl6 + "generate/" + id
		);
	}

	fileGenerator(path, id, lang) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + id +"/"+ lang, httpOptions);
	}
	fileSeance(path, id) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + id, httpOptions);
	}
	fileGeneratorAVis(path, id) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + id, httpOptions);
	}
	
	bordereaufileGenerator(path, id) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + id , httpOptions);
	}

	pvCommissionfileGenerator(path, id, dest) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + id + "/" + dest, httpOptions);
	}
	
	/*
	bordereaufileGenerator(path, id, division) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + id + "/"+ division, httpOptions);
	}
	*/

	lettreMaintienGenerator(path, id, Prestataire) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path +id + "/"+ Prestataire , httpOptions);
	}

	/** generer des convocations commission Ao */
	convocationCommissionAoGenerator(path, idAo, participant, etape) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl6 + path + idAo + "/" + participant + "/"+ etape, httpOptions);
	}

	/** Formatting */
	
	getLettreMtn(mtn): Observable<any> {
		return this.http.get(
			this.baseUrl5 + "formatting/" + mtn
		);
	}
/*
	async getLettreMtn(mtn) {
		return await this.http
			.get<string>(this.baseUrl5 + "formatting/" + mtn)
			.toPromise();
	}*/

	getSeparateMillierMtn(mtn): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl5 + "separate/" + mtn
		);
	}

	/** secteurs */
	getAllSecteurs(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "AllSecteurs");
	}
	/** classes */
	getAllClasses(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "AllClasses");
	}
	/** qualification by secteur */
	getAllQualificationBySecteur(idSect): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "QualificationsBySec/" + idSect
		);
	}
	/** secteur entreprise  */
	getAllSecteurAo(idAo): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "secteurEntreprise/" + idAo
		);
	}

	getSecteurById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "showSecteurEntreprise/" + id
		);
	}

	sendSecteurEntrepriseData(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddSecteurEntreprise",
			f
		);
	}

	deleteSecteurEntrepriseById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteSecteurEntreprise/" + id);
	}
	/** Gestion des lots  */
	getAllLotMarcheByAo(idAo): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "lotMarche/" + idAo
		);
	}
	getAllLotFormByIdMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "lotFormByIdMarche/" + id
		);
	}

	getLotFormById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "showLotForm/" + id
		);
	}
	getLotMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "showLotMarche/" + id
		);
	}

	sendLotMarcheData(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddLotMarche",
			f
		);
	}
	sendLotMarcheForm(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "AddLot",
			f
		);
	}
	getAgrementMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "showAgrementMarche/" + id
		);
	}
	getAllAgrementMarche(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllAgrementMarche" );
	}
	sendAgrementData(f): Observable<any> {		
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddAgrementMarche",
			f
		);
	}
	editAgrementData(f): Observable<any> {
		
		return this.http.put<Observable<any>>(
			this.baseUrl + "UpdateAgrementMarche",f
		);
	}
	deleteAgrementMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteAgrementMarche/" + id);
	}

	getAllAgrementMarcheByAo(idAo): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AgrementMarche/" + idAo
		);
	}

	deleteLotMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteLotMarche/" + id);
	}
	deleteLotFormById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteLotForm/" + id);
	}

	
	/******************************************************/
	getAllNatureAo(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "AllNatureAo");
	}
	getAllTypeMarche(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "AllTypeMarche");
	}
	getAllTypeCommission(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllTypeCommission"
		);
	}
	getAllRoleCommission(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllRoleCommission"
		);
	}
	// get commision by id
	getRoleCommissionById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "RoleCommissionById/" + id
		);
	}

	// liste types et sous type prestation
	getAllTypePrestationAo(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllTypePrestationAo"
		);
	}
	getAllSoustypePresattaionAo(idType): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllSousTypePrestationAo/" + idType
		);
	}
	/* getAllAo(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'All');
  }*/

	async getAllAoData() {
		return await this.http
			.get<any>(this.baseUrl + "index")
			.pipe(delay(300))
			.toPromise();
	}
	async findAllByDivision(division:number) {
		return await this.http.get<any>(this.baseUrl + "All/division/"+division)
			.pipe(delay(300))
			.toPromise();
	}
	//==================================================================================================================================================================================================================
	async findAllByParam(createurUser:string) {
		return await this.http.get<any>(this.baseUrl + "All/sl/"+createurUser)
			.pipe(delay(300))
			.toPromise();
	}
		//==================================================================================================================================================================================================================

	async findAllByPages() {

		return await this.http.get<any>(this.baseUrl + "All-Pages")
			.pipe(delay(300))
			.toPromise();
	}
	async findAllByPagesByEtatCommentaire(etatCommentaire) {

		return await this.http.get<any>(this.baseUrl + "findByEtatCommentaireOrderByIdDesc/"+etatCommentaire)
			.pipe(delay(300))
			.toPromise();
	}
	async findByStatutAoValideOrderByIdDesc(statut) {

		return await this.http.get<any>(this.baseUrl + "findByStatutAoValideOrderByIdDesc/"+statut)
			.pipe(delay(300))
			.toPromise();
	}
	async findByAo_IdOrderByIdDesc(id) {

		return await this.http.get<any>(this.baseUrl7 + "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}
	async findHistoriqueAoByAo_Id(id) {

		return await this.http.get<any>(this.baseUrl10 + "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}
	async findHistoriqueUpdateStatutToCommentByAo_Id(id) {

		return await this.http.get<any>(this.baseUrl12 + "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}
	async findHistoriqueUpdateStatutToEnAttenteValidationByAo_Id(id) {

		return await this.http.get<any>(this.baseUrl13 + "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}
	async findHistoriqueUpdateStatutToValideByAo_Id(id) {

		return await this.http.get<any>(this.baseUrl14 + "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}

	async findHistoriqueUpdateStatutFromValideByAo_Id(id) {

		return await this.http.get<any>(this.baseUrl15 + "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}async findHistoriqueUpdateStatutMarcheByAo_Id(id) {

		return await this.http.get<any>(this.baseUrl16+ "findByAo_IdOrderByIdDesc/"+id)
			.pipe(delay(300))
			.toPromise();
	}
	async findPjByCommentaire_Id(id) {

		return await this.http.get<any>(this.baseUrl9 + "AllpjsByIdCommentaire/"+id)
			.pipe(delay(300))
			.toPromise();
	}
	async findAoByDateOuverturePlisOrderByIdDesc(dateOuverturePlis) {

		return await this.http.get<any>(this.baseUrl + "findAoByDateOuverturePlisOrderByIdDesc/"+dateOuverturePlis)
			.pipe(delay(300))
			.toPromise();
	}

	//==================================================================================================================================================================================================================
	private usertest:BehaviorSubject<any> = new BehaviorSubject<any>({});
	userValuetest: Observable<any> = this.usertest.asObservable();
	getUser(){
		this.usertest
		this.userValuetest
		
		return this.userValuetest;
	  }
	async findAllByStatus(status:number) {
		return await this.http.get<any>(this.baseUrl + "All/Status/"+status)
			.pipe(delay(300))
			.toPromise();
	}
	async getAllAo() {
		return await this.http
			.get<any>(this.baseUrl + "All")
			.pipe(delay(300))
			.toPromise();
	}

	// maintienOffre modified on 27.11.2020
	async getMaintienOffre() {
		return await this.http
			.get<any>(this.baseUrl + "maintienOffre")
			.pipe(delay(300))
			.toPromise();
	}

	getAllPjAo(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/Allpjs/" + id);
	}
	getAllPjImm(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl11 + "/Allpjs/" + id);
	}

	//********************************************* */

	updloadFile(v, id, type): Observable<any> {
		console.log("taille de fichier  :" + v.length);
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		formda.append("type", type);
		console.log("id  :" + id + " / type : " + type);
		return this.http.post<any>(this.baseUrl3 + "/multiplefile", formda, { responseType: 'blob' as 'json' });
	}

	// get all files marché par type file
	getByIdFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl3 + "/allById/" + f);
	}

	deletefiles(url, id: number): Observable<any> {
		return this.http.delete<any>(this.baseUrl3 + url + id);
	}

	//********************** PJ BC*********************** */

	updloadBCFile(v, id, type,Label): Observable<any> {
		console.log("taille de fichier  :" + v.length);
		const formda: FormData = new FormData();
		for (var i = 0; i < v.length; i++) {
			formda.append("file", v[i]);
		}
		formda.append("id", id);
		formda.append("type", type);
		formda.append("Label", Label);

		console.log("id  :" + id + " / type : " + type);
		return this.http.post<any>(this.baseUrl4 + "/multiplefile", formda, { responseType: 'blob' as 'json' });
	}
	
	// get all files marché par type file
	getByIdBCFiles(f): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl4 + "/allById/" + f);
	}

	deleteBCfiles(id: number): Observable<any> {
		return this.http.delete<any>(this.baseUrl4 + "/" + id);
	}
	// *********************************************

	getAoById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "show/" + id);
	}


	existsByAo_Id(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrlSeance + "existsByAo_Id/" + id);
	}

	createSeance(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrlSeance + "create", f);
	}
	findSeance(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrlSeance + "findBy_Id/"+id);
	}
	private dataSubject = new BehaviorSubject<any>(null);
	data$ = this.dataSubject.asObservable();
  
	sendData(data: any) {
	  this.dataSubject.next(data);
	}

	findByAo_Id(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrlSeance + "findByAo_Id/"+id);
	}
	findByAo_Id_And_EtatSeance(id,etatSeance): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrlSeance + "findByIdAoAndEtatSeance/"+id+'/'+etatSeance);
	}
	findAllSeance(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrlSeance + "findAll");
	}
	updateStautswithMotif(id,motif): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "show/" + id+"/"+motif ,{responseType: 'text' as 'json'});
	}
	// delete ao by id
	deleteAoById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteAO/" + id);
	}

	getCommissionById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "showCommission/" + id
		);
	}

	async getPEbyAo(id) {
		return await this.http
			.get<any>(this.baseUrl + "ParticipantExterneByAo/" + id)
			.toPromise();
	}

	async getPIbyAo(id) {
		return this.http
			.get<any>(this.baseUrl + "ParticipantInterneByAo/" + id)
			.toPromise();
	}

	getBPById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "BPByAo/" + id);
	}

	getPjCps(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "BPByAo/" + id);
	}

	getPjRc(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "BPByAo/" + id);
	}

	getAllLigneBP(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "LigneByBP/" + id);
	}

	//showLigneBP by id lbp
	getLigneBPById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "showLigneBP/" + id
		);
	}

	// delete ligneBP by id
	deleteLigneBPById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteLigneBP/" + id);
	}

	getAllReserveDg(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllReserveDg/" + id
		);
	}

	getAllReserveDgService(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllReserveDgService/" + id
		);
	}

	getAllReserveTresorerie(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllReserveTresorerie/" + id
		);
	}

	getAllCommissionByAo(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllCommissions/" + id
		);
	}

	//===================| PRESTATAIRES |===================

	getAllPrestataires(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllPrestataires/" + id
		);
	}

	getAllPrestatairesAll(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "AllPrestataires");
	}

	getPrestataireById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "Prestataire/" + id
		);
	}

	sendMarcheDocPrestataire(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "addDocPrestataireMarche",
			f
		);
	}

	sendReservePrestataire(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddPrestataire",
			f
		);
	}

	updatePrestataire(data): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "updatePrestataire",
			data
		);
	}

	//===================| OFFRE DEPOSEE |===================

	getAllOffreDeposee(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllOffreDeposee/" + id
		);
	}

	getAllOffreDeposeeEvalAdmin(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllOffreDeposeeEvaluationAdmin/" + id
		);
	}
	findByStatut_IdAndAo_Id(idStatut,idAo): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "findByStatut_IdAndAo_Id/" + idStatut+'/'+idAo
		);
	}
	getAllOffreDeposeeEvalTechnique(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllOffreDeposeeEvaluationTechnique/" + id
		);
	}

	getAllOffreDeposeeEvalFinanciere(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllOffreDeposeeEvaluationFinanciere/" + id
		);
	}

	getAllOffreDeposeeEvalFinale(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllOffreDeposeeEvaluationFinale/" + id
		);
	}

	getOffreDeposeeAdjucataire(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "OffreDeposeeAdjucataire/" + id
		);
	}

	getOffresDeposeeNonAdjucataire(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "OffresDeposeesNonAdjucataires/" + id
		);
	}

	OffreById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl + "OffreById/" + id);
	}

	OffreByIdPrestataire(id,idAo): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "OffreByIdPrestataire/" + id + "/" + idAo
		);
	}

	VisiteByAo(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "VisiteByAo/" + id
		);
	}

	getAllVisiteByAo(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "AllVisitesByIdAo/" + id
		);
	}

	sendOffreDeposee(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddOffreDeposee",
			f
		);
	}

	deleteOffreDeposee(id: number): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteOffreDeposee/" + id);
	}

	sendOffreDeposeeAdj(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddOffreDeposeeAdj",
			f
		);
	}
	//========================================================================
	// Echantillon services
	//========================================================================
	getEchantillonById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "EchantillonById/" + id
		);
	}

	sendEchantillon(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddEchantillon",
			f
		);
	}

	sendLigneEchantillon(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddLigneEchantillon",
			f
		);
	}

	getEchantillon(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "EchantillonByAo/" + id
		);
	}

	getLignesEchantillon(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "LignesByEchantillon/" + id
		);
	}

	getLignesEchantillonById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "LignesEchantillonById/" + id
		);
	}

	// delete ech by id
	deleteEchantillonById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteEchantillonByAo/" + id);
	}

	//========================================================================
	// Ligne Echantillon services
	//========================================================================

	// delete ligneEchantillon by idEch
	deleteByEchantillonId(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteByEchantillonId/" + id);
	}

	// delete ligneEchantillon by id
	deleteLigneEchantillonById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteLigneEchantillon/" + id);
	}

	nouvellepj(v, id, typeS, sModule,Label) {
		if (v.length != 0) {
			const formda: FormData = new FormData();
			
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
			formda.append("id", id);
			formda.append("type", typeS);
			formda.append("sModule", sModule);
			 formda.append("Label", Label);
			 
			return this.http.post<any>(
				this.baseUrl1 + "/multiplefileupload",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}
deletePj(id){
	return this.http.delete<any>(this.baseUrl1 + "/" + id);

}
	nouvellepjSeance(v, id, typeS, sModule) {
		if (v.length != 0) {
			const formda: FormData = new FormData();
			
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
			formda.append("id", id);
			formda.append("type", typeS);
			formda.append("sModule", sModule);
			 
			return this.http.post<any>(
				this.baseUrlPieceJointeSeance + "/multiplefileuploadSeance",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}	
	nouvellepjCommentaire(v, id, sModule) {
		if (v.length != 0) {
			const formda: FormData = new FormData();
			
			for (var i = 0; i < v.length; i++) {
				//console.log("File service : " + v[i]);
				formda.append("file", v[i]);
			}
			formda.append("id", id);
			formda.append("sModule", sModule);
			 
			return this.http.post<any>(
				this.baseUrl9 + "multiplefileuploadCommentaire",
				formda, { responseType: 'blob' as 'json' }
			);
		}
	}
	getAllPjSeance(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrlPieceJointeSeance + "/Allpjs/" + id);
	}
	// get all files
	getFilesByIdAndSMOdule(f, s): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/allFiles/" + f + "/" + s);
	}

	sendao(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "createAo", f);
	}
	addProgrammePrevisionnel(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl8 + "Add", f);
	}

	getProgrammePrevisionnelByTypePrestation(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl8 + "findByTypePrestation_IdOrderByIdDesc/"+id);
	}
	getProgrammePrevisionnelById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl8 + "findById/"+id);
	}

	
	researchProgrammePrevisionnel(page, size, searchDto: any) {
		return this.http.post<any[]>(this.baseUrl8 + "?page=" + page + "&size=" + size, searchDto);
	}
	
	allPresident() {
		return this.http.get<any[]>(this.baseUrl8 + "getAllPresident");
	}
	getAllProgrammePrevisionnel(pageable: Pageable) {
		let path = this.baseUrl8 + 'findAll' 
			+ '?page=' + pageable.pageNumber
			+ '&size=' + pageable.pageSize
			+ '&sort=id,desc'
			
		return this.http.get<any>(path);
	}
	createHistoriqueCommentaire(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl7 + "create", f);
	}
	createHistoriqueAo(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl10 + "create", f);
	}

	createHistoriqueUpdateStatutToComment(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl12 + "create", f);
	}
	createHistoriqueUpdateStatutToEnAttenteValidation(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl13 + "create", f);
	}
	createHistoriqueUpdateStatutToValide(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl14 + "create", f);
	}
	createHistoriqueUpdateStatutFromValide(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl15 + "create", f);
	}
	createHistoriqueUpdateStatutMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl16 + "create", f);
	}
	updateao(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl + "updateAo", f);
	}

	patchAo(f): Observable<any> {
		return this.http.patch<Observable<any>>(this.baseUrl + "patchAo", f);
	}
	
	updateAoSG(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "updateAoSG", f);
	}

	updateAoSM(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "updateAoSM", f);
	}

	updateAoDg(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "updateAodg", f);
	}

	updateAoTresorerie(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "updateAotresorerie",
			f
		);
	}

	updateStatutAo(obj: any): Observable<any> {
		return this.http.put<any>(this.baseUrl + "updateStatutAo/" + obj.id, obj);
	}
	updateStatutAoValide(obj: any): Observable<any> {
		return this.http.put<any>(this.baseUrl + "updateStatutAoValide/" + obj.id, obj);
	}

	updateStatutMarche(obj: any): Observable<any> {
		return this.http.put<any>(this.baseUrl2 + "updateStatutMarche/" + obj.id, obj);
	}
	/*
	updateStatutAo(f): Observable<any> {
		return this.http.put<Observable<any>>(this.baseUrl + "updateStatutAo", f);
	}
	*/
	//========================================================================
	// visite services
	//========================================================================
	sendvisite(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "AddVisite", f);
	}
	// delete visite by id
	deleteVisiteById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl + "DeleteVisite/" + id);
	}
	//get visite by id
	getVisiteById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl + "showVisite/" + id
		);
	}
	//========================================================================
	// Bordereau de prix services
	//========================================================================
	sendBP(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "AddBP", f);
	}
	//========================================================================
	// Commissions services
	//========================================================================
	sendCommission(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddCommission",
			f
		);
	}
	sendPICommission(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddParticipantsInterneCommission",
			f
		);
	}
	sendPECommission(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddParticipantsExterneCommission",
			f
		);
	}
	//========================================================================
	// Personne externe services
	//========================================================================
	sendPE(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddPersonneExterne",
			f
		);
	}
	//========================================================================
	// Validation DG services
	//========================================================================
	sendReserveDg(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddRerserveDg",
			f
		);
	}
	//========================================================================
	// Validation service services
	//========================================================================
	sendReserveDgService(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddRerserveDgService",
			f
		);
	}
	//========================================================================
	// Validation tresorier services
	//========================================================================
	sendRerserveTresorerie(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl + "AddRerserveTresorerie",
			f
		);
	}
	//========================================================================
	// Ligne bordereau de prix services
	//========================================================================
	sendLigneBP(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl + "AddLigneBP", f);
	}
	//========================================================================
	// Gestion pjs AO services
	//========================================================================
	nouvellepjCps(v, id) {
		const formda: FormData = new FormData();
		formda.append("file", v[0]);
		formda.append("id", id);
		return this.http.post<Observable<any>>(
			this.baseUrl1 + "/file/cpsAo",
			formda
		);
	}

	nouvellepjRc(v, id) {
		const formda: FormData = new FormData();
		formda.append("file", v[0]);
		formda.append("id", id);
		return this.http.post<Observable<any>>(
			this.baseUrl1 + "/file/rcAo",
			formda
		);
	}
	//========================================================================
	// Marche services
	//========================================================================
	async getAllMarche() {
		return await this.http
			.get<any>(this.baseUrl2 + "All")
			.pipe(delay(300))
			.toPromise();
	}

	async getAllAttributeurs() {
		return await this.http
			.get<any>(this.baseUrl2 + "Attributeurs")
			.toPromise();
	}


	getMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl2 + "show/" + id);
	}

	getAllModePassationMarche(): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllModePassationMarche"
		);
	}

	// delete phase marche by id 
	deleteMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteMarche/" + id);
	}
	// PHASE MARCHE ********************************

	getAllPhasesMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllPhasesMarche/" + id
		);
	}

	getPhaseMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "PhaseMarcheById/" + id
		);
	}

	sendPhaseMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl2 + "Phase", f);
	}

	// delete phase marche by id 
	deletePhaseMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeletePhaseMarche/" + id);
	}

	// FACTURE PHASE MARCHE ****************************

	getAllPhaseNotFacture(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllPhaseNotFacture/" + id
		);
	}

	getAllPhaseNotOS(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllPhaseNotOS/" + id
		);
	}

	getAllPhaseNotReception(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllPhaseNotReception/" + id
		);
	}

	// ORDRE SERVICE MARCHE ******************************

	getOrdreServiceMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreServiceMarche/" + id
		);
	}

	getAllOrdreServicePhase(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllOrdreServicePhase/" + id
		);
	}

	getOrdreServiceById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreServiceMarcheById/" + id
		);
	}

	// delete ordre service marche by id 
	deleteOrdreServiceMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteOrdreServiceMarche/" + id);
	}

	// **********| RECEPTION MARCHE |*******************
	// Param :: id marche
	getReceptionMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "ReceptionMarche/" + id
		);
	}
	// Param : id reception
	getReceptionMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "ReceptionMarcheById/" + id
		);
	}

	sendReceptionMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "ReceptionMarche",
			f
		);
	}

	// delete reception marche by id 
	deleteReceptionMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteReceptionMarche/" + id);
	}

	// **********| RECEPTION PHASE MARCHE | **************
	// Param :: id phase marche
	getAllReceptionsPhaseMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "ReceptionPhaseMarche/" + id
		);
	}

	// Param :: id reception phase marche
	getReceptionsPhaseMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "ReceptionPhaseMarcheById/" + id
		);
	}

	// delete reception phase marche by id 
	deleteReceptionPhaseMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteReceptionPhaseMarche/" + id);
	}

	// **********| MISE EN DEMEURE & RESILIATION MARCHE |*******************
	getMiseEnDemeureEtResiliation(id, type): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "MiseEnDemeureResiliation/" + id + "&" + type
		);
	}

	getMiseEnDemeureEtResiliationById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "MiseEnDemeureResiliationById/" + id
		);
	}

	sendMiseEnDemeureEtResiliation(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "MiseEnDemeureResiliation",
			f
		);
	}

	deleteMiseEnDemeureEtResiliation(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteMiseEnDemeureResiliation/" + id);
	}
	// **********| AMT / Travaux Supplementaires |*******************
	// Param :: id marche
	getAllTravauxSuppMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "TravauxSupp/" + id
		);
	}
	// Param : id travauxSupp
	getTravauxSuppMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "TravauxSuppById/" + id
		);
	}

	sendTravauxSuppMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "TravauxSupp",
			f
		);
	}

	// delete methode 
	deleteTravauxSuppMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteTravauxSupp/" + id);
	}
	// **********| penalites pour retard & interets moratoires |***************

	// Param :: id marche
	getAllModuleMarche(id, path): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + path + id
		);
	}
	// Param : id Module
	getModuleMarcheById(id, path): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + path + id
		);
	}

	sendModuleMarche(f, path): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + path, f
		);
	}

	// delete methode 
	deleteModuleMarcheById(id, path): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + path + id);
	}

	// --------------------------------------------
	sendReceptionPhase(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "ReceptionPhaseMarche",
			f
		);
	}
	// ***************************************************
	getAllComiteMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllComiteMarche/" + id
		);
	}

	deleteComiteMarche(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteComiteMarche/" + id);
	}

	getAllFacture(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllFacture/" + id
		);
	}

	getAllLivrable(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllLivrable/" + id
		);
	}

	getAlltypePjAo(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl1 + "/AlltypePjAo");
	}
	getAlltypePJIMM(): Observable<any> {
		return this.http.get<Observable<any>>(this.baseUrl11 + "/Alltype");
	}
	sendMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "addMarcheFromAo",
			f
		);
	}

	updateMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "updateMarcheFromAo",
			f
		);
	}

	updateMntEngageMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "updateMntEngageMarche",
			f
		);
	}

	engagerMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "engagerMarche",
			f
		);
	}

	approuverMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "approuverMarche",
			f
		);
	}
	CreateMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "create",
			f
		);
	}
	EditMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "edit",
			f
		);
	}
	findMarcheByAo_Id(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "findByAo_Id/"+id
		);
	}
	sendOrdreServiceMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "OrdreServiceMarche",
			f
		);
	}
	// ORDRE SERVICE PHASE MARCHE *************************

	sendOrdreServicePhase(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "OrdreServicePhase",
			f
		);
	}

	getOrdreServicePhaseMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreServicePhaseById/" + id
		);
	}

	// delete ordre service phase marche by id 
	deleteOrdreServicePhaseMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteOrdreServicePhase/" + id);
	}

	sendComiteMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "ComiteMarche",
			f
		);
	}
	// ==================================================
	// order d'arret
	// ==================================================


	getAllOrdreArretMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "AllOrdreArretMarche/" + id
		);
	}

	getListOrdreArretMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreArretMarcheList/" + id
		);
	}

	getOrdreArretMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreArretMarcheById/" + id
		);
	}

	getOrdreArretMarche(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreArretMarche/" + id
		);
	}

	getOrdreArretByIdOR(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreArretByIdOrdreReprise/" + id
		);
	}

	sendOrdreArretMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl2 + "OrdreArret", f);
	}

	sendOrdreArretRMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "OrdreArretR",
			f
		);
	}

	// delete ordre arrêt by id 
	deleteOrderArretById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteOrdreArret/" + id);
	}
	// ================================================
	// get ordre reprise 28.12.2020
	getOrdreRepriseMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "OrdreReprise/" + id
		);
	}

	sendOrdreRepriseMarche(f): Observable<any> {
		return this.http.post<Observable<any>>(
			this.baseUrl2 + "OrdreReprise",
			f
		);
	}

	// delete ordre reprise by id 
	deleteOrderRepriseById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteOrdreReprise/" + id);
	}
	// ++++++++++++++++ DECOMPTE PHASE MARCHE +++++++++++++++++
	sendFacture(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl2 + "Facture", f);
	}
	// +++++++++++++++++ DECOMPTE DEFINITIF +++++++++++++++++++
	sendDecompteDefinitif(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl2 + "DecompteDefinitif", f);
	}

	getDecompteById(id, isDefinitif): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "DecompteDefinitif/" + id + "/" + isDefinitif
		);
	}

	showDecompteById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "DecompteDefinitifById/" + id
		);
	}

	deleteDecompteById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteDecompteDefinitif/" + id);
	}

	// +++++++++++++++++ LIVRABLE +++++++++++++++++++++++++++++
	sendLivrable(f): Observable<any> {
		return this.http.post<Observable<any>>(this.baseUrl2 + "Livrable", f);
	}

	getLivrablePhaseMarcheById(id): Observable<any> {
		return this.http.get<Observable<any>>(
			this.baseUrl2 + "LivrableById/" + id
		);
	}

	// delete livrable phase marche by id 
	deleteDeleteLivrablePhaseMarcheById(id): Observable<any> {
		return this.http.delete<any>(this.baseUrl2 + "DeleteLivrable/" + id);
	}

	PrintGenerator(path, id) {
		const httpOptions = {
			responseType: "arraybuffer" as "json",
		};
		return this.http.get<any[]>(this.baseUrl + path + id, httpOptions);
	}
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// SEARCHE MANDAT BETWEEN DATES
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	getAoBetweenDates(d1, d2): Observable<any> {
		return this.http.get<any>(
			this.baseUrl + "date/" + d1 + "&" + d2
		);
	}

	// options file
	getFileName(file: any) {
		if (file.lastIndexOf(".") != -1 && file.lastIndexOf(".") != 0)
			return file.substring(0, file.lastIndexOf("."));
	}
	// extrension file
	getExtensionFile(file: any) {
		if (file.lastIndexOf(".") != -1 && file.lastIndexOf(".") != 0) {
			var ext = file.substring(file.lastIndexOf(".") + 1);
			switch (ext) {
				case 'txt':
					return 'txt.svg';
				case 'pdf':
					return 'pdf.svg';
				case 'jpg':
					return 'jpg.svg';
				case 'png':
					return 'png.svg';
				case 'doc':
					return 'doc.svg';
				case 'docx':
					return 'doc.svg';
				case 'xls':
					return 'xls.svg';
				case 'xlsx':
					return 'xls.svg';
				case 'ppt':
					return 'ppt.svg';
				case 'pptx':
					return 'ppt.svg';
				case 'csv':
					return 'csv.svg';
				case 'xml':
					return 'xml.svg';
				case 'zip':
					return 'zip.svg';
				case 'rar':
					return 'zip.svg';
				case 'html':
					return 'html.svg';
				default:
					return 'file.svg';
			}
		}
		else return "";
	}

		// export data as excel file
		exportToExcel(tableId: string, name?: string) {
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
			//let timeSpans = new Date().toISOString();
			let prefix = name;
			let fileName = `${prefix}-${timeSpan}`;
			let targetTableElm = document.getElementById(tableId);
			let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
			XLSX.writeFile(wb, `${fileName}.xlsx`);
		}


		generatePvreceptionDefinitive(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generatePvreceptionDefinitive/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}
	

		generatePvreceptionProvisoire(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generatePvreceptionProvisoire/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}
	
		generateOrdreArret(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateOrdreArret/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}

		generateOrdreReprise(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateOrdreReprise/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}

		
		generateMiseEnDemeure(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateMiseEnDemeure/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}

		generateDecisionAugmentation(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateDecisionAugmentation/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}
		
		generateAvenant(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateAvenant/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}
		
		
		generateCertifAvenant(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateCertifAvenant/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}

			
		generateResiliation(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateResiliation/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}


		generateOrdreRecette(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateOrdreRecette/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}
		
		generateOrdreService(id): Observable<any> {
			return this.http.get<Observable<any>>(
				this.baseUrl6 + "generateOrdreService/" + id,{
					responseType :'arraybuffer' as 'json'
				}
			);
		}

		updateStatut(id, value:any): Observable<any> {
			return this.http.post<Observable<any>>(this.baseUrl + "updateStatutAo/" + id,value);
		}
		updateStatutVersEnAttenteValidation(id): Observable<any> {
			return this.http.put<Observable<any>>(this.baseUrl + "updateStatutVersEnAttenteValidation/"+id ,{
				responseType :'arraybuffer' as 'json'
			});
		}
		updateVisaPresident(id, value:any): Observable<any> {
			return this.http.post<Observable<any>>(this.baseUrl + "updateVisaPresident/" + id,value);
		}
		updateCommentaire(id, value:any): Observable<any> {
			return this.http.post<Observable<any>>(this.baseUrl + "updateCommentaire/" + id,value);
		}
		updateVisaDGS(id, value:any): Observable<any> {
			return this.http.post<Observable<any>>(this.baseUrl + "updateVisaDGS/" + id,value);
		}
		updateVisaTresorie(id, value:any): Observable<any> {
			return this.http.post<Observable<any>>(this.baseUrl + "updateVisaTresorie/" + id,value);
		}
		allStatus():Observable<any[]> {
			return this.http.get<any[]>(this.baseUrl + "allStatus");
		}

		// *************************** statistique marche 
        // ******************** data ****************************

		getDataMarchedatediffOvPlisAndApprovation() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/diffDate");
		}
		getDataMarchebyPeriode(dateDebut:string, dateFin:string) :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/" +dateDebut+"&"+dateFin);
		}
	
		getDataMarchebyPeriodeAndType(dateDebut:string, dateFin:string,type:any[]) :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/"+type+"/" +dateDebut+"&"+dateFin);
		}
		getDataMarcheByPenaliteAndMoratoires() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/PenaliteAndmoratoire");
		}
		getDataMarcheByretard() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/retard");
		}
		getDataMarcheByRetardMois() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/retardMois");
		}
		getDataMarcheByPenalite() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/Penalite");
		}
		getDataMarcheBymoratoire() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "data/moratoire");
		}
		//***************************** statistique ************************* */
		 getStatMarchebyPeriode(dateDebut:string, dateFin:string) :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "stats/" +dateDebut+"&"+dateFin);
		}
		getStatMarchebyPeriodeAndType(dateDebut:string, dateFin:string,type:any[]) :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "stats/"+type+"/" +dateDebut+"&"+dateFin);
		}
		getStatMarcheByPenaliteAndMoratoires() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "stats/PenaliteAndmoratoire");
		}
		getStatMarcheByretard() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "stats/retard");
		}
		getStatMarcheByRetardMois() :Observable<any> {
			return this.http.get<Observable<any>>(this.baseUrl2 + "stats/retardMois");
		}
     ///**************************  envoie alert ************************* */
		alertCommision(){
			return this.http.get<Observable<any>>(this.baseUrl+ "alertCommision");
		}
		alertMaintien(){
			return this.http.get<Observable<any>>(this.baseUrl+ "alertMaintien");
		}
		deleteAlertCommision(id:number){
			return this.http.get<Observable<any>>(this.baseUrl+ "deletealertCommision/"+id);
		}
		deletealertMaintien(id:number){
			return this.http.get<Observable<any>>(this.baseUrl+ "deletealertMaintien/"+id);
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
		

		   deleteByIdFiles(f): Observable<any> {
			return this.http.delete<Observable<any>>(this.baseUrl1 + "/" + f);
		}


		research(page, size, searchDto: any) {
			return this.http.post<any[]>(this.baseUrl111 + "?page=" + page + "&size=" + size, searchDto);
		}
		Pagination(page, size) {
			return this.http.get<any[]>(this.baseUrl + "All-Pages?page=" + page + "&size=" + size);
		}
}
