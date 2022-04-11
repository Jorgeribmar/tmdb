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

  async movies(query: string): Promise<any> {
    const url = new URL('/3/search/movie', this.#base_url);

    url.searchParams.append('api_key', this.#api_key);
    url.searchParams.append('language', 'fr-FR');
    url.searchParams.append('query', query);
    url.searchParams.append('page', '1');

    console.log('Movies URL', url);

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

  async movie(id: string): Promise<any> {
    if (!id) {
      throw new Error('No ID provided');
    }
    const url = new URL(`/3/movie/${id}`, this.#base_url);
    url.searchParams.append('api_key', this.#api_key);
    url.searchParams.append('language', 'fr-FR');

    console.log('Movie URL', url);

    const searchMovie = await this.get(url.toString());

    if (!searchMovie) {
      throw new Error('No data');
    } else {
      return {
        id: searchMovie.id,
        originalTitle: searchMovie.original_title,
        overview: searchMovie.overview,
        releaseDate: searchMovie.release_date,
        voteAverage: searchMovie.vote_average,
        posterPath: searchMovie.poster_path,
      };
    }
  }
}
