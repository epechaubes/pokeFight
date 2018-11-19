const lancerCombatBtn = document.querySelector('.lancerCombat');
const validPoke = document.querySelector('.validPoke');
var pokemonChoisi1;
var pokemonChoisi2;
var attaqueChoisie1;
var attaqueChoisie2;
var attaqueChoisie3;
var attaqueChoisie4;
sessionStorage.clear();

// Redirection à la page de selection du pokemon //

function RedirectionJavascriptVersCombat(){
    document.location.href="http://localhost/projets/pokefightVersion2/combat.php"; 
}

// Requête AJAX pour récupérer les données des Pokemons Choisis //

function GetXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

function RequestRecupPokemon(oSelect) {
    var value = oSelect.options[oSelect.selectedIndex].value;
    var xhr   = GetXMLHttpRequest();
    const pokeListNumber = oSelect.options[oSelect.selectedIndex].parentNode.parentNode.id;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            ReadDataRecupPokemon(xhr.responseText, pokeListNumber);
        } 
    };  

    xhr.open('GET', 'requestRecupPokemon.php?poke='+value);
    xhr.send();
}

function ReadDataRecupPokemon(oData, pokeListNumber) {
    console.log(oData)
    var obj = JSON.parse(oData);

    let pokemon_json = "{\"id_pokemon\":"+obj.id+",\"name_pokemon\":\""+obj.name+"\",\"type_pokemon\":\""+obj.type+"\",\"pdv_pokemon\":"+obj.pdv+",\"att_pokemon\":"+obj.att+",\"def_pokemon\":"+obj.def+",\"att_spe_pokemon\":"+obj.att_spe+",\"def_spe_pokemon\":"+obj.def_spe+",\"vit_pokemon\":"+obj.vit+"}";
    sessionStorage.setItem("pokemonFinal_json", pokemon_json);
}

// Requête AJAX pour récupérer les attaques du Pokemon Choisi //

function GetXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

function RequestAttacks(oSelect) {
    var value = oSelect.options[oSelect.selectedIndex].value;
    var xhr   = GetXMLHttpRequest();
    const selectListAttacks1 = document.querySelector('.listAttacks1');
    const selectListAttacks2 = document.querySelector('.listAttacks2');
    const selectListAttacks3 = document.querySelector('.listAttacks3');
    const selectListAttacks4 = document.querySelector('.listAttacks4');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            let response = "<option value=\"Choisissez une attaque\">Choisissez une attaque</option>"+(xhr.responseText);
            selectListAttacks1.innerHTML = selectListAttacks2.innerHTML = selectListAttacks3.innerHTML = selectListAttacks4.innerHTML = response;
        } 
    };      

    xhr.open('GET', 'requestAttacks.php?poke='+value);
    xhr.send();
}

// Requête AJAX pour récupérer les stats des attaques du Pokemon Choisi //

function GetXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

function RequestAttackStats(oSelect) {
    if (oSelect.length == 5){
        oSelect.remove(0);
    }
    var value = oSelect.options[oSelect.selectedIndex].value;
    var xhr   = GetXMLHttpRequest();
    const attackListNumber = oSelect.options[oSelect.selectedIndex].parentNode.className;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            ReadDataStatsAttack(xhr.responseText, attackListNumber);
        } 
    };  

    xhr.open('GET', 'requestDonneesAttack.php?attack='+value);
    xhr.send();
}

function ReadDataStatsAttack(oData, attackListNumber) {
    var obj = JSON.parse(oData);

    switch (attackListNumber){
        case "listAttacks1" :
            let attack1_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+",\"prec_attack\":"+obj.prec+",\"type_attack\":\""+obj.type+"\",\"genre_attack\":\""+obj.genre+"\"}";
            sessionStorage.setItem("attack1_json", attack1_json);
            console.log(attack1_json)
            break;
        case "listAttacks2" :
            let attack2_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+",\"prec_attack\":"+obj.prec+",\"type_attack\":\""+obj.type+"\",\"genre_attack\":\""+obj.genre+"\"}";
            sessionStorage.setItem("attack2_json", attack2_json);
            break;
        case "listAttacks3" :
            let attack3_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+",\"prec_attack\":"+obj.prec+",\"type_attack\":\""+obj.type+"\",\"genre_attack\":\""+obj.genre+"\"}";
            sessionStorage.setItem("attack3_json", attack3_json);
            break;
        case "listAttacks4" :
            let attack4_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+",\"prec_attack\":"+obj.prec+",\"type_attack\":\""+obj.type+"\",\"genre_attack\":\""+obj.genre+"\"}";
            sessionStorage.setItem("attack4_json", attack4_json);
            break;
    }
}

// Validation pokemon et lancement du combat //

validPoke.addEventListener('click', function(event){
    sessionStorage.removeItem('monPokemon');
    if (sessionStorage.getItem("attack1_json") && sessionStorage.getItem("attack2_json") && sessionStorage.getItem("attack3_json") && sessionStorage.getItem("attack4_json")){
        let listAttacks_json = "{\"attacks\":{"+sessionStorage.getItem("attack1_json")+","+sessionStorage.getItem("attack2_json")+","+sessionStorage.getItem("attack3_json")+","+sessionStorage.getItem("attack4_json")+"}}";
        let array = new Array;
        for(name_attack in JSON.parse(listAttacks_json).attacks){
            var newLength = array.push(name_attack);
        }
        if (array.length == 4){  
            let stop = sessionStorage.getItem("pokemonFinal_json").length - 1;
            let monPokemon = sessionStorage.getItem("pokemonFinal_json").slice(0, stop)+",\"attacksList\":"+listAttacks_json+sessionStorage.getItem("pokemonFinal_json").slice(stop)+"";
            sessionStorage.setItem("monPokemon", monPokemon);
            console.log(monPokemon);
        }else{ alert("Vos 4 attaques doivent être différentes"); } 
    } else { alert("Vous devez choisir 4 attaques"); }
});

lancerCombatBtn.addEventListener('click', function(){
    if (!sessionStorage.getItem("monPokemon")){
        alert("Vous devez valider votre pokemon !");
    }else{
        RedirectionJavascriptVersCombat();
    }
})
