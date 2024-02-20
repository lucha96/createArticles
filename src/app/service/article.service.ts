import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../model/Article";
import { LocalStorageService } from 'ngx-webstorage';
import { FormGroup } from "@angular/forms";

@Injectable()
export class ArticleService {

    constructor(private http: HttpClient, private localStorage: LocalStorageService) { }


    // in caso di utilizzo di be mockato o stubbato
    postArticle(articleData: Article): Observable<Article> {
        return this.http.post<Article>('url_dell_api', articleData);
    }

    //in caso di utilizzo di local storage
    saveFormValues(form: Article) {
        // Recupera l'array di form dal localStorage
        const forms: Article[] = this.localStorage.retrieve('formData') || [];
        // Aggiungi il nuovo form all'array
        forms.push(form);

        // Salva l'array aggiornato di forms nel localStorage
        this.localStorage.store('formData', forms);
    }

    //Per recuperare la cronologia con tutti gli articoli presenti nel localeStorage
    getArticlesCrono(article: Article[]) {  
         const storedData = this.localStorage.retrieve('formData');
        if (storedData) {
            article = [...storedData];
            console.log(article);
        }
       
      }


}