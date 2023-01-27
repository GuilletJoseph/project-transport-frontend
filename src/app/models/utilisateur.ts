export interface Utilisateur {
    id: number;
    identifiant: string;
    mdp:String;
    idProfil:Object;
    nom:String;
    prenom:String;
    mail:String;
    tel:String;
    idVille:Object;
    adresse:String;
    imageUrl:String;
    vehicules:Object[];
   
}
