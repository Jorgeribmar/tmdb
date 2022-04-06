import { Injectable } from '@nestjs/common';
import { DataSourceConfig } from 'apollo-datasource';
import { RESTDataSource } from 'apollo-datasource-rest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService extends RESTDataSource {
  url: string;
  api_key: string;
  base_url: string;
  constructor(private configService: ConfigService) {
    super();
    this.base_url = process.env.BASE_URL;
    this.api_key = process.env.API_KEY;
    this.initialize({} as DataSourceConfig<any>);
  }

  async getMovies(query: string): Promise<any> {
    const url =
      this.base_url +
      `/search/movie?api_key=` +
      this.api_key +
      '&query=' +
      query +
      '&page=1';

    const searchMovie = await this.get(url);

    if (!searchMovie) {
      throw new Error('No data');
    } else {
      return (
        searchMovie?.results?.map((obj) => ({
          id: obj.id,
          original_title: obj.original_title,
          overview: obj.overview,
          release_date: obj.release_date,
          vote_average: obj.vote_average,
          poster_path: obj.poster_path,
        })) || []
      );
    }
  }
}
