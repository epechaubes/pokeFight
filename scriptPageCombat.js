// Tableau des Types en dur //

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

// Récuperation des deux pokemons dans le storage //

var monPokemon_json = sessionStorage.getItem("monPokemon");
let monObjetPokemon = JSON.parse(monPokemon_json);

// Redirection à la page de selection du pokemon //

function RedirectionJavascriptVersIndex(){
    document.location.href="http://localhost/projets/pokefightVersion2/index.php"; 
}

// Fonctions utiles aux calculs des dégâts //

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

// Fonction qui calcul les dégats //

function calculDamage (attaque, defense, attaque_spe, defense_spe, power, modificateur, critique, genre) {
    if (genre == 'special'){
        let att = attaque_spe;
        let def = defense_spe;
    }
    else{
        let att = attaque;
        let def = defense;
    }
    let degats = (((((2*100)+10)/250)*(attaque/defense)*power)+2)*modificateur;
    if (critique){
        degats = degats*1.5;
    }
    return degats;
}

// Fonction messages de combats //

function messageCombat(degats, critique, bonusType, echecCritique, pokemon1, pokemon2, name){
    console.log(pokemon1.name_pokemon+" lance "+name+" !");
    if (echecCritique){
        console.log("Echec critique !\n\n");
    }
    else{
        console.log(degats);
        if(critique){
            console.log("Coup critique !");
        }
        if(bonusType == 2){
            console.log("C'est super éfficace !\n\n");
        }
        else if(bonusType == 0.5){
            console.log("Ce n'est pas très efficace ...\n\n");
        }
        else{
            console.log("\n\n")
        }
    }
}

// Objet de combat //

class Pokemon{
    constructor(id_pokemon, name_pokemon, type_pokemon, pdv_pokemon, att_pokemon, def_pokemon, att_spe_pokemon, def_spe_pokemon, vit_pokemon, attacksList){
        this.id_pokemon = id_pokemon;
        this.name_pokemon = name_pokemon;
        this.type_pokemon = type_pokemon;
        this.pdv_pokemon = pdv_pokemon;
        this.att_pokemon = att_pokemon;
        this.att_spe_pokemon = att_spe_pokemon;
        this.def_pokemon = def_pokemon;
        this.def_spe_pokemon = def_spe_pokemon;
        this.vit_pokemon =vit_pokemon;
        this.attacksList = attacksList;
    }
    attack(name, pokemon){
        let attack = this.attacksList.getAttack(name);
        pokemon.damage(attack.launch(this, pokemon));
    }
    damage(pdv){
        this.pdv_pokemon -= pdv;
    }
}

class AttacksList {     // Création des objets qui contiennent une liste d'attaques
    constructor(attacks = {}) {     // On construit un objet constitué d'objets
        this.attacks = attacks;
    }
    addAttack(attack) {     // Permet d'ajouter une attaque à la liste
        this.attacks[attack.name_attack] = attack;     
    }
    getAttack(name)  {      // Permet de récuperer une attaque
        return this.attacks[name];
    }
}

class Attack {
    constructor(id_attack, name_attack, power_attack, prec_attack, type_attack, genre_attack) {
    	this.id_attack = id_attack;
        this.name_attack = name_attack;
        this.power_attack = power_attack;
        this.prec_attack = prec_attack;
        this.type_attack = type_attack;
        this.genre_attack = genre_attack;
    } 
    launch(pokemon1, pokemon2) {    // fonction qui calcul les dégâts infligés     messageCombat(degats, critique, bonusType, echecCritique)
        let modifEchecCritique = echecCritique(this.prec_attack);
        if (echecCritique(this.prec_attack)){
            console.log("Echec critique !\n\n");
            return null;
        }
        let modifType = bonusType(tableauType, this.type_attack, pokemon2.type_pokemon);
        let modifStab = bonusStab(pokemon1.type_pokemon, this.type_attack);
        let modifAleatoire = bonusAleatoire();
        let modifCoupCrit = coupCritique();
        let dommagesTotaux = calculDamage(pokemon1.att_pokemon, pokemon2.def_pokemon, pokemon1.attaque_spe_pokemon, pokemon2.defense_spe_pokemon, this.power_attack, modificateur(modifType, modifStab, modifAleatoire), coupCritique(), this.genre_attack);
        messageCombat(dommagesTotaux, modifCoupCrit, modifType, modifEchecCritique, pokemon1, pokemon2, this.name_attack);
        return dommagesTotaux;
    }
}

class Fight{
    constructor(pokemon1, pokemon2){
        this.pokemon1 = pokemon1;
        this.pokemon2 = pokemon2;
    }
    attack1on2(name){
        this.pokemon1.attack(name, this.pokemon2);
    }
    attack2on1(name){
        this.pokemon2.attack(name, this.pokemon1);
    }
}

// Creation de monPoke //

let attackListMonPoke = new AttacksList;
for(name_attack in monObjetPokemon.attacksList.attacks){
	let id = monObjetPokemon.attacksList.attacks[name_attack].id_attack;
	let name = monObjetPokemon.attacksList.attacks[name_attack].name_attack;
	let power = monObjetPokemon.attacksList.attacks[name_attack].power_attack;
    let prec = monObjetPokemon.attacksList.attacks[name_attack].prec_attack;
    let type = monObjetPokemon.attacksList.attacks[name_attack].type_attack;
    let genre = monObjetPokemon.attacksList.attacks[name_attack].genre_attack;
	let monattack = new Attack(id, name, power, prec, type, genre);
	attackListMonPoke.addAttack(monattack);
}

