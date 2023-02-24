import { Planet } from './levelsSettings';
import startPlanetLevels from './startPlanetLevels';
import doublePlanetLevels from './doublePlanetLevels';
import darkPlanetLevels from './darkPlanetLevels';

let planetId: number = 0;
const planets: Planet[] = [
	{
		id: planetId++,
		name: 'Планета темноты',
		levels: darkPlanetLevels,
		isOpen: true,
		description: 'Хорошая планета для начала',
		size: '220px',
		className: 'darkPlanet',
	},
	{
		id: planetId++,
		name: 'Планета двойников',
		levels: doublePlanetLevels,
		isOpen: true,
		description: 'Хорошая планета для начала',
		size: '120px',
		className: 'doublePlanet',
	},
	{
		id: planetId++,
		name: 'Планета мироздания',
		levels: startPlanetLevels,
		isOpen: true,
		description: 'Хорошая планета для начала',
		size: '320px',
		className: 'startPlanet',
	},

];

export default planets;

