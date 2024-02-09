import { environment } from "../../../../../environments/environment";

export const SharedURLS  =  {
    
    "fonctionnaire" : `${environment.SERVER_URL}`.concat('deraaTafilalt-gestionUtilisateur/fonctionnaire'),
    "role" :`${environment.SERVER_URL}`.concat('deraaTafilalt-gestionUtilisateur/role'),
    "entite" :`${environment.SERVER_URL}`.concat('deraaTafilalt-gestionUtilisateur/entite'),
    "login" :`${environment.SERVER_URL}`.concat('deraaTafilalt-gestionUtilisateur/login'),
    "magasin" :`${environment.SERVER_URL_Stock}`.concat('Stock/magasin/'),
    "article" :`${environment.SERVER_URL_Stock}`.concat('Stock/article/'),
    "articleStock" :`${environment.SERVER_URL_Stock}`.concat('Stock/ArtilceStock/'),
    "CategorieArticle" :`${environment.SERVER_URL_Stock}`.concat('Stock/CategorieArticle/'),
    "transfer" :`${environment.SERVER_URL_Stock}`.concat('Stock/transfert/'),
    "demandeFourniture" :`${environment.SERVER_URL_Stock}`.concat('Stock/demandeFourniture'),
    "sortie" :`${environment.SERVER_URL_Stock}`.concat('Stock/sortie/'),
    "ligneDemandeFourniture" :`${environment.SERVER_URL_Stock}`.concat('Stock/ligneDemandeFourniture'),
    "entiteMagasin" :`${environment.SERVER_URL_Stock}`.concat('Stock/entityMagasin/'),
    "entreeStock" :`${environment.SERVER_URL_Stock}`.concat('Stock/entree/'),
    "fournisseur" :`${environment.SERVER_URL_Stock}`.concat('Stock/fournisseur/'),
    "entreeArticleStock" :`${environment.SERVER_URL_Stock}`.concat('Stock/entreeArticleStock/'),
    "reitegration" :`${environment.SERVER_URL_Stock}`.concat('Stock/reitegration/'),
    "quantiteReapprovisionnement" :`${environment.SERVER_URL_Stock}`.concat('Stock/quantiteReapprovisionnement/'),
     "notification" :`${environment.SERVER_URL_Stock}`.concat('Stock/notification/'),
     "tableauDord" :`${environment.SERVER_URL_Stock}`.concat('Stock/tableauDord'),
     "inventaire" :`${environment.SERVER_URL_Stock}`.concat('Stock/inventaire/'),
     "reference" :`${environment.SERVER_URL_Stock}`.concat('Stock/reference/'), 
///  parc auto 
        "demandeMission":`${environment.SERVER_PARC_AUTO}`.concat('demandeMissison/'),
        "marques" :`${environment.SERVER_PARC_AUTO}`.concat('marques'),
        "garagistes" :`${environment.SERVER_PARC_AUTO}`.concat('garagistes'),
        "categorie-vehicules" :`${environment.SERVER_PARC_AUTO}`.concat('categorie-vehicules'),
        "carte-jawaz" :`${environment.SERVER_PARC_AUTO}`.concat('carte-jawazs'),
        "accessoire-vehicules" :`${environment.SERVER_PARC_AUTO}`.concat('accessoire-vehicules'),
        "carte-carbucartes" :`${environment.SERVER_PARC_AUTO}`.concat('carte-carbucartes'),
        "vehicules" :`${environment.SERVER_PARC_AUTO}`.concat('vehicules'),
        "DemandeProvionne":`${environment.SERVER_PARC_AUTO}`.concat('demandeProvionne/'),
        "Reparation":`${environment.SERVER_PARC_AUTO}`.concat('Reparation/'),
        "Convention":`${environment.SERVER_PARC_AUTO}`.concat('Convention/'),
        "Souche":`${environment.SERVER_PARC_AUTO}`.concat('souche/'),
        "AvanceConvention":`${environment.SERVER_PARC_AUTO}`.concat('avanceConvention/'),
        "VehiculeFonction":`${environment.SERVER_PARC_AUTO}`.concat('vehiculeFonction/'),
        
    }

