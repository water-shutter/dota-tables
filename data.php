<?php
// File to read all the heroes stats. All of the data is read from https://dota2.fandom.com.
header("Content-Type: text/plain");
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$all_heroes = array("Abaddon", "Alchemist", "Ancient_Apparition", "Anti-Mage", "Arc_Warden", "Axe", "Bane", "Batrider", "Beastmaster", "Bloodseeker", "Bounty_Hunter", "Brewmaster", "Bristleback", "Broodmother", "Centaur_Warrunner", "Chaos_Knight", "Chen", "Clinkz", "Clockwerk", "Crystal_Maiden", "Dark_Seer", "Dark_Willow", "Dawnbreaker", "Dazzle", "Death_Prophet", "Disruptor", "Doom", "Dragon_Knight", "Drow_Ranger", "Earthshaker", "Earth_Spirit", "Elder_Titan", "Ember_Spirit", "Enchantress", "Enigma", "Faceless_Void", "Grimstroke", "Gyrocopter", "Hoodwink", "Huskar", "Invoker", "Io", "Jakiro", "Juggernaut", "Keeper_of_the_Light", "Kunkka", "Legion_Commander", "Leshrac", "Lich", "Lifestealer", "Lina", "Lion", "Lone_Druid", "Luna", "Lycan", "Magnus", "Marci", "Mars", "Medusa", "Meepo", "Mirana", "Monkey_King", "Morphling", "Muerta", "Naga_Siren", "Nature's_Prophet", "Necrophos", "Night_Stalker", "Nyx_Assassin", "Ogre_Magi", "Omniknight", "Oracle", "Outworld_Destroyer", "Pangolier", "Phantom_Assassin", "Phantom_Lancer", "Phoenix", "Primal_Beast", "Puck", "Pudge", "Pugna", "Queen_of_Pain", "Razor", "Riki", "Rubick", "Sand_King", "Shadow_Demon", "Shadow_Fiend", "Shadow_Shaman", "Silencer", "Skywrath_Mage", "Slardar", "Slark", "Snapfire", "Sniper", "Spectre", "Spirit_Breaker", "Storm_Spirit", "Sven", "Techies", "Templar_Assassin", "Terrorblade", "Tidehunter", "Timbersaw", "Tinker", "Tiny", "Treant_Protector", "Troll_Warlord", "Tusk", "Underlord", "Undying", "Ursa", "Vengeful_Spirit", "Venomancer", "Viper", "Visage", "Void_Spirit", "Warlock", "Weaver", "Windranger", "Winter_Wyvern", "Witch_Doctor", "Wraith_King", "Zeus");

function SpaceToUnderscore($text){
	return str_replace(" ", "_", $text);
}
function FixKey($key){
	$key = SpaceToUnderscore($key);
	$key = str_replace("growth", "gain", $key);
	$key = str_replace("intelligence", "int", $key);
	$key = str_replace("agility", "agi", $key);
	$key = str_replace("strength", "str", $key);
	$key = str_replace("title", "name", $key);
	return $key;
}
function FixValue($val){
	$val = SpaceToUnderscore($val);
	$val = str_replace("File:", "", $val);
	return $val;
}

function GetHero($hero_name){
	$url = "https://dota2.fandom.com/wiki/".$hero_name."?action=edit";
	$page = file_get_contents($url);
	$pos1 = strpos($page, "{{Hero infobox");
	$pos2 = strpos($page, "}}", $pos1);
	$hero_info = substr($page, $pos1, $pos2-$pos1);
	$raw_data = explode("\n", $hero_info);
	$hero = array();
	foreach($raw_data as $data){
		if(substr($data, 0, 2) != "| "){
			continue;
		}
		$data_parts = explode(" = ", substr($data, 2));
		if(count($data_parts) != 2){
			echo "Cannot parse data for ". $hero_name."; data = ".$data."\n";
			continue;
		}

		$hero[FixKey($data_parts[0])] = FixValue($data_parts[1]);
	}
	unset($hero["allstars"]);
	unset($hero["releasedate"]);
	unset($hero["hid"]);
	unset($hero["aghshard"]);
	unset($hero["aghanimsupgrade"]);
	unset($hero["gib_type"]);
	unset($hero["image"]);
	unset($hero["intern"]);
	return $hero;
}
function GetAllHeroes(){
	global $all_heroes;
	$heroes_data = array();
	foreach($all_heroes as $hero){
		array_push($heroes_data, GetHero($hero));
	}
	return json_encode($heroes_data);
}

print_r(GetAllHeroes());
?>