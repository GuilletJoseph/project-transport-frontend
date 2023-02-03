import { Component, OnInit } from '@angular/core';
import { Profil } from '../../models/profil';
import { ProfilService } from '../../services/profil.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  public editProfil!: Profil | null | undefined;
  public deleteProfil!: Profil | null | undefined;
  public profil!: Profil | null | undefined;
  public profils!: Profil[];
  constructor(private profilService: ProfilService){
  }
  
  ngOnInit() {
    this.getProfils();
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
  
  public onAddProfil(addForm: NgForm): void {
    document.getElementById('add-profil-form')!.click();
    this.profilService.addProfil(addForm.value).subscribe(
      (response: Profil) => {
        console.log(response);
        this.getProfils();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProfil(profil: Profil): void {
    console.log(profil);

    this.profilService.updateProfil(profil).subscribe(
      (response: Profil) => {

       console.log(response);
        this.getProfils();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProfil(typeVId: number ): void {
    this.profilService.deleteProfil(typeVId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProfils();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProfils(key: string): void {
    console.log(key);
    const results: Profil[] = [];
    for (const profil of this.profils) {
      if (profil.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
      results.push(profil);
      }
    }
    this.profils = results;
    if (results.length === 0 || !key) {
      this.getProfils();
    }
  }

  public onOpenModal(profil: Profil | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProfilModal');
    }
    if (mode === 'edit') {
      this.editProfil = profil;
      button.setAttribute('data-target', '#updateProfilModal');
    }
    if (mode === 'delete') {
      this.deleteProfil = profil;
      button.setAttribute('data-target', '#deleteProfilModal');
    }
    container!.appendChild(button);
    button.click();
  }
}


