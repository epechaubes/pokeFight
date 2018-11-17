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
        SELECT ID, NOM_POKEMON_POK, POINT_DE_VIE_POK
        FROM pokemons 
        Where NOM_POKEMON_POK= :poke
        ");

    $pokeStats->execute(array(':poke'=>$_GET['poke']));  
    while ($stat = $pokeStats->fetch()){
        $id = $stat['ID'];
        $name = $stat['NOM_POKEMON_POK'];
        $pdv = $stat['POINT_DE_VIE_POK'];
    }
    
    $txt = "{\"id\":\"$id\",\"name\":\"$name\",\"pdv\":\"$pdv\"}";
    echo $txt;

?>