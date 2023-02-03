import { Utilisateur } from "./utilisateur";
import { Vehicule } from "./vehicule";
import { Ville } from "./ville";

export interface Anonce {
    id: number;
    idUtilisateur: Utilisateur;
    idVehicule: Vehicule;
    date: string;
    hDebut: string;
    nbPlace: number;
    idVilleDepart:Ville;
    idVilleArrive:Ville;
}
