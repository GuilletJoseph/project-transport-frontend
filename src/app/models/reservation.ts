
import { Utilisateur } from "./utilisateur"
import { Anonce } from "./anonce"
export interface Reservation {
    id: number;
    idReservant: Utilisateur;
    idAnonce: Anonce;
}
