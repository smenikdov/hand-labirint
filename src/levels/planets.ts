import { Planet } from '../scripts/types';
import startPlanetLevels from './startPlanetLevels';
import doublePlanetLevels from './doublePlanetLevels';
import darkPlanetLevels from './darkPlanetLevels';
import stopPlanetLevels from './stopPlanetLevels';

let planetId: number = 0;
const planets: Planet[] = [
	{
		id: planetId++,
		name: 'Планета темноты',
		levels: darkPlanetLevels,
		isOpen: !!localStorage.getItem('darkPlanet'),
		cost: 5,
		description: 'Хорошая планета для начала',
		size: '220px',
		className: 'darkPlanet',
	},
	// {
	// 	id: planetId++,
	// 	name: 'Планета двойников',
	// 	levels: doublePlanetLevels,
	// 	isOpen: true,
	// 	description: 'Хорошая планета для начала',
	// 	size: '120px',
	// 	className: 'doublePlanet',
	// },
	{
		id: planetId++,
		name: 'Планета остановок',
		levels: stopPlanetLevels,
		isOpen: !!localStorage.getItem('stopPlanet'),
		cost: 3,
		description: 'Хорошая планета для начала',
		size: '120px',
		className: 'stopPlanet',
	},
	{
		id: planetId++,
		name: 'Планета мироздания',
		levels: startPlanetLevels,
		isOpen: true,
		cost: 0,
		description: 'Хорошая планета для начала',
		size: '320px',
		className: 'startPlanet',
	},
];

export default planets;

