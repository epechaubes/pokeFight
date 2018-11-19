<?php

    try
        {
            $bdd = new PDO('mysql:host=localhost;dbname=pokefight;charset=utf8', 'root', '');
        }
        catch (Exception $e)
        {
                die('Erreur : ' . $e=getMessage());
        } 

    $poke = $_GET['value'] ?? 'default';

    $pokeStats = $bdd->prepare("
        SELECT ID, NOM_POKEMON_POK, POINT_DE_VIE_POK, TYPE_POK, ATTAQUE_POK, DEFENSE_POK, ATTAQUE_SPE_POK, DEFENSE_SPE_POK, VITESSE_POK
        FROM pokemons 
        Where NOM_POKEMON_POK= :poke
        ");

    $pokeStats->execute(array(':poke'=>$_GET['poke']));  
    while ($stat = $pokeStats->fetch()){
        $id = $stat['ID'];
        $name = $stat['NOM_POKEMON_POK'];
        $pdv = $stat['POINT_DE_VIE_POK'];
        $type = $stat['TYPE_POK'];
        $att = $stat['ATTAQUE_POK'];
        $def = $stat['DEFENSE_POK'];
        $att_spe = $stat['ATTAQUE_SPE_POK'];
        $def_spe = $stat['DEFENSE_SPE_POK'];
        $vit = $stat['VITESSE_POK'];
    }
    
    $txt = "{\"id\":\"$id\",\"name\":\"$name\",\"type\":\"$type\",\"pdv\":\"$pdv\",\"att\":\"$att\",\"def\":\"$def\",\"att_spe\":\"$att_spe\",\"def_spe\":\"$def_spe\",\"vit\":\"$vit\"}";
    echo $txt;

?>