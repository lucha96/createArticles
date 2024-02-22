import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordCountValidator } from '../../shared/word-validator';
import { imageSizeValidator } from '../../shared/img-size-validator';
import { SingleImageValidator } from '../../shared/single-img-validator';
import { Article, Info, Paragraphs } from '../../model/Article';
import { ArticleService } from '../../service/article.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-articles-crono',
  templateUrl: './articles-crono.component.html',
  styleUrl: './articles-crono.component.scss'
})
export class ArticlesCronoComponent implements OnInit{

  constructor(private articleServce: ArticleService){}

  ngOnInit(): void {
   this.onGetArticleCrono()
  }
  
  articles: Article [] = [];
  paragraphsCrono: Paragraphs[] = [];

  

  onGetArticleCrono(){
    this.articles = this.articleServce.getArticlesCrono();
    if(this.articles){
      this.articles.forEach((article: Article) =>{
        this.paragraphsCrono.push(...article.Paragraphs);
      })
    }
  
  }
  

  
}
