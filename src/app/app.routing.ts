import { RouterModule, Routes } from "@angular/router";
import { GeneratoreArticoliComponent } from "./components/generatore-articoli/generatore-articoli.component";

const appRoutes: Routes = [
    {path: 'home', component: GeneratoreArticoliComponent},
   
    {path: '**', redirectTo: '/home'}
]
export const routing = RouterModule.forRoot(appRoutes);