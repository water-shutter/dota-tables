var G = {
	universal_hero_dmg_multiplier: 0.7
};

function GetValueForHero(hero_index) {
	let hero = heroes[hero_index];
	var formula = $("#formula_input").val();
	var level = $("#level_input").val();
	var replaceable = ["str", "str_gain", "agi", "agi_gain", "int", "int_gain", "attack_damage_min", "attack_damage_max", "health_regen", "mana_regen", "armor", "movement_speed", "attack_speed", "attack_range", "attack_point", "attack_backswing", "range_type", "base_attack_time", "sight_range_day", "sight_range_night", "turn_rate", "collision_size", "legs"];
	for (let text of replaceable) {
		formula = formula.replaceAll("{" + text + "}", heroes[hero_index][text])
	}
	formula = formula.replaceAll("{level}", level);

	let damage_gain_per_attr = {
		"Strength": hero["str_gain"],
		"Agility": hero["agi_gain"],
		"Intelligence": hero["int_gain"],
		"Universal": G.universal_hero_dmg_multiplier * (hero["str_gain"] * 1 + hero["agi_gain"] * 1 + hero["int_gain"] * 1),
	};
	var damage_gain = damage_gain_per_attr[hero["primary_attribute"]];
	formula = formula.replaceAll("{damage_gain}", damage_gain);


	let damage_base_per_attr = {
		"Strength": hero["str"],
		"Agility": hero["agi"],
		"Intelligence": hero["int"],
		"Universal": G.universal_hero_dmg_multiplier * (hero["str"] * 1 + hero["agi"] * 1 + hero["int"] * 1),
	};
	var damage_base = damage_base_per_attr[hero["primary_attribute"]];
	formula = formula.replaceAll("{damage_base}", damage_base);

	return eval(formula);
}

function GetHeroImgText(hero_index) {
	let hero = heroes[hero_index];
	let attribute_classes = {
		"Strength": "str-glow",
		"Agility": "agi-glow",
		"Intelligence": "int-glow",
		"Universal": "uni-glow",
	};
	let src = "./icons/" + hero.icon;

	return `<img class="hero_icon ${attribute_classes[hero["primary_attribute"]]}" src="${src}">`;
}

function UpdateStats(stats, value, hero) {
	let value_rounded = Math.round(value);
	var hero_attr = hero.primary_attribute;
	var range_type = hero.range_type;
	stats[hero_attr].total += value;
	stats[hero_attr].count++;
	stats[hero_attr].avg = (stats[hero_attr].total / stats[hero_attr].count);
	if (value >= stats[hero_attr].max) {
		if (value > stats[hero_attr].max) {
			stats[hero_attr].max_name = "";
		}
		stats[hero_attr].max = value;
		stats[hero_attr].max_name += hero.name + ", ";
	}
	if (value <= stats[hero_attr].min) {
		if (value < stats[hero_attr].min) {
			stats[hero_attr].min_name = "";
		}
		stats[hero_attr].min = value;
		stats[hero_attr].min_name += hero.name + ", ";
	}

	stats[range_type].total += value;
	stats[range_type].count++;
	stats[range_type].avg = (stats[range_type].total / stats[range_type].count);
	if (value >= stats[range_type].max) {
		if (value > stats[range_type].max) {
			stats[range_type].max_name = "";
		}
		stats[range_type].max = value;
		stats[range_type].max_name += hero.name + ", ";
	}
	if (value <= stats[range_type].min) {
		if (value < stats[range_type].min) {
			stats[range_type].min_name = "";
		}
		stats[range_type].min = value;
		stats[range_type].min_name += hero.name + ", ";
	}

	stats["all"].total += value;
	stats["all"].count++;
	stats["all"].avg = (stats["all"].total / stats["all"].count);
	if (value >= stats["all"].max) {
		if (value > stats["all"].max) {
			stats["all"].max_name = "";
		}
		stats["all"].max = value;
		stats["all"].max_name += hero.name + ", ";
	}
	if (value <= stats["all"].min) {
		if (value < stats["all"].min) {
			stats["all"].min_name = "";
		}
		stats["all"].min = value;
		stats["all"].min_name += hero.name + ", ";
	}
	return stats;
}

function ShowStats(stats) {
	$("#stats").html("");
	var text = "";
	var order = ["all", "Strength", "Agility", "Intelligence", "Universal", "Melee", "Ranged"];
	for (let title of order) {
		text += "<h4>" + title + "</h4>";
		text += "<ul>";
		text += "<li>Minimum is/are " + stats[title].min_name.slice(0, -2) + " = " + stats[title].min.toFixed(2) + "</li>";
		text += "<li>Maximum is/are " + stats[title].max_name.slice(0, -2) + " = " + stats[title].max.toFixed(2) + "</li>";
		text += "<li>Average is " + stats[title].avg.toFixed(2) + "</li>";
		text += "</ul>";
	}
	$("#stats").html(text);
}

function Render() {
	var stats = {
		"Strength": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
		"Agility": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
		"Intelligence": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
		"Universal": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
		"Melee": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
		"Ranged": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
		"all": {
			"min": Number.POSITIVE_INFINITY,
			"max": Number.NEGATIVE_INFINITY,
			"min_name": "",
			"max_name": "",
			"total": 0,
			"count": 0,
			"avg": 0
		},
	};
	var results = [];
	var hero_list = [];
	for (let index = 0; index < heroes.length; index++) {
		results.push([GetValueForHero(index), index]);
		hero_list.push(heroes[index].name);
	}
	results.sort((a, b) => {
		return a[0] - b[0];
	});
	$("#result").html("");
	var previous_value = -1;
	var previous_cell_el = -1;
	for (let result of results) {
		let value = Math.round(result[0]);
		let index = result[1];
		let hero = heroes[index];
		if (previous_cell_el == -1 || value != previous_value) {
			previous_cell_el = $(`<td>${GetHeroImgText(index)}</td>`);
			let row = $(`<tr></tr>`);
			row.append($(`<td>${value}</td>`));
			row.append(previous_cell_el);
			$("#result").append(row);
		} else {
			previous_cell_el.html(previous_cell_el.html() + " " + GetHeroImgText(index))
		}

		stats = UpdateStats(stats, result[0], hero);

		previous_value = value;
	}
	ShowStats(stats);
	console.log(stats);
}

function RenderIfChanged() {
	var formula = $("#formula_input").val();
	var level = $("#level_input").val();

	if (formula != G.formula || level != G.level) {
		G.formula = formula;
		G.level = level;
		Render();
	}

}

function SetUp() {
	for (let index = 0; index < heroes.length; index++) {
		$("#all_heroes").append(GetHeroImgText(index));
	}
	G.formula = $("#formula_input").val();
	G.level = $("#level_input").val();
	Render();
	setInterval(() => {
		RenderIfChanged();
	}, 100);
}