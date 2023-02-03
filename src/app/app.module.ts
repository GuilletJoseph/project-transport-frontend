import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AnonceComponent } from './components/anonce/anonce.component';
import { BoiteComponent } from './components/boite/boite.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { TypeVComponent } from './components/typev/typev.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { VilleComponent } from './components/ville/ville.component';
import { VehiculeService } from './services/vehicule.service';
import { AnonceService } from './services/anonce.service';
import { BoiteService } from './services/boite.service';

import { RouterModule, Routes} from '@angular/router';
import { UtilisateuroneComponent } from './components/utilisateurone/utilisateurone.component';

const appRoutes: Routes=[
{path:'', component:AnonceComponent},
{path:'boite', component:BoiteComponent},
{path:'profil', component:ProfilComponent},
{path:'reservation', component:ReservationComponent},
{path:'typev', component:TypeVComponent},
{path:'utilisateur', component:UtilisateurComponent},
{path:'vehicule', component:VehiculeComponent},
{path:'ville', component:VilleComponent},
{path:'anonce', component:AnonceComponent},
{path:'utilisateur/:id', component:UtilisateuroneComponent}
]





@NgModule({
  declarations: [
    AppComponent,
    AnonceComponent,
    BoiteComponent,
    ProfilComponent,
    ReservationComponent,
    TypeVComponent,
    UtilisateurComponent,
    VehiculeComponent,
    VilleComponent,
    UtilisateuroneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,
RouterModule.forRoot(appRoutes)
  ],
  providers: [VehiculeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

