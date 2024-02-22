import { RouterModule, Routes } from "@angular/router";
import { GeneratoreArticoliComponent } from "./components/generatore-articoli/generatore-articoli.component";
import { ArticlesCronoComponent } from "./components/articles-crono/articles-crono.component";

const appRoutes: Routes = [
    {path: 'home', component: GeneratoreArticoliComponent, 
        children: [
            {
                path: 'crono',
                component: ArticlesCronoComponent
            },
    ]},
   
    {path: '**', redirectTo: '/home'}

]
export const routing = RouterModule.forRoot(appRoutes);