<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
	<?php
		try
		{
			$bdd = new PDO('mysql:host=localhost;dbname=pokefight;charset=utf8', 'root', '');
		}
		catch (Exception $e)
		{
		        die('Erreur : ' . $e=getMessage());
		}
	?>
	
	<!-- Liste des pokemons -->

	<p>
		<select id="listPokemon1" onchange="RequestRecupPokemon(this), RequestAttacks(this)">
			<optgroup label="Pokemon1">
			<?php
				$reponse = $bdd->query("SELECT * FROM pokemons");
				while ($donnees = $reponse->fetch()) {
			?>
			<?php echo $donnees['NOM_POKEMON_POK']; ?>
			<option value="<?php echo $donnees["NOM_POKEMON_POK"]; ?>"> <?php echo $donnees["NOM_POKEMON_POK"]; ?> </option>
			
			<?php
			}
			?>
			</optgroup>
		</select>
	</p>
	
	<!-- Listes des attaques pour le pokemon -->

	<p>
		<select onchange="RequestAttackStats(this)">
			<optgroup label="attaque1" class="listAttacks1">
			
			</optgroup>
		</select>
	</p>

	<p>
		<select onchange="RequestAttackStats(this)">
			<optgroup label="attaque2" class="listAttacks2">
			
			</optgroup>
		</select>
	</p>

	<p>
		<select onchange="RequestAttackStats(this)">
			<optgroup label="attaque3" class="listAttacks3">
			
			</optgroup>
		</select>
	</p>

	<p>
		<select onchange="RequestAttackStats(this)">
			<optgroup label="attaque4" class="listAttacks4">
			
			</optgroup>
		</select>
	</p>

	<!-- Choix deuxieme pokemon -->

	<button class="validPoke">valider pokemon</button>

<!-- 	<p>
		<select id="listPokemon2" onchange="Request(this)">
			<optgroup label="Pokemon2">
			<?php
				$reponse = $bdd->query("SELECT * FROM pokemons");
				while ($donnees = $reponse->fetch()) {
			?>
			<?php echo $donnees['NOM_POKEMON_POK']; ?>
			<option value="<?php echo $donnees["NOM_POKEMON_POK"]; ?>"> <?php echo $donnees["NOM_POKEMON_POK"]; ?> </option>
			
			<?php
			}
			?>
			</optgroup>
		</select>
	</p> -->
	
	<a href="combat.php"><button class="lancerCombat">Lancer le combat</button></a>

	<script src="scriptAvance.js" type="text/javascript"></script>
</body>
</html>