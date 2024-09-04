import { Anime, JikanResourcePeriod } from '@tutkli/jikan-ts';

interface RandomAnimePeriod extends JikanResourcePeriod {
	string?: string;
}

export interface RandomAnime extends Anime {
	aired: RandomAnimePeriod;
}
