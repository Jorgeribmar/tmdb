import { Injectable } from '@nestjs/common';
import { DataSourceConfig } from 'apollo-datasource';
import { RESTDataSource } from 'apollo-datasource-rest';
import { ConfigService } from '@nestjs/config';
import { URL } from 'url';

@Injectable()
export class MovieService extends RESTDataSource {
  #api_key: string;
  #base_url: string;

  constructor(private configService: ConfigService) {
    super();
    this.#base_url = configService.get('TMDB.baseUrl');
    this.#api_key = configService.get('TMDB.apiKey');
    this.initialize({} as DataSourceConfig<any>);
  }

  async getMovies(query: string): Promise<any> {
    const url = new URL('/search/movie', this.#base_url);

    url.searchParams.append('api_key', this.#api_key);
    url.searchParams.append('query', query);
    url.searchParams.append('page', '1');

    const searchMovie = await this.get(url.toString()); // verify to string

    if (!searchMovie?.results) {
      throw new Error('No data');
    } else {
      return (
        searchMovie.results.map((obj) => {
          const {
            id,
            original_title: originalTitle,
            overview,
            release_date: releaseDate,
            vote_average: voteAverage,
            poster_path: posterPath,
          } = obj;
          return {
            id,
            originalTitle,
            overview,
            releaseDate,
            voteAverage,
            posterPath,
          };
        }) || []
      );
    }
  }
}
