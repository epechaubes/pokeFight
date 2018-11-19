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

        
	$pokeAttaque = $bdd->prepare("
		SELECT ID_AT, attaque.NOM_ATTAQUE_AT
		FROM attaque 
		INNER JOIN connaitre 
		ON attaque.NOM_ATTAQUE_AT = connaitre.NOM_ATTAQUE_AT 
		Where connaitre.NOM_POKEMON_POK= :poke
		");
	$pokeAttaque->execute(array(':poke'=>$_GET['poke']));
	while ($attaque = $pokeAttaque->fetch()){	
		echo '<option value="'.$attaque["NOM_ATTAQUE_AT"].'">'; 
		echo $attaque['NOM_ATTAQUE_AT'];
		echo '</option>';
		}
?>