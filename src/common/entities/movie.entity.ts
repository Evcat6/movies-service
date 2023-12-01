import { UnmappedMovie } from '../types/unmappedMovie.type';

type Attributes = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
};

class MovieEntity {
  private _id: number;
  private _overview: string;
  private _posterPath: string | null;
  private _releaseDate: string;
  private _title: string;
  private _backdropPath: string | null;

  private constructor({
    id,
    overview,
    posterPath,
    releaseDate,
    title,
    backdropPath,
  }: Attributes) {
    this._id = id;
    this._overview = overview;
    this._posterPath = posterPath;
    this._releaseDate = releaseDate;
    this._title = title;
    this._backdropPath = backdropPath;
  }

  public static parse({
    id,
    title,
    overview,
    release_date,
    poster_path,
    backdrop_path,
  }: UnmappedMovie): MovieEntity {
    return new MovieEntity({
      id,
      title,
      overview,
      releaseDate: release_date,
      posterPath: poster_path,
      backdropPath: backdrop_path,
    });
  }

  public toObject() {
    return {
      id: this._id,
      title: this._title,
      overview: this._overview,
      releaseDate: this._releaseDate,
      posterPath: this._posterPath,
      backdropPath: this._backdropPath,
    };
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get overview() {
    return this._overview;
  }

  public get releaseDate() {
    return this._releaseDate;
  }

  public get posterPath() {
    return this._posterPath;
  }

  public get backdropPath() {
    return this._backdropPath;
  }
}

export { MovieEntity };
