import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordCountValidator } from '../../shared/word-validator';
import { imageSizeValidator } from '../../shared/img-size-validator';
import { SingleImageValidator } from '../../shared/single-img-validator';
import { Article, Info, Paragraphs } from '../../model/Article';
import { ArticleService } from '../../service/article.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-generatore-articoli',
  templateUrl: './generatore-articoli.component.html',
  styleUrl: './generatore-articoli.component.scss'
})
export class GeneratoreArticoliComponent implements AfterViewInit{
  articleForm: FormGroup;
  paragraphs: FormArray;
  article: Article = {
    Info: {language: "",
    title: "",
    description: "",
    infoDestinationID: [],
    infoMediaImg: ""
  },
    Paragraphs: [{
      paragraphTitle: [],
      paragraphText: "",
      paragraphDestinationID: ""
    }]
  };
  articles: Article [] = [];
 

  constructor(private fb: FormBuilder, private articleServce: ArticleService, private localStorageService: LocalStorageService) {
    this.articleForm = this.fb.group({
      info: this.fb.group({
        language: ['Italiano', Validators.required],
        title: ['', [Validators.required, WordCountValidator(15)]],
        subTitle: ['',  WordCountValidator(17)],
        description: ['', Validators.required],
        infoDestinationID: ['', Validators.required],
        infoMediaImg: ['', [Validators.required,  imageSizeValidator(1600,1000)]],
      }),
      paragraphs: this.fb.array([
        this.fb.group({
        paragraphTitle: ['', Validators.required],
        paragraphMediaImg: ['', [Validators.required, imageSizeValidator(1600,1000)]],
        paragraphText: ['', Validators.required],
        paragraphDestinationID: ['',  Validators.required]
      })
      ]),
    });
    this.paragraphs = this.articleForm.get('paragraphs') as FormArray;
    
  }
  ngAfterViewInit(): void {
    if(this.articleForm.get('language'))
    this.articleForm.get('language').setValue('Italiano');
  }
  
  addParagraph() {
    const newParagraph = this.fb.group({
      paragraphTitle: ['', Validators.required],
      paragraphMediaImg: ['', [Validators.required,  imageSizeValidator(1600,1000)]],
      paragraphText: ['', Validators.required],
      paragraphDestinationID: ['', [Validators.required]],
    });

    (this.articleForm.get('paragraphs') as FormArray).push(newParagraph);
  }

  clearParagraph(index: number) {
   let paragraphCurr = this.articleForm.get('paragraphs') as FormArray;
    paragraphCurr.controls[index].reset();
  }

  //trasforma il file in base 64 per poi diventare blob successivamente
  ConvertToBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  postFileImgInfo(event: any){
    const file = event.target.files[0];
    const type = file.type;
    
    if(file.type === "image/jpeg"){
        this.ConvertToBase64(file).then(
          (data: any) => {
            // server per rimuovere il tipo del file all'inizio del blob
              // this.article.Info.infoMediaImg = data.substr(data.indexOf(',') + 1);
          }, err => {  
              console.log("errore");
          });;
        } else {
        
        console.log('Il File che si sta tentando di inserire deve essere di tipo ".jpg"');
    }  
  }


  postFileImgParagraph(event: any){
    const file = event.target.files[0];
    const type = file.type;
    
    if(file.type === "image/jpeg"){
        this.ConvertToBase64(file).then(
          (data: any) => {
            let paragraphArray = this.articleForm.get('paragraphs') as FormArray;
            for (let i = 0; i < paragraphArray.length; i++) {
              paragraphArray.at(i).setValue(data.indexOf(',') + 1 + (i + 1));
            }
            //non sono riuscito ad assegnare il valore blob dell'immagine 
            //dei paragrafi correnti tramite index e li assegno solamente al model...
            this.article.Paragraphs.forEach((currpar: Paragraphs) => {
              currpar = data.indexOf(',') + 1;
            })
            // formArray.forEach((currParagraph: Paragraphs) => {
            //   currParagraph.paragraphMediaImg =  data.substr(data.indexOf(',') + 1);
            // });
          }, err => {  
              console.log("errore");
          });;
        } else {
        
        console.log('Il File che si sta tentando di inserire deve essere di tipo ".jpg"');
    }  
  }

  mapFormToArticle(): Article {
    const formValue = this.articleForm.value;
  
    // Mappatura dei valori dell'Info
    const info: Info = {
      language: formValue.info.language,
      title: formValue.info.title,
      description: formValue.info.description,
      infoDestinationID: formValue.info.infoDestinationID,
      infoMediaImg: formValue.info.infoMediaImg,
      subTitle: formValue.info.subTitle
    };
  
    // Mappatura dei valori dei Paragraphs
    const paragraphs: Paragraphs[] = formValue.paragraphs.map((paragraph: any) => {
      return {
        paragraphTitle: paragraph.paragraphTitle,
        paragraphText: paragraph.paragraphText,
        paragraphDestinationID: paragraph.paragraphDestinationID,
        paragraphMediaImg: paragraph.paragraphMediaImg
      };
    });
  
    // Creazione dell'oggetto Article
   this.article = {
      Info: info,
      Paragraphs: paragraphs
    };
 
    return this.article;
  }
  
  

  onSubmit() {
    this.mapFormToArticle();
    // in caso di utilizzo di api BE
    // this.articleServce.postArticle(this.article).subscribe((response) => {
    //   console.log('Articolo inviato con successo:', response);
      
    // }, error => {
    //   console.error('Errore durante l\'invio dell\'articolo:', error);
      
    // });
    console.log(this.article);
    this.articleServce.saveFormValues(this.article);
  }


  onGetArticleCrono(){
    this.articleServce.getArticlesCrono(this.articles);
  }

  
}
