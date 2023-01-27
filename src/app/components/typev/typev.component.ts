import { Component, OnInit } from '@angular/core';
import { TypeV } from '../../models/typev';
import { TypevService } from '../../services/typev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-typev',
  templateUrl: './typev.component.html',
  styleUrls: ['./typev.component.css']
})

export class TypeVComponent implements OnInit {
  public editTypeV!: TypeV | null | undefined;
  public deleteTypeV!: TypeV | null | undefined;
  public typeV!: TypeV | null | undefined;
  public typeVs!: TypeV[];
  constructor(private typevService: TypevService){
  }
  
  ngOnInit() {
    this.getTypeVs();
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
  
  public onAddTypeV(addForm: NgForm): void {
    document.getElementById('add-typev-form')!.click();
    this.typevService.addTypeV(addForm.value).subscribe(
      (response: TypeV) => {
        console.log(response);
        this.getTypeVs();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTypeV(typev: TypeV): void {
    console.log(typev);

    this.typevService.updateTypeV(typev).subscribe(
      (response: TypeV) => {

       console.log(response);
        this.getTypeVs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTypeV(typeVId: number ): void {
    this.typevService.deleteTypeV(typeVId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTypeVs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTypeVs(key: string): void {
    console.log(key);
    const results: TypeV[] = [];
    for (const typev of this.typeVs) {
      if (typev.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| typev.idTypeV.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| typev.idBoite.toLowerCase().indexOf(key.toLowerCase()) !== -1
     // || typev.nbPlace.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
      results.push(typev);
      }
    }
    this.typeVs = results;
    if (results.length === 0 || !key) {
      this.getTypeVs();
    }
  }

  public onOpenModal(typev: TypeV | null | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTypeVModal');
    }
    if (mode === 'edit') {
      this.editTypeV = typev;
      button.setAttribute('data-target', '#updateTypeVModal');
    }
    if (mode === 'delete') {
      this.deleteTypeV = typev;
      button.setAttribute('data-target', '#deleteTypeVModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
