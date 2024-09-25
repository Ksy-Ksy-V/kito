import { Anime, JikanResourcePeriod } from '@tutkli/jikan-ts';

interface AbstractAnimePeriod extends JikanResourcePeriod {
	string?: string;
}

export interface AbstractAnime extends Anime {
	aired: AbstractAnimePeriod;
}
