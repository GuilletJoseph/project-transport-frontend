import { Component, OnInit } from '@angular/core';
import { Anonce } from '../../models/anonce';
import { AnonceService } from '../../services/anonce.service';
import { Vehicule } from '../../models/vehicule';
import { VehiculeService } from '../../services/vehicule.service';
import { Ville } from '../../models/ville';
import { VilleService } from '../../services/ville.service';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-anonce',
  templateUrl: './anonce.component.html',
  styleUrls: ['./anonce.component.css']
})
export class AnonceComponent implements OnInit {
  public anonces!: Anonce[];
  public editAnonce!: Anonce | null| undefined;
  public deleteAnonce!: Anonce| null| undefined;

  public utilisateur!: Utilisateur | null| undefined;
  public utilisateurs!: Utilisateur[];

  public vehicule!: Vehicule | null| undefined;
  public vehicules!: Vehicule[];
  constructor(private anonceService: AnonceService, private vehiculeService: VehiculeService, private utilisateurService: UtilisateurService ){
  }
  
  ngOnInit() {
    this.getAnonces();
    this.getVehicules();
    this.getUtilisateurs();
    
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

  public getAnonces(): void {
    this.anonceService.getAnonces().subscribe(
      (response: Anonce[]) => {
        this.anonces = response;
        console.log(this.anonces);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddAnonce(addForm: NgForm): void {
    document.getElementById('add-anonce-form')!.click();
    console.log(addForm.value);

    this.anonceService.addAnonce(addForm.value).subscribe(
      (response: Anonce) => {
        
        console.log(response);
        this.getAnonces();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAnonce(anonce: Anonce): void {
    console.log(anonce);

    this.anonceService.updateAnonce(anonce).subscribe(
      (response: Anonce) => {

       console.log(response);
        this.getAnonces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAnonce(anonceId: number ): void {
    this.anonceService.deleteAnonce(anonceId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAnonces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAnonces(key: string): void {
    console.log(key);
    const results: Anonce[] = [];
    for (const anonce of this.anonces) {
      //if (anonce..toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| anonce.idTypeV.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| anonce.idBoite.toLowerCase().indexOf(key.toLowerCase()) !== -1
     // || anonce.nbPlace.toLowerCase().indexOf(key.toLowerCase()) !== -1
     //)
      {
      results.push(anonce);
      }
    }
    this.anonces = results;
    if (results.length === 0 || !key) {
      this.getAnonces();
    }
  }



  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#addAnonceModal');
    container!.appendChild(button);
    button.click();
  
}




  public onOpenModal(anonce: Anonce, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAnonceModal');
    }
    if (mode === 'edit') {
      this.editAnonce = anonce;
      button.setAttribute('data-target', '#updateAnonceModal');
    }
    if (mode === 'delete') {
      this.deleteAnonce = anonce;
      button.setAttribute('data-target', '#deleteAnonceModal');
    }
    container!.appendChild(button);
    button.click();
  }
}