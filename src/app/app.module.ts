import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GeneratoreArticoliComponent } from './components/generatore-articoli/generatore-articoli.component';
import { ArticleService } from './service/article.service';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    GeneratoreArticoliComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
