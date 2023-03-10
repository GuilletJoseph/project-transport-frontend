import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Profil } from '../../models/profil';
import { ProfilService } from '../../services/profil.service';
import { Ville } from '../../models/ville';
import { VilleService } from '../../services/ville.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  public utilisateurs!: Utilisateur[];
  public editUtilisateur!: Utilisateur | null| undefined;
  public deleteUtilisateur!: Utilisateur| null| undefined;
  public profils!: Profil[];
  public profil!:Profil| null| undefined;
  public villes!: Ville[];
  public ville: Ville | null| undefined;
  constructor(private utilisateurService: UtilisateurService, private profilService: ProfilService,
    private villeService: VilleService ){
  }
  
  ngOnInit() {
    this.getUtilisateurs();
    this.getProfils();
    this.getVilles();
    
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

  public getUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs().subscribe(
      (response: Utilisateur[]) => {
        this.utilisateurs = response;
        console.log(this.utilisateurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddUtilisateur(addForm: NgForm): void {
    document.getElementById('add-utilisateur-form')!.click();
    console.log(addForm.value);

    this.utilisateurService.addUtilisateur(addForm.value).subscribe(
      (response: Utilisateur) => {
        console.log(response);
        this.getUtilisateurs();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUtilisateur(utilisateur: Utilisateur): void {
    console.log(utilisateur);

    this.utilisateurService.updateUtilisateur(utilisateur).subscribe(
      (response: Utilisateur) => {

       console.log(response);
        this.getUtilisateurs();
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
        this.getUtilisateurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUtilisateurs(key: string): void {
    console.log(key);
    const results: Utilisateur[] = [];
    for (const utilisateur of this.utilisateurs) {
      if (utilisateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| utilisateur.idTypeV.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| utilisateur.idBoite.toLowerCase().indexOf(key.toLowerCase()) !== -1
     // || utilisateur.nbPlace.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
      results.push(utilisateur);
      }
    }
    this.utilisateurs = results;
    if (results.length === 0 || !key) {
      this.getUtilisateurs();
    }
  }



  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#addUtilisateurModal');
    container!.appendChild(button);
    button.click();
  
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