import { Planet } from '../scripts/types';
import startPlanetLevels from './startPlanetLevels';
import doublePlanetLevels from './doublePlanetLevels';
import darkPlanetLevels from './darkPlanetLevels';
import enemyPlanetLevels from './enemyPlanetLevels';

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
	// 	name: 'Планета друзей',
	// 	levels: doublePlanetLevels,
	// 	isOpen: true,
	// 	cost: 5,
	// 	description: 'Хорошая планета для начала',
	// 	size: '190px',
	// 	className: 'doublePlanet',
	// },
	{
		id: planetId++,
		name: 'Планета остановок',
		levels: enemyPlanetLevels,
		isOpen: !!localStorage.getItem('enemyPlanet'),
		cost: 3,
		description: 'Хорошая планета для начала',
		size: '120px',
		className: 'enemyPlanet',
	},
	{
		id: planetId++,
		name: 'Планета умиротворения',
		levels: startPlanetLevels,
		isOpen: true,
		cost: 0,
		description: 'Хорошая планета для начала',
		size: '280px',
		className: 'startPlanet',
	},
];

export default planets;

