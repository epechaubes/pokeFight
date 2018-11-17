// Récuperation des deux pokemons dans le storage //

var monPokemon_json = sessionStorage.getItem("monPokemon");
let monObjetPokemon = JSON.parse(monPokemon_json);

// Objet de combat //

class Pokemon{
    constructor(id_pokemon, name_pokemon, pdv_pokemon, attacksList){
        this.id_pokemon = id_pokemon;
        this.name_pokemon = name_pokemon;
        this.pdv_pokemon = pdv_pokemon;
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
    constructor(id_attack, name_attack, power_attack) {
    	this.id_attack = id_attack;
        this.name_attack = name_attack;
        this.power_attack = power_attack;
    } 
    launch(pokemon1, pokemon2) {    // fonction qui calcul les dégâts infligés
        return calculDamage(this.power_attack);
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
	let monattack = new Attack(id, name, power);
	attackListMonPoke.addAttack(monattack);
}

let monPokemon = new Pokemon(monObjetPokemon.id_pokemon, monObjetPokemon.name_pokemon, monObjetPokemon.pdv_pokemon, attackListMonPoke);
console.log(monPokemon);

// Creation du Pokemon advairse en dur //

let flammeche = new Attack(10, 'flammeche', 20);
let eclair = new Attack(11, 'eclair', 35);
let hydrocanon = new Attack(12, 'hydrocanon', 120);
let psycko = new Attack(13, 'psycko', 70);
let attackListPokeAdv = new AttacksList;
attackListPokeAdv.addAttack(eclair);
attackListPokeAdv.addAttack(flammeche);
attackListPokeAdv.addAttack(psycko);
attackListPokeAdv.addAttack(hydrocanon);
let pokeAdv = new Pokemon(42, 'Pikachu', 320, attackListPokeAdv);
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

// Fonction qui calcul les dégats //

function calculDamage(power){
	let damage = power * 1.5;
	return (damage);
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

// Fonction déroulement d'un tour //

function fightTurn(attackMonPoke){
    let attackPokeAdv = advChoiceAttack();

    fight.attack1on2(attackMonPoke);
    console.log(pokeAdv.name_pokemon+" lance "+attackPokeAdv+" !");
    actuLifeBarre(pokeAdv.pdv_pokemon, pokeAdv.name_pokemon);

    fight.attack2on1(attackPokeAdv);
    console.log(monPokemon.name_pokemon+" lance "+attackMonPoke+" !\n\n");
    actuLifeBarre(monPokemon.pdv_pokemon, monPokemon.name_pokemon);
}
