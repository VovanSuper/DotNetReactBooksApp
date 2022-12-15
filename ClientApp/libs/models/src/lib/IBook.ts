export interface IGenre {
  id: number;
  genreName: string;
}

export interface IAuther {
  id: number;
  name: string;
}

export interface IBook {
  id: number;
  year: number;
  name: string;
  genre: IGenre;
  genreId?: number;
  author: IAuther,
  authorId: number;
};
