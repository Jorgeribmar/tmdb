
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Movie {
    id: string;
    originalTitle?: Nullable<string>;
    overview?: Nullable<string>;
    releaseDate?: Nullable<string>;
    voteAverage?: Nullable<string>;
    posterPath?: Nullable<string>;
}

export abstract class IQuery {
    abstract movies(query: string): Nullable<Movie>[] | Promise<Nullable<Movie>[]>;

    abstract movie(id: string): Nullable<Movie> | Promise<Nullable<Movie>>;
}

type Nullable<T> = T | null;
