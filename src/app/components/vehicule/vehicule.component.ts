import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../../models/vehicule';
import { VehiculeService } from '../../services/vehicule.service';
import { TypeV } from '../../models/typev';
import { TypevService } from '../../services/typev.service';
import { Boite } from '../../models/boite';
import { BoiteService } from '../../services/boite.service';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  public vehicules!: Vehicule[];
  public editVehicule!: Vehicule | null| undefined;
  public deleteVehicule!: Vehicule| null| undefined;
  public typeV!: TypeV| null| undefined; 
  public typeVs!: TypeV[];
  public utilisateur!: Utilisateur | null| undefined;
  public utilisateurs!: Utilisateur[];
  public boite!: Boite | null | undefined;
  public boites!: Boite[];
  constructor(private vehiculeService: VehiculeService, private typevService: TypevService,
    private boiteService: BoiteService, private utilisateurService: UtilisateurService,){
  }
   
  ngOnInit() {
    this.getVehicules();
    this.getTypeVs();
    this.getBoites();
    this.getUtilisateurs();
  }
  
  public getBoites(): void {
    this.boiteService.getBoites().subscribe(
      (response: Boite[]) => {
        this.boites = response;
        console.log(this.boites);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTypeVs(): void {
    this.typevService.getTypeVs().subscribe(
      (response: TypeV[]) => {
        this.typeVs = response;
        console.log(this.typeVs);
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
  public onAddVehicule(addForm: NgForm): void {
    document.getElementById('add-vehicule-form')!.click();
    console.log(addForm.value);

    this.vehiculeService.addVehicule(addForm.value).subscribe(
      (response: Vehicule) => {
        
        console.log(response);
        this.getVehicules();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateVehicule(vehicule: Vehicule): void {
    console.log(vehicule);

    this.vehiculeService.updateVehicule(vehicule).subscribe(
      (response: Vehicule) => {

       console.log(response);
        this.getVehicules();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteVehicule(vehiculeId: number ): void {
    this.vehiculeService.deleteVehicule(vehiculeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getVehicules();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchVehicules(key: string): void {
    console.log(key);
    const results: Vehicule[] = [];
    for (const vehicule of this.vehicules) {
      if (vehicule.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| vehicule.idTypeV.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| vehicule.idBoite.toLowerCase().indexOf(key.toLowerCase()) !== -1
     // || vehicule.nbPlace.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
      results.push(vehicule);
      }
    }
    this.vehicules = results;
    if (results.length === 0 || !key) {
      this.getVehicules();
    }
  }



  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#addVehiculeModal');
    container!.appendChild(button);
    button.click();
  
}




  public onOpenModal(vehicule: Vehicule, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVehiculeModal');
    }
    if (mode === 'edit') {
      this.editVehicule = vehicule;
      button.setAttribute('data-target', '#updateVehiculeModal');
    }
    if (mode === 'delete') {
      this.deleteVehicule = vehicule;
      button.setAttribute('data-target', '#deleteVehiculeModal');
    }
    container!.appendChild(button);
    button.click();
  }
}