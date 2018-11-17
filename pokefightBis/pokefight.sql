-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 26 oct. 2018 à 07:55
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pokefight`
--

-- --------------------------------------------------------

--
-- Structure de la table `attaque`
--

DROP TABLE IF EXISTS `attaque`;
CREATE TABLE IF NOT EXISTS `attaque` (
  `ID_AT` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_ATTAQUE_AT` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PUISSANCE_AT` int(11) NOT NULL,
  PRIMARY KEY (`ID_AT`),
  KEY `NOM_ATTAQUE_AT` (`NOM_ATTAQUE_AT`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `attaque`
--

INSERT INTO `attaque` (`ID_AT`, `NOM_ATTAQUE_AT`, `PUISSANCE_AT`) VALUES
(1, 'Pied Voltige', 85),
(2, 'Pistolet A O', 65),
(3, 'Hydrocanon', 120),
(4, 'Point De Feu', 75),
(5, 'Onde Glace', 75),
(6, 'Pilonnage', 15),
(7, 'Destruction', 130),
(8, 'Lance-Soleil', 120),
(9, 'Seisme', 100),
(10, 'Vive-Attaque', 40),
(11, 'DanseFlamme', 15),
(12, 'Mawashi Geri', 60);

-- --------------------------------------------------------

--
-- Structure de la table `connaitre`
--

DROP TABLE IF EXISTS `connaitre`;
CREATE TABLE IF NOT EXISTS `connaitre` (
  `ID_CO` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_POKEMON_POK` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOM_ATTAQUE_AT` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_CO`),
  KEY `CONNAITRE_FK1` (`NOM_ATTAQUE_AT`),
  KEY `CONNAITRE_FK2` (`NOM_POKEMON_POK`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `connaitre`
--

INSERT INTO `connaitre` (`ID_CO`, `NOM_POKEMON_POK`, `NOM_ATTAQUE_AT`) VALUES
(1, 'Florizarre', 'Lance-Soleil'),
(2, 'Florizarre', 'Seisme'),
(3, 'Florizarre', 'Vive-Attaque'),
(4, 'Florizarre', 'Pilonnage'),
(5, 'Dracaufeu', 'Seisme'),
(6, 'Dracaufeu', 'DanseFlamme'),
(7, 'Dracaufeu', 'Point De Feu'),
(8, 'Dracaufeu', 'Pied Voltige'),
(9, 'Tortank', 'Pistolet A O'),
(10, 'Tortank', 'Hydrocanon'),
(11, 'Tortank', 'Onde Glace'),
(12, 'Tortank', 'Vive-Attaque'),
(13, 'Mew', 'Destruction'),
(14, 'Mew', 'Vive-Attaque'),
(15, 'Mew', 'Mawashi Geri'),
(16, 'Mew', 'Pied Voltige');

-- --------------------------------------------------------

--
-- Structure de la table `pokemons`
--

DROP TABLE IF EXISTS `pokemons`;
CREATE TABLE IF NOT EXISTS `pokemons` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_POKEMON_POK` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `POINT_DE_VIE_POK` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `NOM` (`NOM_POKEMON_POK`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `pokemons`
--

INSERT INTO `pokemons` (`ID`, `NOM_POKEMON_POK`, `POINT_DE_VIE_POK`) VALUES
(1, 'Florizarre', 364),
(2, 'Dracaufeu', 360),
(3, 'Tortank', 362),
(4, 'Mew', 404);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
