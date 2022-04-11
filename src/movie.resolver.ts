import { Args, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query('movies')
  async movies(@Args('query') query: string) {
    const movies = await this.movieService.movies(query);
    return movies;
  }

  @Query('movie')
  async movie(@Args('id') id: string) {
    const movie = await this.movieService.movie(id);
    return movie;
  }
}
