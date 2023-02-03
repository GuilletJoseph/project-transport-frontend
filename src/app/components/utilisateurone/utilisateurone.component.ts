import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Profil } from '../../models/profil';
import { ProfilService } from '../../services/profil.service';
import { Ville } from '../../models/ville';
import { VilleService } from '../../services/ville.service';
import { Vehicule } from '../../models/vehicule';
import { VehiculeService } from '../../services/vehicule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateurone.component.html',
  styleUrls: ['./utilisateurone.component.css']
})
export class UtilisateuroneComponent implements OnInit {
  public utilisateur!: Utilisateur | null| undefined;
  public editUtilisateur!: Utilisateur | null| undefined;
  public deleteUtilisateur!: Utilisateur| null| undefined;
  public profils!: Profil[];
  public profil!:Profil| null| undefined;
  public villes!: Ville[];
  public ville: Ville | null| undefined;
  public vehicules!: Vehicule[];
  public vehicule: Vehicule | null| undefined;
  constructor(private route :ActivatedRoute, private utilisateurService: UtilisateurService, private profilService: ProfilService,
    private villeService: VilleService, private vehiculeService: VehiculeService,){
  }
  
  ngOnInit() {
    this.getUtilisateurOne();
    this.getProfils();
    this.getVilles();
    this.getVehicules();
   
  }
  
  public getUtilisateurOne(): void {
    const param=this.route.snapshot.paramMap.get('id');
  const id = param?+param:0;
    this.utilisateurService.getUtilisateurOne(id).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        console.log(this.utilisateur);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getProfils(): void {
    this.profilService.getProfils().subscribe(
      (response: Profil[]) => {
        this.profils = response;
        console.log(this.profils);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (response: Vehicule[]) => {
        this.vehicules = response;
        console.log(this.vehicules);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getVilles(): void {
    this.villeService.getVilles().subscribe(
      (response: Ville[]) => {
        this.villes = response;
        console.log(this.villes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateUtilisateur(utilisateur: Utilisateur): void {
    console.log(utilisateur);

    this.utilisateurService.updateUtilisateur(utilisateur).subscribe(
      (response: Utilisateur) => {

       console.log(response);
       // this.getUtilisateurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUtilisateur(utilisateurId: number ): void {
    this.utilisateurService.deleteUtilisateur(utilisateurId).subscribe(
      (response: void) => {
        console.log(response);
       // this.getUtilisateurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




  public onOpenModal(utilisateur: Utilisateur, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUtilisateurModal');
    }
    if (mode === 'edit') {
      this.editUtilisateur = utilisateur;
      button.setAttribute('data-target', '#updateUtilisateurModal');
    }
    if (mode === 'delete') {
      this.deleteUtilisateur = utilisateur;
      button.setAttribute('data-target', '#deleteUtilisateurModal');
    }
    container!.appendChild(button);
    button.click();
  }
}