<?php

    try
        {
            $bdd = new PDO('mysql:host=localhost;dbname=pokefight;charset=utf8', 'root', '');
        }
        catch (Exception $e)
        {
                die('Erreur : ' . $e=getMessage());
        } 

    $attack = $_GET['value'] ?? 'default';

        
	$statsAttack = $bdd->prepare("
		SELECT ID_AT, NOM_ATTAQUE_AT, PUISSANCE_AT
		FROM attaque 
		Where NOM_ATTAQUE_AT = :attack
		");
	$statsAttack->execute(array(':attack'=>$_GET['attack']));
	while ($stats = $statsAttack->fetch()){
		$id_attack = $stats['ID_AT'];
		$name_attack = $stats['NOM_ATTAQUE_AT'];
		$power_attack = $stats['PUISSANCE_AT'];
	}

	$txt = "{\"id\":\"$id_attack\",\"name\":\"$name_attack\",\"power\":\"$power_attack\"}";
    echo $txt;
?>