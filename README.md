# dota-tables

## How to use:

Go to https://water-shutter.github.io/dota-tables to access the website.

You can basicaly write any formula into the formula bar and use the following variables to read from each hero:

### Basic variables:
- {str}: Base strength at level 0
- {agi}: Base agility at level 0
- {int}: Base intelligence at level 0
- {str_gain}: Strength gain per level
- {agi_gain}: Agility gain per level
- {int_gain}: Intelligence gain per level
- {attack_damage_min}: Minimum attack damage without base stats
- {attack_damage_max}: Maximum attack damage without base stats
- {health_regen}: Base health regen without base stats
- {mana_regen}: Base mana regen without base stats
- {armor}: Base armor wihout base stats
- {movement_speed}: Base movement spped
- {attack_speed}: Base attack speed
- {attack_range}: Attack range
- {attack_point}: Attack point
- {attack_backswing}: Attack backswing
- {base_attack_time}: BAT
- {sight_range_day}: Sight range during day
- {sight_range_night}: Sight range during night
- {turn_rate}: Turn rate
- {collision_size}: Collision size
- {legs}: How many legs

### Special variables:
- {level}: Reads the level input in the website
- {damage_gain}: Damage gain per level based on primary attribute
- {damage_base}: Base damage from attributes based on primary attributes. At level 0, total damage is {attack_damage_min} + {damage_base}

## Examples you can try:

Average damage at level:
```
({attack_damage_min} + {attack_damage_max} + {damage_base} * 2 + {damage_gain} * 2 * ({level} -1)) / 2
```

Total strength at level:
```
{str} + {str_gain} * ({level} -1)
```

### Credits
All data is taken from https://dota2.fandom.com  
Inpired by the charts made by Reddit user u/chickenwyr
