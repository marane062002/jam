// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	authTokenKey: "accessToken", //'authce9d77b308c149d5992a80073637e4d5'

	// ------------------------ NAIMA SAHIH-----------------
	reclamationUrl: "http://localhost:9101/Reclamation/",
	reservationUrl: "http://localhost:9101/Reservation/",
	autorisationUrl: "http://localhost:9101/Autorisation/Autorisation/",
	bienReservationUrl: "http://localhost:9101/BiensReservation/",
	espaceReservationUrl: "http://localhost:9101/EspacesReservation/",
	bienUrl: "http://localhost:9101/Autorisation/Biens/",
	espaceUrl: "http://localhost:9101/Autorisation/EspaceReservation/",
	ppsourceUrl: "http://localhost:9101/Ppsource/PPSource",
	pmsourceUrl: "http://localhost:9101/Pmsource/PMSource",
	marcheUrl: "http://localhost:9101/Marche",
	affaireConseilUrl: "http://localhost:9101/AffaireConseil/AffaireConseil/",
	// ------------------------ ADIL MOUCHTAKI-----------------
	personnelUrl: "http://localhost:9101/Personnel",
	attestationUrl: "http://localhost:9101/Attestation",
	notationUrl: "http://localhost:9101/Notation",
	permanenceUrl: "http://localhost:9101/Permanence",
	presenceUrl: "http://localhost:9101/Presence",
	userUrl: "http://localhost:9101/Users",
	organisationUrl: "http://localhost:9101/Organisation",
	patrimoineUrl: "http://localhost:9101/PC",
	immatriculationUrl: "http://localhost:9101/Immatriculation",
	biencommunalUrl: "http://localhost:9101/BC",
	projetUrl: "http://localhost:9101/Projet",

	// ------------------------ RACHID SABRI--------------------
	API_BUREAU_ORDRE_URL: "http://localhost:9101/bureau-order",
	API_IMMOBILISATION_URL: "http://localhost:9101/immobilisation",
	API_INSERT_PUB_URL: "http://localhost:9101/insertion-publicitaire",
	API_ASSOCIATION_URL: "http://localhost:9101/association",
	//==========================================
	//festivales
	BACK_URL: "http://localhost:9101/",
	//==========================================
 
	API_SUBVENTION_URL: "http://localhost:9101/subvention",
	API_CONVENTION: "http://localhost:9101/convention",
	API_PROJET_PARTENARIAT: "http://localhost:9101/projet-partenariat",
	API_ACTIVITE_URL: "http://localhost:9101/activite",
	API_LOCAUX_URL: "http://localhost:9101/locaux",
	API_INTERVENTION_URL: "http://localhost:9101/intervention-rapide",
	API_PROJET_URBANISME_URL: "http://localhost:9101/projet-urbanisme",
	API_ALFRESCO_URL: "http://localhost:9101/alfresco",
	API_BMH_URL:"http://localhost:9101/service-bmh/",
	API_SDL_URL:"http://localhost:9101/service-sdl/",
	API_PROPRETE_URL: "http://localhost:9101/service-proprete/",
	// API_URL:"http://localhost:9095/",

	SERVER_URL:"http://localhost:9101/",
	SERVER_URL_Stock:"http://localhost:9101/",
	API_MARCHEGROS:"http://localhost:9101/marche-gros/api/",
	API_ABATOIR:"http://localhost:9101/service-abattoir/api/",
	SERVER_PARC_AUTO:"http://localhost:9101/ParcAuto/",
	API_GSM_LAN: "http://localhost:9101/gsmLan",
	

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
