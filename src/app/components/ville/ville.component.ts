import { Component, OnInit } from '@angular/core';
import { Ville } from '../../models/ville';
import { VilleService } from '../../services/ville.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})

export class VilleComponent implements OnInit {
  public editVille!: Ville | null | undefined;
  public deleteVille!: Ville | null | undefined;
  public ville!: Ville | null | undefined;
  public villes!: Ville[];
  constructor(private villeService: VilleService){
  }
  
  ngOnInit() {
    this.getVilles();
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
  
  public onAddVille(addForm: NgForm): void {
    document.getElementById('add-ville-form')!.click();
    this.villeService.addVille(addForm.value).subscribe(
      (response: Ville) => {
        console.log(response);
        this.getVilles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateVille(ville: Ville): void {
    console.log(ville);

    this.villeService.updateVille(ville).subscribe(
      (response: Ville) => {

       console.log(response);
        this.getVilles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteVille(typeVId: number ): void {
    this.villeService.deleteVille(typeVId).subscribe(
      (response: void) => {
        console.log(response);
        this.getVilles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
  public searchVilles(key: string): void {
    console.log(key);
    const results: Ville[] = [];
    for (const ville of this.villes) {
      if (ville.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
      results.push(ville);
      }
    }
    this.villes = results;
    if (results.length === 0 || !key) {
      this.getVilles();
    }
  }

  public onOpenModal(ville: Ville | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVilleModal');
    }
    if (mode === 'edit') {
      this.editVille = ville;
      button.setAttribute('data-target', '#updateVilleModal');
    }
    if (mode === 'delete') {
      this.deleteVille = ville;
      button.setAttribute('data-target', '#deleteVilleModal');
    }
    container!.appendChild(button);
    button.click();
  }
}

