import { Component, OnInit } from '@angular/core';
import { Boite } from '../../models/boite';
import { BoiteService } from '../../services/boite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-boite',
  templateUrl: './boite.component.html',
  styleUrls: ['./boite.component.css']
})

export class BoiteComponent implements OnInit {
  public editBoite!: Boite | null | undefined;
  public deleteBoite!: Boite | null | undefined;
  public boite!: Boite | null | undefined;
  public boites!: Boite[];
  constructor(private boiteService: BoiteService){
  }
  
  ngOnInit() {
    this.getBoites();
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
  
  public onAddBoite(addForm: NgForm): void {
    document.getElementById('add-boite-form')!.click();
    this.boiteService.addBoite(addForm.value).subscribe(
      (response: Boite) => {
        console.log(response);
        this.getBoites();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateBoite(boite: Boite): void {
    console.log(boite);

    this.boiteService.updateBoite(boite).subscribe(
      (response: Boite) => {

       console.log(response);
        this.getBoites();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBoite(typeVId: number ): void {
    this.boiteService.deleteBoite(typeVId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBoites();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBoites(key: string): void {
    console.log(key);
    const results: Boite[] = [];
    for (const boite of this.boites) {
      if (boite.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
      results.push(boite);
      }
    }
    this.boites = results;
    if (results.length === 0 || !key) {
      this.getBoites();
    }
  }

  public onOpenModal(boite: Boite | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBoiteModal');
    }
    if (mode === 'edit') {
      this.editBoite = boite;
      button.setAttribute('data-target', '#updateBoiteModal');
    }
    if (mode === 'delete') {
      this.deleteBoite = boite;
      button.setAttribute('data-target', '#deleteBoiteModal');
    }
    container!.appendChild(button);
    button.click();
  }
}

