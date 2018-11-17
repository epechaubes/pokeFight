const lancerCombatBtn = document.querySelector('.lancerCombat');
const validPoke = document.querySelector('.validPoke');
var pokemonChoisi1;
var pokemonChoisi2;
var attaqueChoisie1;
var attaqueChoisie2;
var attaqueChoisie3;
var attaqueChoisie4;
sessionStorage.clear();

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
    var obj = JSON.parse(oData);

    let pokemon_json = "{\"id_pokemon\":"+obj.id+",\"name_pokemon\":\""+obj.name+"\",\"pdv_pokemon\":"+obj.pdv+"}";
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
            let response = (xhr.responseText);
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
            let attack1_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+"}";
            sessionStorage.setItem("attack1_json", attack1_json);
            break;
        case "listAttacks2" :
            let attack2_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+"}";
            sessionStorage.setItem("attack2_json", attack2_json);
            break;
        case "listAttacks3" :
            let attack3_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+"}";
            sessionStorage.setItem("attack3_json", attack3_json);
            break;
        case "listAttacks4" :
            let attack4_json = "\""+obj.name+"\":{\"id_attack\":"+obj.id+",\"name_attack\":\""+obj.name+"\",\"power_attack\":"+obj.power+"}";
            sessionStorage.setItem("attack4_json", attack4_json);
            break;
    }
}

// Creation du JSON du pokemon (stats et attaques) //

// validPoke.addEventListener('click', function(event){

//     let listAttacks_json = "\"attacksList\":{\"attacks\":{"+sessionStorage.getItem("attack1_json")+","+sessionStorage.getItem("attack2_json")+","+sessionStorage.getItem("attack3_json")+","+sessionStorage.getItem("attack4_json")+"}}";
//     let stop = sessionStorage.getItem("pokemonFinal_json").length - 1;
//     let monPokemon = sessionStorage.getItem("pokemonFinal_json").slice(0, stop)+","+listAttacks_json+sessionStorage.getItem("pokemonFinal_json").slice(stop);
//     sessionStorage.setItem("monPokemon", monPokemon);
//     console.log(monPokemon)
// })


validPoke.addEventListener('click', function(event){
    if (sessionStorage.getItem("attack1_json") && sessionStorage.getItem("attack2_json") && sessionStorage.getItem("attack3_json") && sessionStorage.getItem("attack4_json")){
        let listAttacks_json = "\"attacksList\":{\"attacks\":{"+sessionStorage.getItem("attack1_json")+","+sessionStorage.getItem("attack2_json")+","+sessionStorage.getItem("attack3_json")+","+sessionStorage.getItem("attack4_json")+"}}";
        let stop = sessionStorage.getItem("pokemonFinal_json").length - 1;
        let monPokemon = sessionStorage.getItem("pokemonFinal_json").slice(0, stop)+","+listAttacks_json+sessionStorage.getItem("pokemonFinal_json").slice(stop);
        sessionStorage.setItem("monPokemon", monPokemon);
        console.log(monPokemon);
    } else {
        alert("Vous devez choisir 4 attaques !");
    }
});