let monPokemon = new Pokemon(monObjetPokemon.id_pokemon, monObjetPokemon.name_pokemon, monObjetPokemon.type_pokemon, monObjetPokemon.pdv_pokemon, monObjetPokemon.att_pokemon, monObjetPokemon.def_pokemon ,monObjetPokemon.att_spe_pokemon, monObjetPokemon.def_spe_pokemon, monObjetPokemon.vit_pokemon, attackListMonPoke);
console.log(monPokemon);

// Creation du Pokemon advairse en dur //

let ventViolent = new Attack(15, 'Vent violent', 110, 70, 'vol', 'special');
let lanceFlamme = new Attack(1, 'Lance-flamme', 90, 100, 'feu', 'special');
let flammeche = new Attack(3, 'Flammeche', 40, 100, 'feu', 'special');
let aeropique = new Attack(16, 'Aéropique', 60, 100, 'vol', 'physique');
let attackListPokeAdv = new AttacksList;
attackListPokeAdv.addAttack(ventViolent);
attackListPokeAdv.addAttack(flammeche);
attackListPokeAdv.addAttack(lanceFlamme);
attackListPokeAdv.addAttack(aeropique);
let pokeAdv = new Pokemon(5, 'Sulfura', 'feu', 384, 299, 279, 349, 269, 279, attackListPokeAdv);
console.log(pokeAdv);

// Création des barres de vie //

function addPdvBarre (parent, vieMax, name) { 
	var pdv = document.createElement("progress"); 
	pdv.id = 'barreDeVie'+name;
	pdv.setAttribute("max", vieMax);
	parent.appendChild(pdv); 
}

let pdvBarrePokeAdv = document.querySelector('.pdvBarreAdv');
let pdvBarreMonPoke = document.querySelector('.pdvBarrePoke');
addPdvBarre(pdvBarrePokeAdv, pokeAdv.pdv_pokemon, pokeAdv.name_pokemon);
addPdvBarre(pdvBarreMonPoke, monPokemon.pdv_pokemon, monPokemon.name_pokemon);

// Function qui actualise les barres de vie //

function actuLifeBarre(vie, name){
	let barreDeVie = document.getElementById('barreDeVie'+name);
	barreDeVie.setAttribute("value", vie);
}

// Creation de l'interface d'attaque //

function addAttacksInterf(parent, attack){
	var button = document.createElement("button");
	button.setAttribute("onclick", 'fightTurn(this.innerHTML)');
	var txt = document.createTextNode(attack);
	button.appendChild(txt);
	parent.appendChild(button);
}

let attacksInterf = document.querySelector('.pokeAttacks');
for(name_attack in monPokemon.attacksList.attacks){
	addAttacksInterf(attacksInterf, name_attack);
}

// Creation de l'objet fight //

let fight = new Fight(monPokemon, pokeAdv);

// Choix aléatoire d'une attaque adverse //

function advChoiceAttack(){
    let array = new Array;
    for (var property1 in pokeAdv.attacksList.attacks){
        let newLength = array.push(pokeAdv.attacksList.attacks[property1]);
    }
    return array[Math.floor(Math.random()*4)].name_attack;
}

// Fonction fin de combat //

function endOfFight(pdvRestant){
    if(pdvRestant <= 0){
        return true;
    }
    return false;
}

// Fonction déroulement d'un tour //

function fightTurn(attackMonPoke){
    let attackPokeAdv = advChoiceAttack();

    if (pokeAdv.vit_pokemon > monPokemon.vit_pokemon){
        fight.attack2on1(attackPokeAdv);
        actuLifeBarre(monPokemon.pdv_pokemon, monPokemon.name_pokemon);
        if(endOfFight(monPokemon.pdv_pokemon)){
        alert("Votre pokemon est K.O. Vous avez perdu ...\nChoisissez un nouveau pokemon.")
        RedirectionJavascriptVersIndex();
        }

        fight.attack1on2(attackMonPoke);
        actuLifeBarre(pokeAdv.pdv_pokemon, pokeAdv.name_pokemon);
        if(endOfFight(pokeAdv.pdv_pokemon)){
        alert("Le pokemon adverse est K.O. Vous avez gagné !\nChoisissez un nouveau pokemon.")
        RedirectionJavascriptVersIndex();
        }
    }
    else{
        fight.attack1on2(attackMonPoke);
        actuLifeBarre(pokeAdv.pdv_pokemon, pokeAdv.name_pokemon);
        if(endOfFight(pokeAdv.pdv_pokemon)){
        alert("Le pokemon adverse est K.O. Vous avez gagné !\nChoisissez un nouveau pokemon.")
        RedirectionJavascriptVersIndex();
        }

        fight.attack2on1(attackPokeAdv);
        actuLifeBarre(monPokemon.pdv_pokemon, monPokemon.name_pokemon);
        if(endOfFight(monPokemon.pdv_pokemon)){
        alert("Votre pokemon est K.O. Vous avez perdu ...\nChoisissez un nouveau pokemon.")
        RedirectionJavascriptVersIndex();
        }
    }
 }   