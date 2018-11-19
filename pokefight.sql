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
  `PRECISION_AT` int(11) NOT NULL,
  `TYPE_AT` varchar(255) NOT NULL,
  `GENRE_AT` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_AT`),
  KEY `NOM_ATTAQUE_AT` (`NOM_ATTAQUE_AT`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `attaque`
--

INSERT INTO `attaque` (`ID_AT`, `NOM_ATTAQUE_AT`, `PUISSANCE_AT`, `PRECISION_AT`, `TYPE_AT`, `GENRE_AT`) VALUES
(1, 'Lance-flamme', 90, 100, 'feu', 'special'),
(2, 'Roue de feu', 60, 100, 'feu', 'physique'),
(3, 'Flammeche', 40, 100, 'feu', 'special'),
(4, 'Hydrocanon', 110, 80, 'eau', 'special'),
(5, 'Cascade', 80, 100, 'eau', 'physique'),
(6, 'Ecume', 40, 100, 'eau', 'special'),
(7, 'Tempête-verte', 130, 90, 'plante', 'special'),
(8, 'Fouet-Lianes', 45, 100, 'plante', 'physique'),
(9, 'Eco-sphère', 90, 100, 'plante', 'special'),
(10, 'Psyko', 90, 100, 'psy', 'special'),
(11, 'Tonnerre', 90, 100, 'electrique', 'special'),
(12, 'Ultimapoing', 80, 85, 'combat', 'physique'),
(13, 'Abîme', 5000, 30, 'sol', 'physique'),
(14, 'Vive-Attaque', 40, 100, 'normal', 'physique');




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
(1, 'Florizarre', 'Tempête-verte'),
(2, 'Florizarre', 'Fouet-Lianes'),
(3, 'Florizarre', 'Eco-sphère'),
(4, 'Florizarre', 'Ultimapoing'),
(5, 'Florizarre', 'Flammeche'),
(6, 'Florizarre', 'Vive-Attaque'),
(7, 'Dracaufeu', 'Lance-flamme'),
(8, 'Dracaufeu', 'Roue de feu'),
(9, 'Dracaufeu', 'Flammeche'),
(10, 'Dracaufeu', 'Ultimapoing'),
(11, 'Dracaufeu', 'Vive-Attaque'),
(12, 'Dracaufeu', 'Ecume'),
(13, 'Tortank', 'Cascade'),
(14, 'Tortank', 'Hydrocanon'),
(15, 'Tortank', 'Ecume'),
(16, 'Tortank', 'Vive-Attaque'),
(17, 'Tortank', 'Flammeche'),
(18, 'Tortank', 'Psyko'),
(19, 'Mew', 'Abîme'),
(20, 'Mew', 'Vive-Attaque'),
(21, 'Mew', 'Ultimapoing'),
(22, 'Mew', 'Tonnerre'),
(23, 'Mew', 'Psyko'),
(24, 'Mew', 'Eco-sphère');

-- --------------------------------------------------------

--
-- Structure de la table `pokemons`
--

DROP TABLE IF EXISTS `pokemons`;
CREATE TABLE IF NOT EXISTS `pokemons` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_POKEMON_POK` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TYPE_POK` varchar(255) NOT NULL,
  `POINT_DE_VIE_POK` int(11) NOT NULL,
  `ATTAQUE_POK` int(11) NOT NULL,
  `DEFENSE_POK` int(11) NOT NULL,
  `ATTAQUE_SPE_POK` int(11) NOT NULL,
  `DEFENSE_SPE_POK` int(11) NOT NULL,
  `VITESSE_POK` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `NOM` (`NOM_POKEMON_POK`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `pokemons`
--

INSERT INTO `pokemons` (`ID`, `NOM_POKEMON_POK`, `TYPE_POK`, `POINT_DE_VIE_POK`, `ATTAQUE_POK`, `DEFENSE_POK`, `ATTAQUE_SPE_POK`, `DEFENSE_SPE_POK`, `VITESSE_POK`) VALUES
(1, 'Florizarre', 'plante', 364, 263, 265, 299, 299, 259),
(2, 'Dracaufeu', 'feu', 360, 267, 255, 317, 269, 299),
(3, 'Tortank', 'eau', 362, 265, 299, 269, 309, 255),
(4, 'Mew', 'psy', 404, 299, 299, 299 ,299 ,299);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
