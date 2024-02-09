import { Article } from "./article";
import { ArticleStock } from "./article-stock";
import { Transfer } from "./transfer";

export class TransferArticleStock {
        quantite:number;
        rayonnage:string;
        prixAchat:number;
        quantiteMin:number;
        article:Article;
        transfer:Transfer;
}
