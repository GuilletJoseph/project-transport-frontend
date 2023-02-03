import { Boite } from "./boite";
import { TypeV } from "./typev";
import { Utilisateur } from "./utilisateur";

export interface Vehicule {
  id: number;
  name: string;
  idTypeV: TypeV;
  nbPlace: number;
  idBoite: Boite;
  imageUrl: string;
  immatriculation:string;
  idUtilisateur:Utilisateur; 
  
}
