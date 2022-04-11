import { Args, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query('movies')
  async getMovies(@Args('query') query: string) {
    const movies = await this.movieService.getMovies(query);
    return movies;
  }

  @Query('getMovie')
  async getMovie(@Args('id') id: string) {
    const movie = await this.movieService.getMovie(id);
    return movie;
  }
}
