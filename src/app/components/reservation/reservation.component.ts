import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Anonce } from '../../models/anonce';
import { AnonceService } from '../../services/anonce.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public reservations!: Reservation[];
  public editReservation!: Reservation | null| undefined;
  public deleteReservation!: Reservation| null| undefined;

  public utilisateur!: Utilisateur | null| undefined;
  public utilisateurs!: Utilisateur[];
  public anonce!: Anonce | null| undefined;
  public anonces!: Anonce[];
  constructor(private reservationService: ReservationService, private anonceService: AnonceService,private utilisateurService: UtilisateurService){
  }
  
  ngOnInit() {
    this.getReservations();
    this.getAnonces();
    this.getUtilisateurs();
    
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

  public getReservations(): void {
    this.reservationService.getReservations().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
        console.log(this.reservations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddReservation(addForm: NgForm): void {
    document.getElementById('add-reservation-form')!.click();
    console.log(addForm.value);

    this.reservationService.addReservation(addForm.value).subscribe(
      (response: Reservation) => {
        
        console.log(response);
        this.getReservations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateReservation(reservation: Reservation): void {
    console.log(reservation);

    this.reservationService.updateReservation(reservation).subscribe(
      (response: Reservation) => {

       console.log(response);
        this.getReservations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteReservation(reservationId: number ): void {
    this.reservationService.deleteReservation(reservationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getReservations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchReservations(key: string): void {
    console.log(key);
    const results: Reservation[] = [];
    for (const reservation of this.reservations) {
     // if (reservation.id.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| reservation.idTypeV.toLowerCase().indexOf(key.toLowerCase()) !== -1
      //|| reservation.idBoite.toLowerCase().indexOf(key.toLowerCase()) !== -1
     // || reservation.nbPlace.toLowerCase().indexOf(key.toLowerCase()) !== -1
    // ) 
     {
      results.push(reservation);
      }
    }
    this.reservations = results;
    if (results.length === 0 || !key) {
      this.getReservations();
    }
  }



  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#addReservationModal');
    container!.appendChild(button);
    button.click();
  
}




  public onOpenModal(reservation: Reservation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addReservationModal');
    }
    if (mode === 'edit') {
      this.editReservation = reservation;
      button.setAttribute('data-target', '#updateReservationModal');
    }
    if (mode === 'delete') {
      this.deleteReservation = reservation;
      button.setAttribute('data-target', '#deleteReservationModal');
    }
    container!.appendChild(button);
    button.click();
  }
}