/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Initialisation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const lvl = 100;

function pokemon(nom, type, pv, att, def, attSpe, defSpe, vit){
    this.nom = nom;
    this.typeElem = type
    this.pointVie = pv;
    this.attaque = att;
    this.defense = def;
    this.attaqueSpe = attSpe; 
    this.defenseSpe = defSpe;
    this.vitesse = vit;
}

var salameche = new pokemon("salameche", "feu", 282, 203, 218, 185, 199, 229);
var carapuce = new pokemon("carapuce", "eau", 292, 195, 229, 199, 227, 185);
var bulbizarre = new pokemon("bulbizarre", "plante", 294, 197, 197, 229, 229, 189);

function attaque(nom, type, puissance, precision, genre){
    this.nom = nom;
    this.typeAttaque = type;
    this.puissance = puissance;
    this.precision = precision;
    this.genre = genre;
}

var flammeche = new attaque("flammeche", "feu", 40, 100, "special");
var deflagration = new attaque("deflagration", "feu", 110, 85, "special");
var pistoletAO = new attaque("pistoletAO", "eau", 40, 100, "special");
var hydrocanon = new attaque("hydrocanon", "eau", 110, 80, "special");
var trancheHerbe = new attaque("trancheHerbe", "plante", 55, 95, "physique");
var ecoSphere = new attaque("ecoSphere", "plante", 90, 100, "special");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Declaration du tableau des types ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tableauType =
                [
                        ["", "combat", "dragon", "eau", "electrick", "feu", "glace", "insect", "normal", "plante", "poison", "psy", "roche", "sol", "spectre", "vol"],
                        ["combat", "1", "1", "1", "1", "1", "1", "0.5", "1", "1", "1", "2", "0.5", "1", "1", "2"],
                        ["dragon", "1", "2", "0.5", "0.5", "0.5", "2", "1", "1", "0.5", "1", "1", "1", "1", "1", "1"],
                        ["eau", "1", "1", "0.5", "2", "0.5", "0.5", "1", "1", "2", "1", "1", "1", "1", "1", "1"],
                        ["electrick", "1", "1", "1", "0.5", "1", "1", "1", "1", "1", "1", "1", "1", "2", "1", "0.5"],
                        ["feu", "1", "1", "2", "1", "0.5", "1", "0.5", "1", "0.5", "1", "1", "2", "2", "1", "1"],
                        ["glace", "2", "1", "1", "1", "2", "0.5", "1", "1", "1", "1", "1", "2", "1", "1", "1"],
                        ["insect", "0.5", "1", "1", "1", "2", "1", "1", "1", "0.5", "2", "1", "2", "0.5", "1", "2"],
                        ["normal", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "1"],
                        ["plante", "1", "1", "0.5", "0.5", "2", "2", "2", "1", "0.5", "2", "1", "1", "0.5", "1", "2"],
                        ["poison", "0.5", "1", "1", "1", "1", "1", "2", "1", "0.5", "0.5", "2", "1", "2", "1", "1"],
                        ["psy", "0.5", "1", "1", "1", "1", "1", "2", "1", "1", "1", "0.5", "1", "1", "0", "1"],
                        ["roche", "2", "1", "2", "1", "0.5", "1", "1", "0.5", "2", "0.5", "1", "1", "2", "1", "0.5"],
                        ["sol", "1", "1", "2", "0", "1", "2", "1", "1", "2", "0.5", "1", "0.5", "1", "1", "1"],
                        ["spectre", "0", "1", "1", "1", "1", "1", "0.5", "0", "1", "0.5", "1", "1", "1", "2", "1"],
                        ["vol", "0.5", "1", "1", "2", "1", "2", "0.5", "1", "0.5", "1", "1", "2", "0", "1", "1"]
                ];

const deflagrationatt = document.querySelector('.deflagrationatt');
const flammecheatt = document.querySelector('.flammecheatt')
const pistoletAOatt = document.querySelector('.pistoletAOatt')
const hydrocanonatt = document.querySelector('.hydrocanonatt')
var valeur;

deflagrationatt.addEventListener('click', function(event){
    valeur = 'deflagration';
    console.log(valeur)
    console.log(valeur[puissance])
})

flammecheatt.addEventListener('click', function(event){
    valeur = 'flammeche';
    console.log(valeur)
})

pistoletAOatt.addEventListener('click', function(event){
    valeur = 'pistoletAO';
    console.log(valeur)
})

hydrocanonatt.addEventListener('click', function(event){
    valeur = 'hydrocanon';
    console.log(valeur)
    console.log(valeur.puissance)
})

for (nom in pokemon) {
    console.log(pokemon[nom])
}

// const choixAttaque = document.querySelector('.choixAttaque')
// const choix = document.querySelector('.choix')

// choixAttaque.addEventListener('click', function(event){
//     console.log(choix.innerHTML)
// })


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Déterminations des nécéssaires pour le calcul de dégâts ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function bonusType (tableau, typeAttaque, typeDefense) {
        let colonne = 0;
        let ligne = 0;
        for (var i=0; i<16; i++) {
            if (tableau[0][i] == (typeDefense)) {
                for (var j=1; j<16; j++) {
                    if (tableau[j][0] == (typeAttaque)) {
                        colonne = i;
                        ligne = j;
                    }
                }
            }
        }
        return (tableau[colonne][ligne]);
} 

function bonusStab (pokeType, typeAttaque){
        if (typeAttaque == pokeType){
            return 1.5;
        }
        else{
            return 1;
        }
}

function bonusAleatoire() {
        let nb = Math.random()*15;
        let bonusFinal = (85.0 + nb)/100;
        return bonusFinal;
}

function modificateur (type, stab, aleatoire){
        let modif = type*stab*aleatoire;
        return modif;
}

function coupCritique(){
        let A = Math.random()*100;
        if (A <= 6.25){
            return true;
        }
        else{
            return false;
        }
}

function echecCritique(precAttaque){
        let A = Math.random()*100;
        let echecCritique;
        if (A <= precAttaque) {
            echecCritique = false;
        }
        else{
            echecCritique = true;
        }
        return echecCritique;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Calcul des dégâts ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculDegats (lvl, attaque, defense, puissance, modificateur, critique) {
        let degats = (((((2*lvl)+10)/250)*(attaque/defense)*puissance)+2)*modificateur;
        if (critique){
            degats = degats*1.5;
        }
        return degats;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Affichage des messages de l'action ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function messageCombat(degats, critique, bonusType, echecCritique){
        if (echecCritique){
            console.log("Echec critique !");
        }
        else{
            console.log(degats);
            if(critique){
                console.log("Coup critique !");
            }
            if(bonusType == 2){
                console.log("C'est super éfficace !");
            }
            else if(bonusType == 0.5){
                console.log("Ce n'est pas très efficace ...");
            }
        }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Appel des fonctions - Execution du code ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var bonusType = bonusType(tableauType, valeur.typeAttaque, carapuce.typeElem);
var bonusStab = bonusStab(salameche.typeElem, valeur.typeAttaque);
var bonusAleatoire = bonusAleatoire();
var modificateurFinal = modificateur(bonusType, bonusStab, bonusAleatoire);
var coupCritique = coupCritique();
var echecCritique = echecCritique(valeur.precision);
var degatsFinaux = calculDegats(lvl, salameche.attaqueSpe, carapuce.defenseSpe, valeur.puissance, modificateurFinal, coupCritique);

messageCombat(degatsFinaux, coupCritique, bonusType, echecCritique);

































