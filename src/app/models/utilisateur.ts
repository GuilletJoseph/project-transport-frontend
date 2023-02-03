import { Vehicule } from "./vehicule"
import { Ville } from "./ville";
import { Profil } from "./profil";
export interface Utilisateur {
    id: number;
    identifiant: string;
    mdp:String;
    idProfil:Profil;
    nom:String;
    prenom:String;
    mail:String;
    tel:String;
    idVille:Ville;
    adresse:String;
    imageUrl:String;
    vehicules:Vehicule[];
}
