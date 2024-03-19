export class MenuConfig {
	public defaults: any = {
		// ******************************************************************
		//  MENU ADIL
		// ******************************************************************
		header: {
			self: {},
			items: [
				{
					title: "roles",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.ROLES",
					permission: "accessToRoleModule",
					submenu: [
						{
							title: "Liste des roles",
							translate: "MENU.LISTEROLES",
							page: "/user/role-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexRole",
						},
						{
							title: "ajouter un role",
							translate: "MENU.AJOUTERROLE",
							page: "/user/role-new",
							icon: "flaticon-edit-1",
							permission: "canCreateRole",
						},
					],
				},
				{
					title: "users",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.USERS",
					permission: "accessToUserModule",
					submenu: [
						{
							title: "Liste des utilisateurs",
							translate: "MENU.LISTEUSERS",
							page: "/user/user-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexUser",
						},
						{
							title: "ajouter un utilisateur",
							translate: "MENU.AJOUTERUSER",
							page: "/user/user-new",
							icon: "flaticon-edit-1",
							permission: "canCreateUser",
						},
					],
				},
			],
		},



		// header_gestionStock: {
		// 	self: {},
		// 	items: [

		// 		{
		// 			title: "Liste des artilcle",
		// 			root: true,
		// 			alignment: "left",
		// 			toggle: "hover",
		// 			translate: "MENU.Article",
		// 			submenu: [
		// 				{
		// 					title: "Liste des artilcle",
		// 					translate: "MENU.Article",
		// 					page: "/stock/list-article",
		// 					icon: "flaticon-file",
		// 				}

		// 			],
		// 		}



		// 	],

		// },
		header_gestionStock: {
			self: {},
			items: [
				{
					title: "Liste des artilcle",
					translate: "MENU.Article",
					submenu: [
						{
							title: "Liste des artilcle",
							translate: "MENU.Article",
							page: "/stock/list-article",
							icon: "flaticon-file",
						},
						{
							title: "ajouter demande",
							translate: "MENU.vignette",
							page: "/stock/list-vignette",
							icon: "flaticon-speech-bubble",
						},
					],
				},
				// {
				// 	title: "Gestion des commandes",
				// 	translate: "MENU.gestionDemande",
				// 	icon: "flaticon-business",
				// 	submenu: [
				// 		{
				// 			title: "ajouter demande",
				// 			translate: "MENU.AjouterDemande",
				// 			page: "/gestionStock/ajouter-demande",
				// 			icon: "flaticon-book",
				// 		},
				// 		{
				// 			title: "valider demande",
				// 			translate: "MENU.ValiderDemande",
				// 			page: "/gestionStock/valider-demande",
				// 			icon: "flaticon-tool",
				// 		}

				// 	],
				// },
				{
					title: "Gestion des commandes",
					translate: "MENU.gestionDemande",
					icon: "flaticon-business",
					submenu: [
						{
							title: "ajouter demande",
							translate: "MENU.AjouterDemande",
							page: "/stock/ajouter-demande",
							icon: "flaticon-book",
						},
						{
							title: "valider demande",
							translate: "MENU.ValiderDemande",
							page: "/stock/valider-demande",
							icon: "flaticon-tool",
						},
					],
				},

				{
					title: "gestion des stock",
					translate: "MENU.Stock",
					icon: "flaticon-business",
					submenu: [
						{
							title: "Entrée des stocks",
							translate: "MENU.EntreeStock",
							page: "/stock/entree-stock",
							icon: "socicon-istock",
						},
						{
							title: "Sortie des stocks",
							translate: "MENU.SortieStock",
							page: "/stock/sortie-stock",
							icon: "flaticon-arrows",
						},
						{
							title: "Transfer des stocks",
							translate: "MENU.TransferStock",
							page: "/stock/transfert-stock",
							icon: "flaticon-layer",
						},
						{
							title: "Referme des stocks",
							translate: "MENU.RefermeStock",
							page: "/stock/referome-stock",
							icon: "flaticon-info",
						},
						{
							title: "Renintegratioon des stocks",
							translate: "MENU.RenintegratioonStock",
							page: "/stock/rentegration-stock",
							icon: "flaticon-home-1",
						},
					],
				},
				/* 	{
						title: "Etat",
						translate: "MENU.ETAT",
						page: "/gestionStock/personnel-new",
						icon: "flaticon-edit-1",
					//	permission: "canCreatePersonnel",
					}, */
				// {
				// 	title: "parametrages",
				// 	translate: "MENU.parametrages",
				// 	icon: "flaticon-settings-1",
				// 	submenu: [
				// 		{
				// 			title: "Fournisseurs",
				// 			translate: "MENU.Fournisseurs",
				// 			page: "/gestionStock/fournisseurs",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 		{
				// 			title: "CategorieArticle",
				// 			translate: "MENU.CategorieArticle",
				// 			page: "/gestionStock/categorie-article",
				// 			icon: "flaticon-technology-2",
				// 		},
				// 		{
				// 			title: "Magasin",
				// 			translate: "MENU.Magasin",
				// 			page: "/gestionStock/emplacements",
				// 			icon: "flaticon-grid-menu",
				// 		},
				// 		{
				// 			title: "Organisme",
				// 			translate: "MENU.organisme",
				// 			page: "/gestionStock/entiteMagasin",
				// 			icon: "flaticon-paper-plane",
				// 		},
				// 		/* {
				// 			title: "Reférentiel",
				// 			translate: "MENU.referentiel",
				// 			page: "/gestionStock/reference",
				// 			icon: "flaticon-circle",
				// 		},*/

				// 	],
				// },
				{
					title: "parametrages",
					translate: "MENU.parametrages",
					icon: "flaticon-cogwheel",
					submenu: [
						{
							title: "CategorieArticle",
							translate: "MENU.CategorieArticle",
							page: "/stock/list-categore-article",
							icon: "flaticon2-list-3",
						},
						{
							title: "Fornesseur",
							translate: "MENU.Fournisseurs",
							page: "/stock/list-fornisseur",
							icon: "flaticon2-list-3",
						},
						{
							title: "Magasin",
							translate: "MENU.Magasin",
							page: "/stock/list-magasin",
							icon: "flaticon2-list-1",
						},
						{
							title: "Organisme",
							translate: "MENU.organisme",
							page: "/stock/list-organisem",
							icon: "flaticon2-list-2",
						},


					],
				},
			],
		},
		/* 	header_ressourcesHumaines: {
				self: {},
				items: [
					{
						title: 'Personnel',
						root: true,
						alignement: "left",
						toggle: "hover",
						translate: "MENU.PERSONNEL",
						submenu: [
							{
								title: 'Personnel Permanent',
								page: '/personnel/personnel-index',
								translate: 'MENU.PERSONNEL_PERMANENT'
							},
							{
								title: 'Personnel Saisonnier',
								page: '/personnel/personnel-index',
								translate: 'MENU.PERSONNEL_SAISONNIER'
							}
						]
					},
					{
						title: 'Congés',
						root: true,
						alignement: "left",
						toggle: "hover",
						translate: "MENU.CONGE",
						submenu: [
							{
								title: 'Demandes de Congés',
								translate: 'MENU.DEMANDES_CONGE',
								page: '/conge/demande-conge-index'
							},
							{
								title: 'Liste des Congés',
								translate: 'MENU.LISTE_CONGES',
								page: '/conge/conge-index'
							},
							{
								title: 'Types des Congés',
								translate: 'MENU.TYPES_CONGES',
								page: '/conge/types-conges-index'
							}
						]
					},
					{
						title: 'Notation',
						root: true,
						alignement: "left",
						toggle: "hover",
						translate: "MENU.NOTATION",
						submenu: [
							{
								title: 'Compagne de Notation',
								translate: 'MENU.COMPAGNE_NOTATION',
								page: '/notation/compagne-index'
							},
							{
								title: 'Liste des Notes',
								translate: 'MENU.NOTES_PERSONNEL',
								page: '/notation/notes-personnel-index'
							},
							{
								title: 'Noter le personnel',
								translate: 'MENU.NOTER_PERSONNEL',
								page: '/notation/notation-index'
							}
						]
					},
					{
						title: 'Concours',
						root: true,
						alignement: "left",
						toggle: "hover",
						translate: "MENU.CONCOURS",
						page: "/concours/concours-index"
					},
					{
						title: 'Promotion',
						root: true,
						alignement: "left",
						toggle: "hover",
						translate: "MENU.PROMOTION",
						submenu: [
							{
								title: 'Promotion par Echelle',
								translate: 'MENU.PROMOTION_ECHELLE',
								page: "/promotion/promotion-echelle-index"
							},
							{
								title: 'Promotion par Echelon',
								translate: 'MENU.PROMOTION_ECHELON',
								page: "/promotion/promotion-echelon-index"
							}
						]
					},
					{
						title: 'Retraite',
						root: true,
						alignement: "left",
						toggle: "hover",
						translate: "MENU.RETRAITE",
						submenu: [
							{
								title: 'Retraités',
								translate: 'MENU.RETRAITES',
								page: '/retraite/retraites-index'
							},
							{
								title: 'Demandes de Prolongation/Anticipation',
								translate: 'MENU.DEMANDE_RETRAITE',
								page: '/retraite/demande-retraite-index'
							},
							{
								title: "Retraite à l'âge limite",
								translate: 'MENU.RETRAITE_LIMITE_AGE',
								page: '/retraite/retraite-limiteage-index'
							},
							{
								title: 'Retraite Anticipée',
								translate: 'MENU.RETRAITE_ANTICIPEE',
								page: '/retraite/retraite-anticipee-index'
							},
							{
								title: 'Retraite Prolongée',
								translate: 'MENU.RETRAITE_PROLONGEE',
								page: '/retraite/prolongation-retraite-index'
							}
						]
					},
					{
						title: 'Tableaux de Bords et états de synthèse',
						translate: "MENU.STATISTIQUES",
					}
				]
			}, */
		headerBatoire: {
			self: {},
			items: [
				{
					title: "Journée",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.JOURNEE",
					//permission: ",
					submenu: [
						{
							title: "Gestion de la Journée",
							translate: "MENU.JOURNEE",
							page: "/audiences/list-info",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},
				// {
				// 	title: "régie",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.FACTURE",
				// 	submenu: [
				// 		{
				// 			title: "Gestion de Factures",
				// 			translate: "Ajouter une facture",
				// 			page: "/audiences/saisir-facture",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 		{
				// 			title: "Gestion de Factures",
				// 			translate: "Liste des factures",
				// 			page: "/audiences/list-facture",
				// 			icon: "flaticon2-list-3",autopsie
				// 		},
				// 	],
				// },

				{
					title: "Paramétrage",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PARAMETRAGE",
					//permission: ",
					submenu: [
						{
							title: "Gestion des chevillards",
							translate: "MENU.GESTION_CHEVILLARDS",
							page: "/audiences/list-audiences",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Gestion Des Espéces",
							translate: "MENU.GESTION_ESPECES",
							page: "/audiences/list-espece",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						// {
						// 	title: "Gestion Des Sous Espéces",
						// 	translate: "Gestion des Sous Espéces",
						// 	page: "/pages/audiences/list-sous-espece",
						// 	icon: "flaticon2-list-3",
						// 	//permission: "accessToIndexAssociation",
						// },

						{
							title: "Gestion Arrêté fiscale ",
							translate: "MENU.GESTION_ARRETES_FISCALES",
							page: "/audiences/list-tarifs",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},

				{
					title: "Statistiques",
					root: true,
					alignment: "left",
					toggle: "hover",
					page: "/statistics/board",
					translate: "MENU.STATISTIQUES",
				},
			],
		},

		header_parcAuto: {
			self: {},
			items: [
				{
					title: "Gestion de missions",
					translate: "MENU.GestionMissions",
					page: "/gestionParcAuto/article",
					icon: "flaticon2-list-3",
					submenu: [
						{
							title: "ajouter mission",
							translate: "MENU.AjouterDemande",
							page: "/gestionParcAuto/new-demande-mession",
							icon: "flaticon-book",
						},
						{
							title: "valider Mission",
							translate: "MENU.ValiderDemande",
							page: "/gestionParcAuto/demande-mession",
							icon: "flaticon-tool",
						},
						{
							title: "Affectation vehicule",
							translate: "MENU.affecterVehicule",
							page: "/gestionParcAuto/affectation-vehicule",
							icon: "flaticon-car",
						},
						{
							title: "Affectation cartes Jawaz  ",
							translate: "MENU.affectationCartes",
							page: "/gestionParcAuto/carte-autoroute",
							icon: "flaticon-cart",
						},
						{
							title: "Affectation carburant",
							translate: "MENU.affectationsCarburant",
							page: "/gestionParcAuto/affectation-carburant",
							icon: "flaticon-envelope",
						},
					],
				},
				{
					title: "Garage",
					translate: "MENU.Garage",
					icon: "flaticon-business",
					submenu: [
						{
							title: "Livraison",
							translate: "MENU.Livraison",
							page: "/gestionParcAuto/livraison",
							icon: "flaticon-paper-plane-1",
						},
						{
							title: "Reception",
							translate: "MENU.Reception",
							page: "/gestionParcAuto/reception",
							icon: "flaticon-layer",
						},
						{
							title: "Réparation",
							translate: "MENU.Reparation",
							page: "/gestionParcAuto/reparation",
							icon: "flaticon-info",
						},
					],
				},
				{
					title: "parametrages",
					translate: "MENU.parametrages",
					icon: "flaticon-settings-1",
					submenu: [
						{
							title: "Véhicules",
							translate: "MENU.Vehicules",
							page: "/gestionParcAuto/vehicules",
							icon: "flaticon2-lorry",
						},
						{
							title: "Marques",
							translate: "MENU.Marques",
							page: "/gestionParcAuto/marques",
							icon: "flaticon2-layers",
						},

						{
							title: "Accessoires véhicules",
							translate: "MENU.accessoireVehicule",
							page: "/gestionParcAuto/accessoire-vehicule",
							icon: "flaticon-paper-plane",
						},
						{
							title: "garagistes",
							translate: "MENU.garagistes",
							page: "/gestionParcAuto/garagistes",
							icon: "flaticon2-settings",
						}, {
							title: "Cartes Jawaz",
							translate: "MENU.CarteeJawaz",
							page: "/gestionParcAuto/cartes-jawaz",
							icon: "flaticon-notepad",
						},
					],
				},
				// {
				// 	title: "parametrages",
				// 	translate: "MENU.parametrages",
				// 	icon: "flaticon-settings-1",
				// 	submenu: [
				// 		{
				// 			title: "Véhicules",
				// 			translate: "MENU.Vehicules",
				// 			page: "/parc/list-vehicule",
				// 			icon: "flaticon2-lorry",
				// 		},
				// 		{
				// 			title: "Marques",
				// 			translate: "MENU.Marques",
				// 			page: "/parc/list-marque",
				// 			icon: "flaticon2-layers",
				// 		},

				// 		{
				// 			title: "Accessoires véhicules",
				// 			translate: "MENU.accessoireVehicule",
				// 			page: "/parc/list-accesoire",
				// 			icon: "flaticon-paper-plane",
				// 		},
				// 		{
				// 			title: "garagistes",
				// 			translate: "MENU.garagistes",
				// 			page: "/parc/list-garagiste",
				// 			icon: "flaticon2-settings",
				// 		}, {
				// 			title: "Cartes Jawaz",
				// 			translate: "MENU.CarteeJawaz",
				// 			page: "/parc/list-carte-jawaze",
				// 			icon: "flaticon-notepad",
				// 		},

				// 	],
				// },



			],
		},
		header_RH: {
			self: {},
			items: [
				{
					title: "Personnels",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNELS",
					permission: "accessToPersonnelModule",
					submenu: [
						{
							title: "Liste des personnels",
							translate: "MENU.LISTEPERSONNELS",
							page: "/personnel/personnel-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPersonnel",
						},
						{
							title: "ajouter un personnel",
							translate: "MENU.AJOUTERPERSONNEL",
							page: "/personnel/personnel-new",
							icon: "flaticon-edit-1",
							permission: "canCreatePersonnel",
						},
					],
				},
				/*
				{
					title: "Presences",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PRESENCES",
					permission: "accessToPresenceModule",

					submenu: [
						{
							title: "Liste des registers de presences",
							translate: "MENU.LISTEPRESENCES",
							page: "/presence/presence-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPresence",
						},
						{
							title: "ajouter un register",
							translate: "MENU.AJOUTERPRESENCE",
							page: "/presence/presence-new",
							icon: "flaticon-edit-1",
							permission: "canCreatePresence",
						},
					],
				},
				{
					title: "Permanences",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERMANENCES",
					permission: "accessToPermanenceModule",
					submenu: [
						{
							title: "Liste des permanences",
							translate: "MENU.LISTEPERMANENCES",
							page: "/permanence/permanence-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPermanence",
						},
						{
							title: "ajouter une permanence",
							translate: "MENU.AJOUTERPERMANENCE",
							page: "/permanence/permanence-new",
							icon: "flaticon-edit-1",
							permission: "canCreatePermanence",
						},
					],
				},
				{
					title: "notations",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.NOTATIONS",
					permission: "accessToNotationModule",
					submenu: [
						{
							title: "Liste des notations",
							translate: "MENU.LISTENOTATIONS",
							page: "/notation/notation-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexNotation",
						},
						{
							title: "ajouter une notation",
							translate: "MENU.AJOUTERNOTATION",
							page: "/notation/notation-new",
							icon: "flaticon-edit-1",
							permission: "canCreateNotation",
						},
						{
							title: "Liste des compagnes de notation",
							translate: "MENU.LISTECOMPAGNES_NOTATION",
							page: "/notation/compagne-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexCompagneNotation",
						},
						{
							title: "ajouter une compagne de notation",
							translate: "MENU.AJOUTERCOMPAGNE_NOTATION",
							page: "/notation/compagne-new",
							icon: "flaticon-edit-1",
							permission: "canCreateCompagneNotation",
						},
					],
				},
				{
					title: "attestations",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.ATTESTATIONS",
					permission: "accessToAttestationModule",
					submenu: [
						{
							title: "Liste des demandes d'attestations",
							translate: "MENU.LISTEATTESTATIONS",
							page: "/attestation/attestation-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexDemandeAttestation",
						},
						{
							title: "ajouter une demande d'attestation",
							translate: "MENU.AJOUTERATTESTATION",
							page: "/attestation/attestation-new",
							icon: "flaticon-edit-1",
							permission: "canCreateDemandeAttestation",
						},
					],
				},
				{
					title: "congés",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.CONGES",
					permission: "accessToCongeModule",
					submenu: [
						{
							title: "Liste des demandes de congé",
							translate: "MENU.LISTECONGES",
							page: "/conge/conge-index",
							icon: "flaticon2-list-3",
							permission: "accessToIndexDemandeConge",
						},
						{
							title: "ajouter une demande de conge",
							translate: "MENU.AJOUTERCONGE",
							page: "/conge/conge-new",
							icon: "flaticon-edit-1",
							permission: "canCreateDemandeConge",
						},
					],
				},
				*/
			],
		},
		header_projet: {
			self: {},
			items: [
				{
					title: "Prestataires",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PRESTATAIRES",
					permission: "accessToPrestataireModule",
					submenu: [
						{
							title: "Liste des prestataires",
							translate: "MENU.LISTEPRESTATAIRES",
							permission: "accessToIndexPrestataire",
							page: "/prestataire/prestataire-index",
							icon: "flaticon2-list-3",
						},
						{
							title: "ajouter un prestataire",
							translate: "MENU.AJOUTERPRESTATAIRE",
							permission: "canCreatePrestataire",
							page: "/prestataire/prestataire-new",
							icon: "flaticon-edit-1",
						},
					],
				},
				{
					title: "Projets",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PROJETS",
					permission: "accessToProjetModule",
					submenu: [
						{
							title: "Liste des projets",
							translate: "MENU.LISTEPROJETS",
							permission: "accessToIndexProjet",
							page: "/projet/projet-index",
							icon: "flaticon2-list-3",
						},
						{
							title: "ajouter un projet",
							translate: "MENU.AJOUTERPROJET",
							permission: "canCreateProjet",
							page: "/projet/projet-new",
							icon: "flaticon-edit-1",
						},
						{
							title: "Statistiques des project ",
							translate: "MENU.STATPROJECT",
							permission: "canCreateProjet",
							page: "/projet/dashboard",
							icon: "flaticon2-pie-chart-1",
						},
					],
				},
			],
		},
		header_patrimoine: {
			self: {},
			items: [
				{
					title: "Patrimoine communal",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PATRIMOINES_COMMUNAL",
					permission: "accessToPatrimoineModule",
					submenu: [
						{
							title: "Liste des patrimoines",
							translate: "MENU.LISTEPATRIMOINES",
							permission: "accessToIndexPatrimoine",
							page: "/patrimoine/patrimoine-index",
							icon: "flaticon2-list-3",
						},
						{
							title: "ajouter un patrimoine",
							translate: "MENU.AJOUTERPATRIMOINE",
							permission: "canCreatePatrimoine",
							page: "/patrimoine/patrimoine-new",
							icon: "flaticon-edit-1",
						},
						{
							title: "Statistique un patrimoine",
							translate: "MENU.STATPATRIMOINE",
							permission: "canCreatePatrimoine",
							page: "/patrimoine/dashboard",
							icon: "flaticon2-pie-chart-1",
						},
						{
							title: "Statistique",
							translate: "MENU.STATPATRIMOINE",
							permission: "canCreatePatrimoine",
							page: "/patrimoine/dashboardSC",
							icon: "flaticon2-pie-chart-1",
						},
						{
							title: "Statistique",
							translate: "MENU.STATPATRIQUEMARCHE",
							permission: "canCreatePatrimoine",
							page: "/patrimoine/dashboardMarche",
							icon: "flaticon2-pie-chart-1",
						},
					],
				},
				{
					title: "Projet d'immatriculation",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.IMMATRICULATION",
					permission: "accessToImmatriculationModule",
					submenu: [
						{
							title: "Liste des immatriculations",
							translate: "MENU.LISTEIMMATRICULATIONS",
							permission: "accessToIndexImmatriculation",
							page: "/immatriculation/immatriculation-index",
							icon: "flaticon2-list-3",
						},

						{
							title: "ajouter un patrimoine",
							translate: "MENU.AJOUTERIMMATRICULATION",
							permission: "canCreateImmatriculation",
							page: "/immatriculation/immatriculation-new",
							icon: "flaticon-edit-1",
						},
					],
				},
				/*	{
						title: "Projet gestion des marchés",
						root: true,
						alignment: "left",
						toggle: "hover",
						translate: "MENU.MARCHES",
						permission: "accessToMarcheComModule",
						submenu: [
							{
								title: "Liste des marchés",
								translate: "MENU.LISTEMARCHES",
								permission: "accessToIndexMarcheCom",
								page: "/marche/marche-index",
								icon: "flaticon2-list-3",
							},

							{
								title: "ajouter un marché",
								translate: "MENU.AJOUTERMARCHE",
								permission: "canCreateMarcheCom",
								page: "/marche/marche-new",
								icon: "flaticon-edit-1",
							},
						],
					},
					{
						title: "Projet gestion des habitations",
						root: true,
						alignment: "left",
						toggle: "hover",
						translate: "MENU.HABITATIONS",
						permission: "accessToHabitationModule",
						submenu: [
							{
								title: "Liste des habitations",
								translate: "MENU.LISTEHABITATIONS",
								permission: "accessToIndexHabitation",
								page: "/habitation/habitation-index",
								icon: "flaticon2-list-3",
							},

							{
								title: "ajouter une habitation",
								translate: "MENU.AJOUTERHABITATION",
								permission: "canCreateHabitation",
								page: "/habitation/habitation-new",
								icon: "flaticon-edit-1",
							},
						],
					},
					{
						title: "Projet gestion des toilettes public",
						root: true,
						alignment: "left",
						toggle: "hover",
						translate: "MENU.TOILETTES",
						permission: "accessToToiletteModule",
						submenu: [
							{
								title: "Liste des toilettes",
								translate: "MENU.LISTETOILETTES",
								permission: "accessToIndexToilette",
								page: "/toilette/toilette-index",
								icon: "flaticon2-list-3",
							},

							{
								title: "ajouter une toilette public",
								translate: "MENU.AJOUTERTOILETTE",
								permission: "canCreateToilette",
								page: "/toilette/toilette-new",
								icon: "flaticon-edit-1",
							},
						],
					},
					{
						title: "Projet gestion des occupations des domaines public",
						root: true,
						alignment: "left",
						toggle: "hover",
						translate: "MENU.DOMAINES",
						permission: "accessToDomainePublicModule",
						submenu: [
							{
								title: "Liste des domaines public",
								translate: "MENU.LISTEDOMAINES",
								permission: "accessToIndexDomainePublic",
								page: "/domaine/domaine-index",
								icon: "flaticon2-list-3",
							},

							{
								title: "ajouter un domaine public",
								translate: "MENU.AJOUTERDOMAINE",
								permission: "canCreateDomainePublic",
								page: "/domaine/domaine-new",
								icon: "flaticon-edit-1",
							},
						],
					},
					{
						title: "locataires",
						root: true,
						alignment: "left",
						toggle: "hover",
						translate: "MENU.LOCATAIRES",
						permission: "accessToLocataireModule",
						submenu: [
							{
								title: "Liste des locataires",
								translate: "MENU.LISTELOCATAIRES",
								permission: "accessToIndexLocataire",
								page: "/locataire/locataire-index",
								icon: "flaticon2-list-3",
							},

							{
								title: "ajouter un locataire",
								translate: "MENU.AJOUTERLOCATAIRE",
								permission: "canCreateLocataire",
								page: "/locataire/locataire-new",
								icon: "flaticon-edit-1",
							},
						],
					},
					{
						title: "Beneficiaires",
						root: true,
						alignment: "left",
						toggle: "hover",
						translate: "MENU.BENEFICIAIRES",
						//permission: "accessToBeneficiaireModule",
						submenu: [
							{
								title: "Liste des Beneficiaires",
								translate: "MENU.LISTEBENEFICIAIRES",
								page: "/beneficiaire/beneficiaire-index",
								icon: "flaticon2-list-3",
								//permission: "accessToIndexBeneficiaire"
							},
							{
								title: "ajouter un beneficiaire",
								translate: "MENU.AJOUTERBENEFICIAIRE",
								page: "/beneficiaire/beneficiaire-new",
								icon: "flaticon-edit-1",
								//permission: "canCreateBeneficiaire"
							}
						]
					},*/
			],
		},
		headerMarche: {

			self: {},
			
			items: [
				{
					title: "Liste des pesee des mondataires",
					translate: "Liste des pesee des mondataires",
					page: "/pesee/list-pesee-mondataire",
					permission: "accessToMondataireModule",
				},
				{
					title: "Gestion de pesée",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PESEE.GESTIONPESEE",
					permission: 'accessToMarcheGrosPseeVehiculeModule', // Check if the user has the required permission

					submenu: [
						{
							title: "Ajouter Pesée",
							translate: "MENU.PESEE.AJOUTERPESEE",
							page: "/pesee/add-pesee",
							icon: "flaticon-edit-1",
							//permission: "canCreateAssociation",
						},

						{
							title: "Liste des pesées",
							translate: "MENU.PESEE.LISTEPESEE",
							page: "/pesee/list-pesees",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},

				{
					title: "Gestion de vehicules",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.VEHICULE.GESTIONVEHICULE",
					permission: 'accessToMarcheGrosPseeVehiculeModule', // Check if the user has the required permission
					submenu: [
						{
							title: "Ajouter vehicule",
							translate: "MENU.VEHICULE.AJOUTERVEHICULE",
							page: "/pesee/add-vehicule",
							icon: "flaticon-edit-1",
							//permission: "canCreateAssociation",
						},
						{
							title: "Liste des véhicule",
							translate: "MENU.VEHICULE.LISTEVEHICULE",
							page: "/pesee/list-vehicule",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},

				{
					title: "Gestion du Marché",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.MARCHEGROS.GESTIONMARCHE",
					permission: "accessToMarcheGrosSansMondataireModule",
					submenu: [
						{
							title: "liste des produits",
							translate: "MENU.MARCHEGROS.LISTEPRODUITS",
							page: "/marcheGros/list-type-produit",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},

						// {
						// 	title: "Ajouter Produit",
						// 	translate: "Ajouter Produit",
						// 	page: "/pages/Marche/add-type-produit",
						// 	icon: "flaticon2-list-3",
						// 	//permission: "accessToIndexAssociation",
						// },
						// {
						// 	title: "Type de Tarifiction",
						// 	translate: "Type de Tarifiction",
						// 	page: "/pages/Marche/list-type-tarifiction",
						// 	icon: "flaticon2-list-3",
						// 	//permission: "accessToIndexAssociation",
						// },
						{
							title: "liste Hangar",
							translate: "MENU.MARCHEGROS.LISTHANGAR",
							page: "/marcheGros/list-type-hangar",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						// {
						// 	title: "Type de Hangar",
						// 	translate: "Type de Hangar",
						// 	page: "/pages/Marche/add-type-hangar",
						// 	icon: "flaticon2-list-3",
						// 	//permission: "accessToIndexAssociation",
						// },
						{
							title: "liste Emballage",
							translate: "MENU.MARCHEGROS.LISTEMBALLAGE",
							page: "/marcheGros/list-type-embalage",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "liste Catégorie Produit",
							translate: "MENU.MARCHEGROS.LISTCAT",
							page: "/marcheGros/list-categorie-produit",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "liste Type Produit",
							translate: "MENU.MARCHEGROS.LISTTYPE",
							page: "/marcheGros/list-type",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},

						// {
						// 	title: "Type d'Emballage",
						// 	translate: "Type d'Emballage",
						// 	page: "/pages/Marche/add-type-embalage",
						// 	icon: "flaticon2-list-3",
						// },
						// {
						// 	title: "Ajouter Catégorie",
						// 	translate: "Ajouter Catégorie",
						// 	page: "/pages/Marche/add-categorie",
						// 	icon: "flaticon2-list-3",
						// },
						// {
						// 	title: "Ajouter Type",
						// 	translate: "Ajouter type",
						// 	page: "/pages/Marche/add-type",
						// 	icon: "flaticon2-list-3",
						// }
					],
				},
				{
					title: "Calcul sur une période de 10 jours",
					translate: "MENU.STATISTIQUE.CALCUL_DIX_JOURS",
					page: "/statistiques/calcul-dix-jours",
					icon: "flaticon2-list-3",
					permission: "accessToMondataireModule",

				},

				{
					title: "Statistiques",
					page: "/statistiques",
					root: true,
					alignment: "left",
					toggle: "hover",
					permission: "accessToMarcheGrosSansMondataireModule",

					translate: "TRANSLATOR.STATISTIQUES",
					submenu: [
						{
							title: "Vehicules",
							translate: "MENU.STATISTIQUE.VEHICULE",
							page: "/statistiques/vehicules",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
							submenu: [
								{
									title: "Nombre de véhicules par genres et quantités de marchandises pour chaque carreau",
									translate: "MENU.STATISTIQUE.NOMBRE_PAR_GENRE_ET_QUANTITE",
									page: "/statistiques/nombre-par-genre-et-quantite",
									icon: "flaticon2-list-3"
								}
							]

						},
						{
							title: "Transactions et recettes",
							translate: "MENU.STATISTIQUE.TRANSACTIONSETRECETTES",
							page: "/statistiques/transaction-et-recettes",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
							submenu: [
								{
									title: "Calcul sur une période de 10 jours",
									translate: "MENU.STATISTIQUE.CALCUL_DIX_JOURS",
									page: "/statistiques/calcul-dix-jours",
									icon: "flaticon2-list-3"
								},
								// {
								// 	title: "Transactions globales journalières",
								// 	translate: "MENU.STATISTIQUE.TRANSACTIONS_GLOBALES_JOURNALIERES",
								// 	page: "/statistiques/transaction-et-recettes/transactions-globales-journalieres",
								// 	icon: "flaticon2-list-3"
								// },
								{
									title: "Transactions",
									translate: "MENU.STATISTIQUE.TRANSACTIONS",
									page: "/statistiques/transactions",
									icon: "flaticon2-list-3"
								},
								/* {
									title: "Recettes journalières réalisées par carreau",
									translate: "MENU.STATISTIQUE.RECETTES_JOURNALIERES_PAR_CARREAU",
									page: "/statistiques/recettes-journalieres-par-carreau",
									icon: "flaticon2-list-3"
								}, */
								{
									title: "Recettes réalisées selon une période et par carreau",
									translate: "MENU.STATISTIQUE.RECETTES_PAR_PERIODE_ET_CARREAU",
									page: "/statistiques/recettes-par-periode-et-carreau",
									icon: "flaticon2-list-3"
								}
							]

						},
						{
							title: "Marchandise et Carreaux",
							translate: "MENU.STATISTIQUE.MARCHANDISEETCARREAUX",
							page: "/statistiques/marchandise-et-carreaux",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
							submenu: [
								{
									title: "Quantité de marchandise écoulée par type de produit selon une certaine période pour chaque carreau",
									translate: "MENU.STATISTIQUE.QUANTITE_PAR_TYPE_ET_PERIODE",
									page: "/statistiques/quantite-par-type-et-periode",
									icon: "flaticon2-list-3"
								},
								{
									title: "Marchandise écoulée par sous-type de produit selon une certaine période pour chaque carreau",
									translate: "MENU.STATISTIQUE.MARCHANDISE_PAR_SOUS_TYPE_ET_PERIODE",
									page: "/statistiques/quantite-par-sous-type-et-periode",
									icon: "flaticon2-list-3"
								}
							]

						},

					],
				},
				{
					title: "Parametrage",
					// page: "/parametrage",
					root: true,
					alignment: "left",
					permission: "accessToMarcheGrosSansMondataireModule",

					toggle: "hover",
					translate: "TRANSLATOR.PARAMETRAGE",
					submenu: [
						{
							title: "Gestion de pesée",
							translate: "MENU.PARAMETRAGES.GESTIONPESEE",
							page: "/parametrage/gestion-pesee",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Gestion des parts",
							translate: "MENU.PARAMETRAGES.GESTIONPARTS",
							page: "/parametrage/gestion-des-parts",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},

					],
				},

			],
		},

		// ******************************************************************
		// MENU RACHID
		// ******************************************************************
		header_travaux_communaux: {
			self: {},
			items: [
				{
					title: "Intervention rapide",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.INTERVENTION_RAPIDE",
					permission: "accessToInterventionModule",
					submenu: [
						{
							title: "Liste intervention",
							translate: "PAGES.INTERVENTION_RAPIDE.TITRE_INDEX",
							page: "/intervention-rapide/list-intervention-rapide",
							icon: "flaticon2-list-3",
							permission: "accessToIndexIntervention",
						},
						{
							title: "Ajouter intervention",
							translate: "PAGES.INTERVENTION_RAPIDE.TITRE_NEW",
							page: "/intervention-rapide/add-intervention-rapide",
							icon: "flaticon-edit-1",
							permission: "canCreateIntervention",
						},

						{
							title: "Statistiques intervention rapide",
							bullet: "dot",
							translate: "MENU.STATS.INTERVENTION_RAPIDE",
							page: "/intervention-rapide/dashboard",
							icon: "flaticon2-pie-chart-1",
							permission: "accessToAllStatsIntervention",
						},
					],
				},
				{
					title: "Projet urbain",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PROJET_URBANISME",
					permission: "accessToProjetUrbanismeModule",
					submenu: [
						{
							title: "Liste projet urbain",
							translate: "PAGES.PROJET_URBANISME.TITRE_INDEX",
							page: "/projet-urbanisme/list-projet-urbanisme",
							icon: "flaticon2-list-3",
							permission: "accessToIndexProjetUrb",
						},
						{
							title: "Ajouter projet urbain",
							translate: "PAGES.PROJET_URBANISME.TITRE_NEW",
							page: "/projet-urbanisme/add-projet-urbanisme",
							icon: "flaticon-edit-1",
							permission: "canCreateProjetUrb",
						},
						/*
						{
							title: "Statistiques projet urbain",
							bullet: "dot",
							translate: "MENU.STATS.PROJET_URBANISME",
							page: "/projet-urbanisme/dashboard",
							icon: "flaticon2-pie-chart-1",
							permission: "accessToAllStatsProjetUrbanisme",
						},
						*/
					],
				},
			],
		},
		header_bureau_ordre: {
			self: {},
			items: [
				{
					title: "courrier entrant",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.COURRIER_ANTRANT",
					permission: "accessToCourrierEntrantModule",
					submenu: [
						{
							title: "Liste courrier entrant",
							icon: "flaticon2-list-3",
							translate: "PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_INDEX",
							page: "/courriers-entrants/list-courriers-entrants",
							permission: "accessToIndexCourrierEntrant",
						},
						{
							title: "Ajouter courrier entrant",
							icon: "flaticon-edit-1",
							translate: "PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_NEW",
							page: "/courriers-entrants/add-courriers-entrants",
							permission: "canCreateCourrierEntrant",
						},

						{
							title: "Statistiques courrier entrant",
							bullet: "dot",
							translate: "MENU.STATS.COURRIER_IN",
							page: "/courriers-entrants/dashboard",
							icon: "flaticon2-pie-chart-1",
							permission: "accessToAllStatsCourrierEntrant",
						},
					],
				},
				{
					title: "courrier convocation",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.COURRIERS_CONVOCATIONS",
					submenu: [
						{
							title: "Liste courrier convocation",
							icon: "flaticon2-list-3",
							translate: "PAGES.BUREAU_ORDRE.COURRIER_CONVOCATION.TITRE_INDEX",
							page: "/courriers-convocations/list-courriers-convocations",
						},
						{
							title: "Ajouter courrier convocation",
							icon: "flaticon-edit-1",
							translate: "PAGES.BUREAU_ORDRE.COURRIER_CONVOCATION.TITRE_NEW",
							page: "/courriers-convocations/add-courriers-convocations",
						}
					]
				},
				{
					title: "courrier sortant",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.COURRIER_SORTANT",
					permission: "accessToCourrierSortantModule",
					submenu: [
						{
							title: "Liste courrier sortant",
							icon: "flaticon2-list-3",
							translate: "PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_INDEX",
							page: "/courriers-sortants/list-courriers-sortants",
							permission: "accessToIndexCourrierSortant",
						},
						{
							title: "Ajouter courrier sortant",
							icon: "flaticon-edit-1",
							translate: "PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_NEW",
							page: "/courriers-sortants/add-courriers-sortants",
							permission: "canCreateCourrierSortant",
						},

						{
							title: "Statistiques courrier sortant",
							bullet: "dot",
							translate: "MENU.STATS.COURRIER_OUT",
							page: "/courriers-sortants/dashboard",
							icon: "flaticon2-pie-chart-1",
							permission: "accessToAllStatsCourrierSortant",
						},
					],
				},
				{
					title: "courrier refuse",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.COURRIERS_REFUSES",
					permission: "accessToIndexRefusedCS",
					page: "/courriers-refuses/list-courriers-refuses",
				},
				{
					title: "Origine courrier",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.COURRIER_ORIGIN",
					permission: "accessToOrigineCourrierModule",
					submenu: [
						{
							title: "Liste origine courrier",
							icon: "flaticon2-list-3",
							translate: "PAGES.BUREAU_ORDRE.ORIGINE_COURRIER.TITRE_INDEX",
							page: "/origine-courriers-sortants/list-origine-courriers-sortants",
							permission: "accessToIndexOrigineCourrier",
						},
						{
							title: "Ajouter origine courrier",
							icon: "flaticon-edit-1",
							translate: "PAGES.BUREAU_ORDRE.ORIGINE_COURRIER.TITRE_NEW",
							page: "/origine-courriers-sortants/add-origine-courriers-sortants",
							permission: "canCreateOrigineCourrier",
						},
					],
				},
				// {
				// 	title: "Statistiques",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "TRANSLATOR.STATISTIQUES",
				// 	page: "/statistiques-bo/statistiques-bo",
				// },
				{
					title: "Recherche",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.SEARCHE",
					page: "/courriers-entrants/search-courriers-entrants",
					permission: "accessToCourrierEntrantModule",
				},
				{
					title: "Top management",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.TOP_MANAGEMENT",
					page: "/top-management/top-management",
					permission: "accessToTopManagement"
				},
				/* {
					title: "dashboard",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.STATISTIQUES",
					page: "/courriers-entrants/dashboard",
					permission: "accessToCourrierEntrantModule",
				}, */
				/*
				{
					title: "Personne physique",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNE_PHYSIQUE",
					permission: "accessToOrigineCourrierModule",
					submenu: [
						{
							title: "Liste des personnes",
							icon: "flaticon2-list-3",
							translate:
								"PAGES.BUREAU_ORDRE.PERSONNE_PHYSIQUE.TITRE_INDEX",
							page: "/personne-physique/list-personne-physique",
							permission: "accessToIndexOrigineCourrier",
						},
						{
							title: "Ajouter personne",
							icon: "flaticon-edit-1",
							translate:
								"PAGES.BUREAU_ORDRE.PERSONNE_PHYSIQUE.TITRE_NEW",
							page: "/personne-physique/add-personne-physique",
							permission: "canCreateOrigineCourrier",
						},
					],
				},
				*/
			],
		},
		header_insertion_publiciataire: {
			self: {},
			items: [
				{
					title: "Insertion publicitaire",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.INSERT_PUB",
					permission: "accessToInsertPubModule",
					submenu: [
						{
							title: "Liste publicitaire",
							translate: "PAGES.INSERT_PUB.TITRE_INDEX",
							icon: "flaticon2-list-3",
							page: "/insertion-publicitaire/list-insertion-publicitaire",
							permission: "accessToIndexInsertPub",
						},
						{
							title: "Ajouter publicitaire",
							translate: "PAGES.INSERT_PUB.TITRE_NEW",
							page: "/insertion-publicitaire/add-insertion-publicitaire",
							icon: "flaticon-edit-1",
							permission: "canCreateInsertPub",
						},
						/*
						{
							title: "Statistiques publicitaires",
							bullet: "dot",
							translate: "MENU.STATS.INSERT_PUB",
							page: "/insertion-publicitaire/dashboard",
							icon: "flaticon2-pie-chart-1",
							permission: "accessToAllStatsInsertPub",
						},
						*/
					],
				},
				{
					title: "Insertion media",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.INSERT_MEDIA",
					Permission: "accessToMediasModule",
					submenu: [
						{
							title: "Liste medias",
							translate: "PAGES.INSERT_PUB.MEDIA.TITRE_INDEX",
							page: "/insertion-media/list-insertion-media",
							icon: "flaticon2-list-3",
							permission: "accessToIndexMedias",
						},
						{
							title: "Ajouter medias",
							translate: "PAGES.INSERT_PUB.MEDIA.TITRE_NEW",
							page: "/insertion-media/add-insertion-media",
							icon: "flaticon-edit-1",
							permission: "canCreateMedias",
						},
					],
				},
			],
		},
		header_immobilisation: {
			self: {},
			items: [
				{
					title: "immobilisation",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.IMMOBILISATION",
					permission: "accessToImmobilisationModule",
					submenu: [
						{
							title: "Liste immobilisation",
							translate: "PAGES.IMMOBILISATION.TITRE_INDEX",
							page: "/immobilisation/list-immobilisation",
							icon: "flaticon2-list-3",
							permission: "accessToIndexImmobilisation",
						},
						{
							title: "Ajouter immobilisation",
							translate: "PAGES.IMMOBILISATION.TITRE_NEW",
							page: "/immobilisation/add-immobilisation",
							icon: "flaticon-edit-1",
							permission: "canCreateImmobilisation",
						},
						/*
						{
							title: "Statistiques immoblisation",
							bullet: "dot",
							translate: "MENU.STATS.IMMOBILISATION",
							page: "/immobilisation/dashboard",
							icon: "flaticon2-pie-chart-1",
							permission: "accessToAllStatsImmobilisation",
						},
						*/
					],
				},
				{
					title: "Reforme",
					translate: "PAGES.IMMOBILISATION.REFORME.LIBELLE",
					root: true,
					alignment: "left",
					toggle: "hover",
					permission: "canUpdateReformeImmobilisation",
					submenu: [
						{
							title: "Liste reforme",
							translate: "PAGES.IMMOBILISATION.REFORME.TITRE_INDEX",
							page: "/reforme/list-reforme",
							icon: "flaticon2-list-3",
							permission: "accessToIndexImmobilisation",
						},
						{
							title: "Ajouter reforme",
							translate: "PAGES.IMMOBILISATION.REFORME.TITRE_NEW",
							page: "/reforme/add-reforme",
							icon: "flaticon-edit-1",
							permission: "canCreateImmobilisation",
						},
					],
				},
			],
		},
		header_jsce: {
			self: {},
			items: [
				{
					title: "association",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.ASSOCIATION",
					//permission: "accessToAssociationModule",
					submenu: [
						{
							title: "Liste association",
							translate: "PAGES.ASSOCIATION.TITRE_INDEX",
							page: "/associations/list-association",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Ajouter association",
							translate: "PAGES.ASSOCIATION.TITRE_NEW",
							page: "/associations/add-association",
							icon: "flaticon-edit-1",
							//permission: "canCreateAssociation",
						},
						{
							title: "Convention",
							translate: "PAGES.ASSOCIATION.Accompagnement_et_partenariat",
							icon: "flaticon-edit-1",
							submenu: [
								{
									title: "Accord de partenariat",
									translate: "PAGES.ASSOCIATION.CONVENTION",
									icon: "flaticon2-list-3",
									page: "/conventions/list-convention",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Aide_financière",
									translate: "PAGES.ASSOCIATION.Aide_financière",
									icon: "flaticon2-list-3",
									page: "/subventions/list-subventions",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Support logistique",
									translate: "PAGES.ASSOCIATION.Support_logistique",
									icon: "flaticon2-list-3",
									page: "/logistique/list-logistique",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "acquisition",
									translate: "PAGES.ASSOCIATION.acquisition",
									icon: "flaticon2-list-3",
									page: "/acquisition/list-acquisition",
									//permission: "accessToIndexAssociation",
								},
							],
						},
						/* 	{
							title: "Statistiques association",
							bullet: "dot",
							translate: "MENU.STATS.ASSOCIATION",
							page: "/associations/add-dashboard",
							icon: "flaticon2-pie-chart-1",
							//	permission: "accessToAllStatsAssociation",
						},
						{
							title: "Statistiques projet",
							bullet: "dot",
							translate: "MENU.STATS.PROJET_ASSOCIATION",
							page: "/associations/dashboard-arrondissement",
							icon: "flaticon2-pie-chart-1",
						}, */
					],
				},
				// {
				// 	title: "Personne morale",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.PERSONNE_MORALE",
				// 	//permission: "accessToIndexActiviteCommunal",
				// 	submenu: [
				// 		{
				// 			title: "Liste des institutions",
				// 			translate: "PAGES.ACTIVITE.PERSONNE_MORALE.TITRE_INDEX",
				// 			page: "/activites/list-personne-morale",
				// 			icon: "flaticon2-list-3",
				// 			//permission: "accessToIndexActivite",
				// 		},
				// 		{
				// 			title: "Ajouter organisme/institution",
				// 			translate: "PAGES.ACTIVITE.PERSONNE_MORALE.TITRE_NEW",
				// 			page: "/activites/add-personne-morale",
				// 			icon: "flaticon-edit-1",
				// 			//permission: "canCreateActivite",
				// 		},
				// 	],
				// },
				// {
				// 	title: "Activite communale",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.ACTIVITE_COMMUNALE",
				// 	//permission: "accessToIndexActiviteCommunal",
				// 	submenu: [
				// 		{
				// 			title: "Liste activités",
				// 			translate: "PAGES.ACTIVITE.TITRE_INDEX",
				// 			page: "/activites/list-activites-commune",
				// 			icon: "flaticon2-list-3",
				// 			//permission: "accessToIndexActivite",
				// 		},
				// 		{
				// 			title: "Ajouter activité",
				// 			translate: "PAGES.ACTIVITE.TITRE_NEW",
				// 			page: "/activites/add-activites-commune",
				// 			icon: "flaticon-edit-1",
				// 			//permission: "canCreateActivite",
				// 		},
				// 	],
				// },
				// {
				// 	title: "Services subvention",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "PAGES.SUBVENTION.SERVICE_SUBVENTION",
				// 	//permission: "accessToServiceImpressionModule",
				// 	submenu: [
				// 		{
				// 			title: "organisme d'accueil",
				// 			bullet: "dot",
				// 			translate: "PAGES.HEBERGEMENT.ORGANISME",
				// 			page: "/hebergement/list-organisme",
				// 			icon: "flaticon-location",
				// 			//permission: "accessToHebergementModule",
				// 		},
				// 		{
				// 			title: "Fournisseur impression",
				// 			bullet: "dot",
				// 			translate: "PAGES.IMPRESSION.FOURNISSEUR",
				// 			page: "/impression/list-fournisseur",
				// 			icon: "flaticon2-print",
				// 			//permission: "accessToImpressionModule",
				// 		},
				// 		{
				// 			title: "fournisseur-resto",
				// 			bullet: "dot",
				// 			translate: "PAGES.RESTAURATION.FOURNISSEUR",
				// 			page: "/restauration/list-fournisseur-resto",
				// 			icon: "flaticon-tea-cup",
				// 			//permission: "accessToRestaurationModule",
				// 		},
				// 	],
				// },
				{
					title: "Grands festivals et évènement",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.FESTIVALE",
					page: "/associations/mandat-filter",
					submenu: [
						{
							title: "Liste des festivales",
							translate: "PAGES.FESTIVALES.LIST_FESTIVALES",
							page: "/festivales/list-festivales",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexActivite",
						},
						{
							title: "Ajouter un festivale",
							translate: "PAGES.FESTIVALES.ADD_FESTIVALE",
							page: "/festivales/add-festivales",
							icon: "flaticon-edit-1",
							//permission: "canCreateActivite",
						},
					],
					//permission: "",
				},
				{
					title: "Statistiques",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.STATISTIQUES",
					page: "/associations/mandat-filter",
					submenu: [
						{
							title: "Statistiques association",
							bullet: "dot",
							translate: "MENU.STATS.ASSOCIATION",
							page: "/associations/dashboard-association",
							icon: "flaticon2-pie-chart-1",
							//	permission: "accessToAllStatsAssociation",
						},
						{
							title: "Statistiques association",
							bullet: "dot",
							translate: "MENU.STATS.SUBVENTION",
							page: "/associations/add-dashboard",
							icon: "flaticon2-pie-chart-1",
							//	permission: "accessToAllStatsAssociation",
						},
						{
							title: "Statistiques autorisation",
							bullet: "dot",
							translate: "MENU.STATS.AUTORISATION",
							page: "/associations/dashboard-autorisation",
							icon: "flaticon2-pie-chart-1",
							//	permission: "accessToAllStatsAssociation",
						},
						{
							title: "Statistiques logistique",
							bullet: "dot",
							translate: "MENU.STATS.LOGISTIQUE",
							page: "/associations/dashboard-logistique",
							icon: "flaticon2-pie-chart-1",
							//	permission: "accessToAllStatsAssociation",
						},
						{
							title: "Statistiques convention",
							bullet: "dot",
							translate: "MENU.STATS.CONVENTION",
							page: "/associations/dashboard-convention",
							icon: "flaticon2-pie-chart-1",
							//	permission: "accessToAllStatsAssociation",
						},
						/* {
							title: "Statistiques projet",
							bullet: "dot",
							translate: "MENU.STATS.PROJET_ASSOCIATION",
							page: "/associations/dashboard-arrondissement",
							icon: "flaticon2-pie-chart-1",
						}, */
					],
					//permission: "",
				},
				{
					title: "Recherche",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.SEARCHE",
					page: "/associations/mandat-filter",
					//permission: "",
				},
				// added by saad for the new menu
				{
					title: "Demandes",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.DEMANDE.DEMANDES",
					page: "",
					submenu: [
						{
							title: "Liste des demandes",
							translate: "MENU.DEMANDE.LISTE_DEMANDES",
							page: "/demandes/list-demandesLicense",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Liste des demandes financières",
							translate: "MENU.DEMANDE.LISTE_DEMANDES_FINANCIERES",
							page: "/demandes/list-demandes-soutien-financiere",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Liste des demandes logistiques",
							translate: "MENU.DEMANDE.LISTE_DEMANDES_LOGISTIQUES",
							page: "/demandes/list-demandes-soutien-logistique",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},

					],
				}
			],
		},
		// ******************************************************************
		// MENU NAIMA
		// ******************************************************************
		header_reclamation: {
			self: {},
			items: [
				{
					title: "Réclamations",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.RECLAMATIONS",
					permission: "accessToReclamationModule",
					submenu: [
						{
							title: "liste des réclamations ",
							translate: "MENU.LISTE_RECLAMATION",
							page: "/reclamations/reclamation-detail",
							icon: "flaticon2-list-3",
							permission: "accessToIndexReclamation",
						},
						{
							title: "ajouter réclamation ",
							translate: "MENU.AJOUT_RECLAMATION",
							page: "/reclamations/reclamations-form",
							icon: "flaticon-edit-1",
							permission: "canCreateReclamation",
						},
					],
				},
				{
					title: "الأشخاص الماديين",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNES_PHYSIQUES",
					permission: "accessToReclamationModule",
					submenu: [
						{
							title: "لائحة الأشخاص الماديين",
							translate: "MENU.LISTE_PERSONNES_PHYSIQUES",
							page: "/personne-physique/personne-physique-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPPSource",
						},
						{
							title: "إضافة شخص مادي",
							translate: "MENU.AJOUT_PERSONNES_PHYSIQUES",
							page: "/personne-physique/personne-physique-form",
							icon: "flaticon-edit-1",
							permission: "canCreatePPSource",
						},
					],
				},
				{
					title: "الأشخاص المعنويين",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNES_MORALES",
					permission: "accessToReclamationModule",
					submenu: [
						{
							title: "لائحة الأشخاص المعنويين",
							translate: "MENU.LISTE_PERSONNES_MORALES",
							page: "/personne-morale/personne-morale-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPMSource",
						},
						{
							title: "إضافة شخص معنوي",
							translate: "MENU.AJOUT_PERSONNES_MORALES",
							page: "/personne-morale/personne-morale-form",
							icon: "flaticon-edit-1",
							permission: "canCreatePMSource",
						},
					],
				},
			],
		},
		header_autorisation: {
			self: {},
			items: [
				{
					title: "autorisations",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.AUTORISATIONS",
					permission: "accessToAutorisationModule",
					submenu: [
						{
							title: "liste des autorisations ",
							translate: "MENU.LISTE_AUTORISATIONS",
							page: "/autorisations/autorisations-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexAutorisation",
						},
						{
							title: "ajouter autorisation ",
							translate: "MENU.AJOUT_AUTORISATIONS",
							page: "/autorisations/autorisation-form",
							icon: "flaticon-edit-1",
							permission: "canCreateAutorisation",
						},
					],
				},
				{
					title: "الأشخاص الماديين",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNES_PHYSIQUES",
					permission: "accessToAutorisationModule",
					submenu: [
						{
							title: "لائحة الأشخاص الماديين",
							translate: "MENU.LISTE_PERSONNES_PHYSIQUES",
							page: "/personne-physique/personne-physique-list",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexPPSource",
						},
						{
							title: "إضافة شخص مادي",
							translate: "MENU.AJOUT_PERSONNES_PHYSIQUES",
							page: "/personne-physique/personne-physique-form",
							icon: "flaticon-edit-1",
							//permission: "canCreatePPSource",
						},
					],
				},
				{
					title: "الأشخاص المعنويين",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNES_MORALES",
					permission: "accessToAutorisationModule",
					submenu: [
						{
							title: "لائحة الأشخاص المعنويين",
							translate: "MENU.LISTE_PERSONNES_MORALES",
							page: "/personne-morale/personne-morale-list",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexPMSource",
						},
						{
							title: "إضافة شخص معنوي",
							translate: "MENU.AJOUT_PERSONNES_MORALES",
							page: "/personne-morale/personne-morale-form",
							icon: "flaticon-edit-1",
							//permission: "canCreatePMSource",
						},
					],
				},
				// begin added by saad le 13/03/2024
				{
					title: "demandes-pub-prop",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.DEMANDES_PUB_PROP",
					permission: "accessToAutorisationModule",
					submenu: [
						{
							title: "demandes-pub-prop",
							translate: "MENU.DEMANDES_PUB_PROP",
							page: "/autorisations/list-demandes-pub-prop",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexPMSource",
						},
					
					],
				}
				//end added by saad le 13/03/2024

				/* ,
				{
					title: "ممتلكات الجماعة",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.BIENS",
					//permission: "accessToAutorisationModule",
					submenu: [
						{
							title: "لائحة ممتلكات الجماعة",
							translate: "MENU.LISTE_BIENS_COMMUNAUX",
							page: "/autorisations/biens-list",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexBiensAutorisation",
						},
						{
							title: "إضافة ممتلك",
							page: "/autorisations/bien-form",
							icon: "flaticon-edit-1",
							translate: "MENU.AJOUT_BIEN",
							//permission: "canCreateBienAutorisation",
						},
					],
				}, */,

			],
		},
		header_reservations: {
			self: {},
			items: [
				{
					title: "reservations",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.RESERVATIONS",
					permission: "accessToReservationModule",
					submenu: [
						{
							title: "liste des reservations ",
							translate: "MENU.LISTE_RESERVATIONS",
							page: "/reservations/reservations-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexReservation",
						},
						{
							title: "ajouter reservation ",
							translate: "MENU.AJOUT_RESERVATIONS",
							page: "/reservations/reservation-form",
							icon: "flaticon-edit-1",
							permission: "canCreateReservation",
						},
					],
				},
				{
					title: "الأشخاص الماديين",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNES_PHYSIQUES",
					permission: "accessToReservationModule",
					submenu: [
						{
							title: "لائحة الأشخاص الماديين",
							translate: "MENU.LISTE_PERSONNES_PHYSIQUES",
							page: "/personne-physique/personne-physique-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPPSource",
						},
						{
							title: "إضافة شخص مادي",
							translate: "MENU.AJOUT_PERSONNES_PHYSIQUES",
							page: "/personne-physique/personne-physique-form",
							icon: "flaticon-edit-1",
							permission: "canCreatePPSource",
						},
					],
				},
				{
					title: "الأشخاص المعنويين",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.PERSONNES_MORALES",
					permission: "accessToReservationModule",
					submenu: [
						{
							title: "لائحة الأشخاص المعنويين",
							translate: "MENU.LISTE_PERSONNES_MORALES",
							page: "/personne-morale/personne-morale-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexPMSource",
						},
						{
							title: "إضافة شخص معنوي",
							translate: "MENU.AJOUT_PERSONNES_MORALES",
							page: "/personne-morale/personne-morale-form",
							icon: "flaticon-edit-1",
							permission: "canCreatePMSource",
						},
					],
				},
				{
					title: "ممتلكات الجماعة",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.BIENS",
					permission: "accessToReservationModule",
					submenu: [
						{
							title: "لائحة ممتلكات الجماعة",
							translate: "MENU.LISTE_BIENS_COMMUNAUX",
							page: "/reservations/bienreservations-list",
							icon: "flaticon2-list-3",
							permission: "accessToIndexBiensReservation",
						},
						{
							title: "إضافة ممتلك",
							page: "/reservations/bienreservation-form",
							icon: "flaticon-edit-1",
							translate: "MENU.AJOUT_BIEN",
							permission: "canCreateBienReservation",
						},
					],
				},
			],
		},
		header_affairesConseil: {
			self: {},
			items: [
				{
					title: "mondats",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.MONDATS",
					permission: "accessToMondat",
					submenu: [
						{
							title: "liste des mondats ",
							icon: "flaticon2-list-3",
							translate: "MENU.LISTE_MONDAT",
							page: "/affaires-conseil/mondat-list",
							permission: "accessToIndexMondat",
						},
						{
							title: "ajouter mondat ",
							icon: "flaticon-edit-1",
							translate: "MENU.AJOUT_MONDAT",
							page: "/affaires-conseil/mondat-form",
							permission: "canCreateMondat",
						},
					],
				},
				{
					title: "الدورات ",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.SESSIONS",
					permission: "accessToSession",
					submenu: [
						{
							title: "لائحة الدورات",
							icon: "flaticon2-list-3",
							page: "/affaires-conseil/session-list",
							translate: "MENU.LISTE_SESSIONS",
							permission: "accessToIndexSession",
						},
						{
							title: "إضافة دورة",
							icon: "flaticon-edit-1",
							translate: "MENU.AJOUT_SESSION",
							page: "/affaires-conseil/session-form",
							permission: "canCreateSession",
						},
					],
				},
				{
					title: "النقاط ",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.POINTS",
					page: "/affaires-conseil/point-form",
					permission: "canCreatePoint",
				},
				{
					title: "جدول أعمال المكتب",
					root: true,
					alignment: "left",
					toggle: "hover",
					page: "/affaires-conseil/ordre-jour-session-list",
					translate: "MENU.ORDRE_J_BUREAU",
					permission: "accessOrdreJourAudience",
				},
				{
					title: "الجلسات",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.AUDIENCES",
					permission: "accessToAudience",
					submenu: [
						{
							title: "لائحة الجلسات",
							icon: "flaticon2-list-3",
							page: "/affaires-conseil/audience-list",
							translate: "MENU.LISTE_AUDIENCES",
							permission: "accessToIndexAudience",
						},
						{
							title: "إضافة جلسة",
							icon: "flaticon-edit-1",
							page: "/affaires-conseil/audience-form",
							translate: "MENU.AJOUT_AUDIENCES",
							permission: "canCreateAudience",
						},
					],
				},
				{
					title: "اللجان ",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.COMMISSIONS",
					permission: "accessToCommission",
					submenu: [
						{
							title: "لائحة اللجان",
							icon: "flaticon2-list-3",
							translate: "MENU.LISTE_COMMISSION",
							page: "/affaires-conseil/commission-list",
							permission: "accessToIndexCommission",
						},
						{
							title: "إضافة لجنة",
							icon: "flaticon-edit-1",
							page: "/affaires-conseil/commission-conseil-form",
							translate: "MENU.ADD_COMMISSION",
							permission: "canCreateCommission",
						},
						/*	{
							title: "إضافة اجتماع لجنة",
							translate: "MENU.ADD_REUNION_COMMISSION",
							page: "/affaires-conseil/reunion-commission-form",
							permission: "canCreateReunionCommission",
						},
						{
							title: "لائحة اجتماعات اللجنة",
							translate: "MENU.LISTE_REUNION_COMMISSION",
							page: "/affaires-conseil/reunion-commission-list",
							permission: "accessToIndexReunionCommission",
						},*/
					],
				},
				{
					title: "جدول أعمال اللجان",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.ORDRE_J_COMMISSION",
					page: "/affaires-conseil/ordre-jour-commission",
					permission: "accessOrdreJourCommission",
				},
				{
					title: "Decisions ",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.DECISIONS",
					page: "/affaires-conseil/decisions-points-list",
					permission: "accessToPointSession",
					//permission: "canCreatePoint",
				},
				{
					title: "الجلسات",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.REUNIONS",
					permission: "accessToAudience",
					submenu: [
						{
							title: "لائحة الجلسات",
							icon: "flaticon2-list-3",
							page: "/affaires-conseil/reunion-commission-list",
							translate: "MENU.REUNIONS_COMMISSION",
							//permission: "accessToIndexAudience",
						},
						{
							title: "إضافة جلسة",
							icon: "flaticon-edit-1",
							page: "/affaires-conseil/reunion-bureau-list",
							translate: "MENU.REUNIONS_BUREAU",
							//permission: "canCreateAudience",
						},
					],
				},
			],
		},
		header_marches: {
			self: {},
			items: [
				// {
				// 	title: "Définition besoin",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.BESION",
				// 	// permission: "accessToAoModule",
				// 	submenu: [
				// 		{
				// 			title: "programme",
				// 			translate: "MENU.BESIONLISTEAO",
				// 			// permission: "accessToAoModule",
				// 			page: "/marches/ao-consultation-list",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 		{
				// 			title: "ajouter  besoin pour consultation",
				// 			translate: "MENU.BESIONADD",
				// 			// permission: "accessToAoModule",
				// 			page: "/marches/ao-consultation-add",
				// 			icon: "flaticon-edit-1",
				// 		},
				// 	],
				// },
				{
					title: "طلبات العروض",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.AO",
					permission: "accessToAoModule",
					submenu: [
						{
							title: "programme",
							translate: "MENU.COMPLETER_CONSULTATIONS",
							// permission: "accessToAoModule",
							page: "/marches/ao-consultation-list",
							icon: "flaticon2-list-3",
						},
						// {
						// 	title: "ajouter  besoin pour consultation",
						// 	translate: "MENU.COMPLETER_CONSULTATIONS",
						// 	// permission: "accessToAoModule",
						// 	page: "/marches/ao-consultation-add",
						// 	icon: "flaticon-edit-1",
						// },
						{
							title: "gérer les commissions des ouvertures des plis",
							translate: "MENU.GERER_COMMISSION_OUVERTURES_PLIS",
							// permission: "accessToAoModule",
							page: "/marches/gestion-commission-plis",
							icon: "flaticon-edit-1",
						},
						// {
						// 	title: "لائحة طلبات العروض ",
						// 	icon: "flaticon2-list-3",
						// 	translate: "PAGES.MARCHE.AO.TITRE_INDEX",
						// 	page: "/marches/ao-list",
						// 	permission: "accessToIndexAo",
						// },
						// {
						// 	title: "إضافة طلب العروض",
						// 	icon: "flaticon-edit-1",
						// 	translate: "PAGES.MARCHE.AO.TITRE_NEW",
						// 	page: "/marches/ao-form",
						// 	permission: "canCreateAo",
						// },

					],
				},

				{
					title: "marches",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.MARCHE",
					permission: "accessToMarche",
					submenu: [
						{
							title: "liste des marches ",
							icon: "flaticon2-list-3",
							translate: "PAGES.MARCHE.MARCHE.TITRE_INDEX",
							page: "/marches/marches-list",
							permission: "accessToIndexMarche",
						},
						/*{
							title: "ajouter marche ",
							icon: "flaticon-edit-1",
							translate: "PAGES.MARCHE.MARCHE.TITRE_NEW",
							page: "/marches/marche-new",
							permission: "canCreateMarche",
						},*/

					],
				},
				// {
				// 	title: "consultations",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.CONSULTATION",
				// 	permission: "accessToAoModule",
				// 	submenu: [
				// 		{
				// 			title: "liste des marches ",
				// 			icon: "flaticon2-list-3",
				// 			translate: "PAGES.MARCHE.CONSULTATION_ARCHITECTURALE.TITRE_INDEX",
				// 			page: "/marches/consultation-list",
				// 			permission: "accessToIndexConsultation",
				// 		},
				// 		{
				// 			title: "ajouter marche ",
				// 			icon: "flaticon-edit-1",
				// 			translate: "PAGES.MARCHE.CONSULTATION_ARCHITECTURALE.TITRE_NEW",
				// 			page: "/marches/consultation-form",
				// 			permission: "canCreateConsultation",
				// 		},
				// 	],
				// },
				{
					title: "bonCommande",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.BC",
					permission: "accessToIndexBonCommande",
					submenu: [
						{
							title: "la consultation des bons de commande ",
							icon: "flaticon2-list-3",
							translate: "PAGES.MARCHE.BC.MENU_CONSULTATION_BC",
							page: "/marches/bon-commande-list",
							permission: "accessToIndexBonCommande",
						},
						{
							title: "les bons de commande ",
							icon: "flaticon2-list-3",
							translate: "PAGES.MARCHE.BC.MENU_BC",
							page: "/marches/bon-commande-list-adjuge",
							permission: "accessToIndexBonCommande",
						},

					],
				},
				{
					title: "Contrat de droit public",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.CONTRAT",
					permission: "accessToIndexBonCommande",
					submenu: [
						{
							title: "la consultation des  contrats de droit public ",
							icon: "flaticon2-list-3",
							translate: "PAGES.MARCHE.CONTRAT.MENU_CONSULTATION_CONTRAT",
							page: "/marches/contrat-consultation-list",
							permission: "accessToIndexBonCommande",
						},
						// {
						// 	title: "les bons de commande ",
						// 	icon: "flaticon2-list-3",
						// 	translate: "PAGES.MARCHE.BC.MENU_BC",
						// 	page: "/marches/bon-commande-list-adjuge",
						// 	permission: "accessToIndexBonCommande",
						// },

					],
				},
				// {
				// 	title: "prestataires",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.PRESTATAIRE",
				// 	permission: "accessToAoModule",
				// 	submenu: [
				// 		{
				// 			title: "liste des prestataires ",
				// 			icon: "flaticon2-list-3",
				// 			translate: "PAGES.MARCHE.PRESTATAIRE.TITRE_INDEX",
				// 			page: "/marches/prestataires-list",
				// 			permission: "accessToIndexPrestataireAo",
				// 		},
				// 		{
				// 			title: "ajouter marche ",
				// 			icon: "flaticon-edit-1",
				// 			translate: "PAGES.MARCHE.PRESTATAIRE.TITRE_NEW",
				// 			page: "/marches/prestataire-new",
				// 			permission: "canCreatePrestataireAo",
				// 		},
				// 	],
				// },
				// {
				// 	title: "Disponibilité des fonds",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.FONDS",
				// 	permission: "accessToAoModule",
				// 	page: "/marches/disponibilite-des-fonds",
				// 	// submenu: [
				// 	// 	{
				// 	// 		title: "liste des prestataires ",
				// 	// 		icon: "flaticon2-list-3",
				// 	// 		translate: "PAGES.MARCHE.PRESTATAIRE.TITRE_INDEX",
				// 	// 		page: "/marches/prestataires-list",
				// 	// 		permission: "accessToIndexPrestataireAo",
				// 	// 	},
				// 	// 	{
				// 	// 		title: "ajouter marche ",
				// 	// 		icon: "flaticon-edit-1",
				// 	// 		translate: "PAGES.MARCHE.PRESTATAIRE.TITRE_NEW",
				// 	// 		page: "/marches/prestataire-new",
				// 	// 		permission: "canCreatePrestataireAo",
				// 	// 	},
				// 	// ],
				// },
				{
					title: "Calendrier",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Calendrier des ouvertures des plis",
					permissions: [{ name: "accessToMarcheModule", params: {} }, { name: "accessToCalendrierModule", params: {} }],

					// permission:["accessToMarcheModule","accessToCalendrierModule"],

					submenu: [
						{
							title: "Calendrier des appels d'offres ",
							icon: "flaticon2-list-3",
							translate: "PAGES.CALENDRIER.CALENDRIER_AO",
							page: "/marches/calendrier",
							permissions: [{ name: "accessToMarcheModule", params: {} }, { name: "accessToCalendrierModule", params: {} }],
						},
						{
							title: "Calendrier des bons de commande ",
							icon: "flaticon-edit-1",
							translate: "PAGES.CALENDRIER.CALENDRIER_BC",
							page: "/marches/calendrier-bc",
							permissions: [{ name: "accessToMarcheModule", params: {} }, { name: "accessToCalendrierModule", params: {} }],
						},
						// {
						// 	title: "Programme prévisionnel",
						// 	icon: "flaticon-edit-1",
						// 	translate: "Programme prévisionnel",
						// 	page: "/marches/list-programme-previsionnel",
						// 	permissions: [ { name: "accessToMarcheModule", params: {  } }, { name: "accessToCalendrierModule", params: { }}],
						// },
					],

				},


				{
					title: "Parametrage",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Parametrage",
					permission: "accessToAoModule",

					submenu: [
						{
							title: "Disponibilité des fonds",
							icon: "flaticon2-list-3",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "MENU.FONDS",
							permission: "accessToAoModule",
							page: "/marches/disponibilite-des-fonds",
						},
						{
							title: "liste des prestataires ",
							icon: "flaticon2-list-3",
							translate: "PAGES.MARCHE.PRESTATAIRE.TITRE_INDEX",
							page: "/marches/prestataires-list",
							permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Type AO ",
							icon: "flaticon2-list-3",
							translate: "Type AO",
							page: "/parametrage/list-type-ao",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Catégorie ",
							icon: "flaticon2-list-3",
							translate: "Catégorie",
							page: "/parametrage/list-categorie",
							// permission: "accessToIndexPrestataireAo",
						},

						{
							title: "Type marché ",
							icon: "flaticon2-list-3",
							translate: "Type marché",
							page: "/parametrage/list-type-marche",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Mode Passation",
							icon: "flaticon2-list-3",
							translate: "Mode Passation",
							page: "/parametrage/list-mode-passation",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Agrement",
							icon: "flaticon2-list-3",
							translate: "Agrement",
							page: "/parametrage/list-agrement",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Type Piéce jointe",
							icon: "flaticon2-list-3",
							translate: "Type Piéce jointe",
							page: "/parametrage/list-type-piece-joint",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Qualification",
							icon: "flaticon2-list-3",
							translate: "Qualification",
							page: "/parametrage/list-qualification",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Classification",
							icon: "flaticon2-list-3",
							translate: "Classification",
							page: "/parametrage/list-classification",
							// permission: "accessToIndexPrestataireAo",
						},
						{
							title: "Pourcentages de l'offre financière",
							icon: "flaticon2-list-3",
							translate: "Pourcentages de l'offre financière",
							page: "/marches/pourcentage-offre-financiere",
							// permission: "accessToIndexPrestataireAo",
						},
					],

				},
				// {
				// 	title: "maintien de l'offre",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.MAINTIEN_OFFRE",
				// 	page: "/marches/ao-maintien-offre",
				// 	permission: "accessToAoModule",
				// },
				// {
				// 	title: "Recherche",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "TRANSLATOR.SEARCHE",
				// 	page: "/marches/ao-recherche",
				// 	permission: "accessToAoModule",
				// },
				// {
				// 	title: "Consultation Architecturale",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.CONSULTATION_ARCHITECTURALE",
				// 	//permission: "accessToAoModule",
				// 	submenu: [
				// 		{
				// 			title: "Liste Consultation Architecturale",
				// 			icon: "flaticon2-list-3",
				// 			translate: "PAGES.MARCHE.MARCHE.LISTE_CONSULTATION_ARCHITECTURALE",
				// 			page: "/marches/consultation-architecturale",
				// 			//permission: "accessToIndexPrestataireAo",
				// 		},
				// 		{
				// 			title: "Ajouter Consultation Architecturale ",
				// 			icon: "flaticon-edit-1",
				// 			translate: "PAGES.MARCHE.MARCHE.AJOUTER_CONSULTATION_ARCHITECTURALE",
				// 			page: "/marches/consultation-architecturale-add",
				// 			//permission: "canCreatePrestataireAo",
				// 		},
				// 	],
				// },
				{
					title: "Statistiques",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.STATISTIQUES",
					permission: "accessToAoModule",
					submenu: [
						{
							title: "إحصائيات السوق",
							icon: "flaticon2-pie-chart-1",
							translate: "PAGES.MARCHE.AO.STAT",
							page: "/marches/dashboard",
							permission: "canCreateAo",
						},
						{
							title: "إحصائيات السوق PME",
							icon: "flaticon2-pie-chart-1",
							translate: "PAGES.MARCHE.AO.STATISTIQUE_PME",
							page: "/marches/pme-dashboard",
							permission: "canCreateAo",
						},
						{
							title: "إحصائيات دعوات للمناقصات",
							icon: "flaticon2-pie-chart-1",
							translate: "PAGES.MARCHE.AO.STATISTIQUE_AO",
							page: "/marches/ao-dashboard",
							permission: "canCreateAo",
						},
						{
							title: "Statistiques des  bone des commandes",
							translate: "MENU.BoneCommande",
							permission: "accessToIndexBonCommande",
							page: "/marches/bon-commande-dashboard",
							icon: "flaticon2-pie-chart-1",
						},
						{
							title: "Statistique marche ",
							icon: "flaticon-edit-1",
							translate: "PAGES.MARCHE.MARCHE.STAT",
							page: "/marches/Marchedashboard",
							permission: "canCreateMarche",
						},
					],
				},
			],

		},

		header_programme: {
			self: {},
			items: [
				{
					title: "programme",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.programme",
					permission: "accessToProgramModule",
					submenu: [
						{
							title: "programme",
							translate: "MENU.listProgramme",
							permission: "accessToIndexProgram",
							page: "/programme/list-programme",
							icon: "flaticon2-list-3",
						},
						{
							title: "ajouter un programme",
							translate: "MENU.addProgramme",
							permission: "canCreateProgram",
							page: "/programme/add-programme",
							icon: "flaticon-edit-1",
						},

					],
				},
				// {
				// 	title: "Rétroplanning",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "Rétroplanning",
				// 	permission: "accessToProgramModule",
				// 	page: "/programme/retroplanning-programme",

				// 	// submenu: [
				// 	// 	{
				// 	// 		title: "rétroplanning",
				// 	// 		translate: "MENU.retroplanning",
				// 	// 		// permission: "canCreateProgram",
				// 	// 		page: "/programme/retroplanning-programme",
				// 	// 		icon: "flaticon-edit-1",
				// 	// 	},

				// 	// ],
				// },
				// {
				// 	title: "Définition besoin",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.BESION",
				// 	permission: "accessToNeedConsultationModule",
				// 	submenu: [
				// 		{
				// 			title: "programme",
				// 			translate: "MENU.BESIONLISTEAO",
				// 			permission: "accessToNeedConsultationModule",
				// 			page: "/programme/list-EtudeBesion",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 		{
				// 			title: "Liste des besoins de consultation  des bons de commande",
				// 			translate: "MENU.BESIONLISTEBC",
				// 			permission: "canCreateNeedconsultation",
				// 			page: "/programme/list-EtudeBesion-Bc",
				// 			icon: "flaticon-edit-1",
				// 		},
				// 		{
				// 			title: "Liste des besoins de consultation  des contrats",
				// 			translate: "MENU.BESIONLISTECONTRAT",
				// 			permission: "canCreateNeedconsultation",
				// 			page: "/programme/list-EtudeBesion-Contrat",
				// 			icon: "flaticon-edit-1",
				// 		},

				// 	],
				// },
				{
					title: "Convention",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.Convention",
					permission: "accessToConventionModule",
					submenu: [
						{
							title: "Liste des Conventions",
							translate: "MENU.ListConvention",
							permission: "accessToIndexConvention",
							page: "/convention/listconvention",
							icon: "flaticon2-list-3",
						},
						{
							title: "ajouter un convention",
							translate: "MENU.Ajouterconvention",
							permission: "canCreateConvention",
							page: "/convention/new-convention",
							icon: "flaticon-edit-1",
						},
						{
							title: "Partie prenante",
							translate: "MENU.ListPartiePreneur",
							permission: "accessToIndexPP",
							page: "/convention/PartiePreneurList",
							icon: "flaticon2-list-3",
						},
						{
							title: "ajouter un partie prenante",
							translate: "MENU.AjouterPartiePreneur",
							permission: "canCreatePP",
							page: "/convention/new-PartiePreneur",
							icon: "flaticon-edit-1",
						},
					],
				},
				// {
				// 	title: "Partie prenante",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "MENU.PP",
				// 	permission: "accessToPPModule",
				// 	submenu: [
				// 		{
				// 			title: "Partie prenante",
				// 			translate: "MENU.ListPartiePreneur",
				// 			permission: "accessToIndexPP",
				// 			page: "/convention/PartiePreneurList",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 		{
				// 			title: "ajouter un partie prenante",
				// 			translate: "MENU.AjouterPartiePreneur",
				// 			permission: "canCreatePP",
				// 			page: "/convention/new-PartiePreneur",
				// 			icon: "flaticon-edit-1",
				// 		},
				// 	],
				// },
				{
					title: "Statistiques",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "TRANSLATOR.STATISTIQUES",
					permission: "accessToProgramModule",
					submenu: [
						{
							title: "statistique des projets",
							translate: "MENU.statistiqueProgramme",
							// permission: "canCreateProgram",
							page: "/programme/statistique-programme",

							icon: "flaticon-edit-1",
						},
						// {
						// 	title: "Statistiques des conventions",
						// 	translate: "MENU.statistiqueConvention",
						// 	// permission: "canCreateProgram",
						// 	page: "/convention/statistique-convention",

						// 	icon: "flaticon-edit-1",
						// },
					]
				},
				{
					title: "Paramétrage",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Paramétrage",
					permission: "accessToProgramModule",
					submenu: [
						{
							title: "Paramétrage des natures",
							translate: "Paramétrage des natures",
							// permission: "canCreateProgram",
							page: "/programme/list-nature",
							icon: "flaticon-edit-1",
						}, {
							title: "Paramétrage des themes",
							translate: "Paramétrage des themes",
							// permission: "canCreateProgram",
							page: "/programme/list-theme",
							icon: "flaticon-edit-1",
						}, {
							title: "Paramétrage des sous themes",
							translate: "Paramétrage des sous themes",
							// permission: "canCreateProgram",
							page: "/programme/list-sous-theme",
							icon: "flaticon-edit-1",
						},
						{
							title: "Paramétrage des arrondissements",
							translate: "Paramétrage des arrondissements",
							// permission: "canCreateProgram",
							page: "/programme/list-arrondissement",
							icon: "flaticon-edit-1",
						},
					]
				},
				{
					title: "Tableau de bord",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Tableau de bord",
					permission: "accessToProgramModule",
					submenu: [
						{
							title: "Ajout d'un tableau de bord",
							translate: "Ajout d'un tableau de bord",
							// permission: "canCreateProgram",
							page: "/programme/add-tableau-bord",
							icon: "flaticon-edit-1",
						}, {
							title: "Liste des tableau de bord",
							translate: "Liste des tableau de bord",
							// permission: "canCreateProgram",
							page: "/programme/list-tableau-bord",
							icon: "flaticon-edit-1",
						}, {
							title: "Rétroplanning",
							translate: "Rétroplanning",
							// permission: "canCreateProgram",
							permission: "accessToProgramModule",
							page: "/programme/retroplanning-programme",
							icon: "flaticon-edit-1",
						}
					]
				}
			],
		},
		header_consultationPac: {
			self: {},
			items: [

				{
					title: "Définition besoin",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "MENU.BESION",
					permission: "accessToNeedConsultationModule",
					submenu: [
						{
							title: "programme",
							translate: "MENU.BESIONLISTEAO",
							permission: "accessToNeedConsultationModule",
							page: "/programme/list-EtudeBesion",
							icon: "flaticon2-list-3",
						},
						{
							title: "Liste des besoins de consultation  des bons de commande",
							translate: "MENU.BESIONLISTEBC",
							permission: "canCreateNeedconsultation",
							page: "/programme/list-EtudeBesion-Bc",
							icon: "flaticon-edit-1",
						},
						{
							title: "Liste des besoins de consultation  des contrats",
							translate: "MENU.BESIONLISTECONTRAT",
							permission: "canCreateNeedconsultation",
							page: "/programme/list-EtudeBesion-Contrat",
							icon: "flaticon-edit-1",
						},

					],
				},


			],
		},
		headerBMH: {
			self: {},
			items: [
				{
					title: "Médecine légale",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Médecine légale",
					submenu: [
						{
							title: "Décés naturels",
							translate: "Décés naturels",
							page: "/bmh1/list-deces-naturel",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Décès avec obstacles",
							translate: "Décès par obstacles",
							page: "/bmh1/list-obstacles",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Enterrement",
							translate: "Enterrement",
							page: "/bmh1/list-enterementInhum",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						// {
						// 	title: "Transfert",
						// 	translate: "Transfert",
						// 	page: "/pages/Transfert/list-transfert",
						// 	icon: "flaticon2-list-3",
						// 	//permission: "accessToIndexAssociation",
						// },
						{
							title: "Morgue",
							translate: "Morgue",
							page: "/bmh1/list-morgue",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Fourgon mortuaire",
							translate: "Fourgon mortuaire",
							page: "/bmh1/list-fourgon",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Organisme de transport",
							translate: "Organisme de transport",
							page: "/bmh1/list-organisme",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						
					],
				},
				{
					title: "Contrôle sanitaire",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Contrôle sanitaire",
					//permission: ",
					submenu: [
						{
							title: "Contrôle des établissements",
							translate: "Contrôle des établissements",
							page: "/etablissement/list-etablissement",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Carte sanitaire",
							translate: "Carte sanitaire",
							page: "/cartesanitaire/list-carte",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Action/Decision",
							translate: "Action/Decision",
							page: "/actdecision/list-action",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Programmer la visite",
							translate: "Programmer la visite",
							page: "/etablissement/list-programme",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},

				{
					title: "Vaccination",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Vaccination",
					page: "/vaccination/list-vaccination",
					//permission: ",
				},

				{
					title: "Lutte antivectorielle",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Lutte antivectorielle",
					page: "/sortie/list-sortie",

					//permission: ",
					// submenu: [
					// 	{
					// 		title: "Sortie",
					// 		translate: "Sortie",
					// 		page: "/pages/Sortie/list-sortie",
					// 		icon: "flaticon2-list-3",
					// 		//permission: "accessToIndexAssociation",
					// 	},
					// ],
				},

				{
					title: "Paramétrages",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Paramétrages",
					//permission: ",
					submenu: [
						{
							title: "Médecine légale",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Médecine légale",
							//permission: ",
							submenu: [
								{
									title: "Type",
									translate: "Type",
									icon: "flaticon2-list-3",
									page: "/bmh/list-types",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Constateur",
									translate: "Constateur",
									root: true,
									alignment: "right",
									icon: "flaticon2-list-3",
									page: "/bmh/list-constateur",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Type d'examen",
									translate: "Type d'examen",
									root: true,
									alignment: "right",
									icon: "flaticon2-list-3",
									page: "/bmh/list-type-examen",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Médecin opérant",
									translate: "Médecin opérant",
									alignment: "right",
									root: true,
									icon: "flaticon2-list-3",
									page: "/bmh/list-medecin-operant",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Statut",
									translate: "Statut",
									alignment: "right",
									root: true,
									icon: "flaticon2-list-3",
									page: "/bmh/list-status",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Véhicule",
									translate: "Véhicule",
									alignment: "right",
									root: true,
									icon: "flaticon2-list-3",
									page: "/bmh/list-vehicule",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Conducteur",
									translate: "Conducteur",
									alignment: "right",
									root: true,
									icon: "flaticon2-list-3",
									page: "/bmh/list-conducteur",
									//permission: "accessToIndexAssociation",
								},
								// {
								// 	title: "N°Décés",
								// 	translate: "N°Décés",
								// 	alignment: "right",
								// 	root: true,
								// 	icon: "flaticon2-list-3",
								// 	page: "/pages/Parametrage-bmh/list-deces",
								// 	//permission: "accessToIndexAssociation",
								// },
							],
						},
						{
							title: "Contrôle sanitaire",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Contrôle sanitaire",
							submenu: [
								{
									title: "Type",
									translate: "Type",
									icon: "flaticon2-list-3",
									page: "/bmh/list-type-controle",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Sous-type",
									translate: "Sous-type ",
									icon: "flaticon2-list-3",
									page: "/bmh/list-sous-type",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Type d'analyse demandé",
									translate: "Type d'analyse demandé",
									icon: "flaticon2-list-3",
									page: "/bmh/list-type-analyse",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Décision",
									translate: "Décision",
									icon: "flaticon2-list-3",
									page: "/bmh/list-decision",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Liste des établissements",
									translate: "Liste des établissements",
									icon: "flaticon2-list-3",
									page: "/bmh/list-etablissement",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Agent",
									translate: "Agent",
									icon: "flaticon2-list-3",
									page: "/bmh/list-agent",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Convention",
									translate: "Convention",
									icon: "flaticon2-list-3",
									page: "/bmh/list-convention",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Controleur",
									translate: "Controleur",
									icon: "flaticon2-list-3",
									page: "/bmh/list-controleur",
									//permission: "accessToIndexAssociation",
								},
							],
						},
						{
							title: "Vaccination",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Vaccination",
							//permission: ",
							submenu: [
								{
									title: "Type de vaccination",
									translate: "Type de vaccination",
									icon: "flaticon2-list-3",
									page: "/bmh/list-type-vaccination",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Type de déclaration",
									translate: "Type de déclaration",
									icon: "flaticon2-list-3",
									page: "/bmh/list-type-declarration",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Animal",
									translate: "Animal",
									icon: "flaticon2-list-3",
									page: "/bmh/list-animal",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Traitement effectué",
									translate: "Traitement effectué",
									icon: "flaticon2-list-3",
									page: "/bmh/list-traitement-effectue",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Statut",
									translate: "Statut",
									icon: "flaticon2-list-3",
									page: "/bmh/list-vaccination-statut",
									//permission: "accessToIndexAssociation",
								},
							],
						},
						{
							title: "Lutte antivectorielle",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Lutte antivectorielle",
							//permission: ",
							submenu: [
								{
									title: "Objet de la sortie",
									translate: "Objet de la sortie",
									icon: "flaticon2-list-3",
									alignment: "right",
									root: true,
									page: "/bmh/list-objet-sortie",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Type de traitement",
									translate: "Type de traitement",
									icon: "flaticon2-list-3",
									root: true,
									alignment: "right",

									page: "/bmh/list-type-traitement",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Equipe",
									translate: "Equipe",
									icon: "flaticon2-list-3",
									root: true,
									alignment: "right",

									page: "/bmh/list-equipe",
									//permission: "accessToIndexAssociation",
								},

								{
									title: "Quantité",
									translate: "Quantité",
									icon: "flaticon2-list-3",
									alignment: "right",
									root: true,
									page: "/bmh/list-quantite",
									//permission: "accessToIndexAssociation",
								},
								{
									title: "Produit utilisé",
									translate: "Produit utilisé",
									icon: "flaticon2-list-3",
									alignment: "right",
									root: true,
									page: "/bmh/list-produit-utilise",
									//permission: "accessToIndexAssociation",
								},
							],
						},
						//===============================================================================

						{
							title: "Commune",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Commune",
							page: "/bmh/list-commune",
						},
						{
							title: "Arrondissement",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Arrondissement",
							page: "/bmh/list-arrondissement",
						},
						{
							title: "Quartier",
							root: true,
							alignment: "left",
							toggle: "hover",
							translate: "Quartier",
							page: "/bmh/list-quartier",
						},
						//===============================================================================
					],
				},
				{
					title: "Naissance à domicile",
					translate: "Naissance à domicile",
					page: "/bmh1/list-nouveauNe",
					// icon: "flaticon2-list-3",
					root: true,
					alignment: "left",
					toggle: "hover",
				},
				{
					title: "Statistique",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Statistique",
					page: "/statistiques/statistique-etablissement",
					
					submenu: [
						{
							title: "Médcine légale",
							translate: "Médcine légale",
							icon: "flaticon2-list-3",
							alignment: "right",
							root: true,
							submenu: [
								{
									title: "Décés naturels",
									translate: "Décés naturels",
									class: "test",
									icon: "flaticon2-list-3",
									alignment: "right",
									root: true,
									page: "/statistiques/dashboard",
								},

								{
									title: "Décés non naturels",
									translate: "Décés non naturels",
									class: "test",
									icon: "flaticon2-list-3",
									alignment: "right",
									root: true,
									page: "/statistiques/deces",
								},

							],
						},
						{
							title: "Controle sanitaire",
							translate: "Controle sanitaire",
							icon: "flaticon2-list-3",
							alignment: "right",
							root: true,
							submenu: [
								{
									title: "Etablissement",
									translate: "Etablissement",
									class: "test",
									icon: "flaticon2-list-3",
									alignment: "right",
									root: true,
									page: "/statistiques/statistique-etablissement",
								},

							],
						},
					],
					
				},
				{
					title: "Magasin de stock",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Magasin de stock",
					// page: "/statistiques/dashboard",
					submenu: [
						{
							title: "Produits",
							translate: "Produits",
							icon: "flaticon2-list-3",
							alignment: "right",
							root: true,
							page: "",
						},
						{
							title: "Matériels",
							translate: "Matériels",
							icon: "flaticon2-list-3",
							alignment: "right",
							root: true,
							page: "",
						},
					],
				},
			],
		},

		headerSDL: {
			self: {},
			items: [
				{
					title: "delegataire",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Délégataire",
					//permission: "accessToAssociationModule",
					submenu: [
						{
							title: "Délégitaire",
							translate: "liste des délégataires",
							page: "/delegataire/delegataires",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},
				{
					title: "SDL",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "SDL",
					//permission: "accessToAssociationModule",
					submenu: [
						{
							title: "SDL",
							translate: "Liste des SDL",
							page: "/delegataire/sdl",
							icon: "flaticon2-list-3",
						},
					],
				},
				{
					title: "Paramètrages",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Paramètrages",
					submenu: [
						{
							title: "Structure délégataire",
							translate: "Structure délégataire",
							page: "/parametrage-sdl/list-structure-delegataire",
							icon: "flaticon-edit-1",
						},
						{
							title: "Structure sdl",
							translate: "Structure sdl",
							page: "/parametrage-sdl/list-structure-sdl",
							icon: "flaticon-edit-1",
						},
						{
							title: "Type d'indicateur délégataire",
							translate: "Type d'indicateur délégataire",
							page: "/parametrage-sdl/list-type-indicateur-delegataire",
							icon: "flaticon-edit-1",
						},
						{
							title: "Type d'indicateur sdl",
							translate: "Type d'indicateur sdl",
							page: "/parametrage-sdl/list-type-indicateur-sdl",
							icon: "flaticon-edit-1",
						},
					],
				},
			],

		},
		headerGsmLan: {
			self: {},
			items: [
				{
						title: "Paramètrages",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Paramètrages",
					submenu: [
						{
							title: "Type des forfaits",
							translate: "Type des forfaits",
							page: "/gsmLan/list-type-forfait",
							icon: "flaticon-edit-1",
						},


					],
				}
				// {
				// 	title: " la flotte GSM",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: " la flotte GSM",
				// 	//permission: "accessToAssociationModule",
				// 	submenu: [
				// 		{
				// 			title: " la flotte GSM",
				// 			translate: "liste des flottes GSM",
				// 			page: "/flotte/flottes-gsm",
				// 			icon: "flaticon2-list-3",
				// 			//permission: "accessToIndexAssociation",
				// 		},
				// 		{
				// 			title: "Facturation",
				// 			translate: "Facturation",
				// 			page: "/flotte/facturationGSM",
				// 			icon: "flaticon2-list-3",
				// 			//permission: "accessToIndexAssociation",
				// 		},
				// 		{
				// 			title: "Suivi contrat",
				// 			translate: "Suivi contrat",
				// 			page: "/flotte/suivicontrat",
				// 			icon: "flaticon2-list-3",
				// 			//permission: "accessToIndexAssociation",
				// 		},
				// 	],
				// },
				// {
				// 	title: "La connexion LAN",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "La connexion LAN",
				// 	//permission: "accessToAssociationModule",
				// 	submenu: [
				// 		{
				// 			title: "Liste des connexions LAN",
				// 			translate: "Liste des connexions LAN",
				// 			page: "/flotte/flottes-lan",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 		{
				// 			title: "Facturation",
				// 			translate: "Facturation",
				// 			page: "/flotte/facturationLAN",
				// 			icon: "flaticon2-list-3",
				// 		},
				// 	],
				// },

				// {
				// 	title: "Paramètrages",
				// 	root: true,
				// 	alignment: "left",
				// 	toggle: "hover",
				// 	translate: "Paramètrages",
				// 	submenu: [
				// 		{
				// 			title: "Liste de connexion",
				// 			translate: "Liste de connexion",
				// 			page: "/parametrage/list-connexion",
				// 			icon: "flaticon-edit-1",
				// 		},


				// 	],
				// },

			],
		},

		headerProprete: {
			self: {},
			items: [
				{
					title: "Délégataire propreté",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Délégataire propreté",
					submenu: [
						{
							title: "Délégataires",
							translate: "Délégataire",
							page: "/pages/proprete-personnel/list-personnel",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Flottes",
							translate: "Flotte",
							page: "/pages/proprete-flotte/list-flotte",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Circuits",
							translate: "Circuit",
							page: "/pages/proprete-circuit/list-circuit",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: " Suivre et identifier les équipements et le balayage",
							translate:
								" Suivre et identifier les équipements et le balayage",
							page: "/pages/proprete-circuit/localisation-flotte",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Référentiel de maintenance",
							translate: "Référentiel de maintenance",
							page: "/pages/proprete-maintenance/list-maintenance",
							icon: "flaticon2-list-3",
						},
						{
							title: "Les Points de regroupements",
							translate: "Les Points de regroupements",
							page: "/pages/proprete-regroupement/list-regroupement",
							icon: "flaticon2-list-3",
						},
						{
							title: "Centre de transfert",
							translate: "Centre de transfert",
							page: "/pages/proprete-transfert/centre-transfert",
							icon: "flaticon2-list-3",
						},
					],
				},
				{
					title: "Délégataire décharge",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Délégataire décharge",
					page: "/pages/proprete-decharge/list-decharge",
				},
				{
					title: "Contrats",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Contrats",
					page: "/pages/proprete-contrats/list-contrats",
				},
				{
					title: "Réclamations & Pénalités",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Réclamations & Pénalités",
					submenu: [
						{
							title: "Réclamations",
							translate: "Réclamations",
							page: "/pages/proprete-reclamations-penalites/list-reclamations",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
						{
							title: "Pénalités",
							translate: "Pénalités",
							page: "/pages/proprete-reclamations-penalites/list-penalites",
							icon: "flaticon2-list-3",
							//permission: "accessToIndexAssociation",
						},
					],
				},
				{
					title: "Statistiques",
					root: true,
					alignment: "left",
					toggle: "hover",
					translate: "Statistiques",
					page: "/pages/statistiques/dashboard",
				},
			],
		},


		// ******************************************************************
		// 	                       Tranche 2
		// *********************************************************************

		// ******************************************************************
		// SIDE MENU
		// ******************************************************************
		aside: {
			self: {},
			items: [],
		},
	};




	public get configs(): any {
		return this.defaults;
	}
}
