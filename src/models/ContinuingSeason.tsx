import { SeasonNowParams } from '@tutkli/jikan-ts';

export interface ExtendedSeasonNowParams extends SeasonNowParams {
	continuing?: boolean;
}
