import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../../models/vehicule';
import { VehiculeService } from '../../services/vehicule.service';
import { TypeV } from '../../models/typev';
import { TypevService } from '../../services/typev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TypeVComponent } from '../typev/typev.component';
@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  public vehicules!: Vehicule[];
  public editVehicule!: Vehicule | null | undefined;
  public deleteVehicule!: Vehicule | null | undefined;
  public typeV!: TypeV | null | undefined;
  public typeVs!: TypeV[];
  constructor(private vehiculeService: VehiculeService, private typevComponent: TypeVComponent){
  }
  
  ngOnInit() {
    this.getVehicules();
    this.typevComponent.getTypeVs();
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

  public onOpenModal(vehicule: Vehicule | null | undefined, mode: string): void {
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