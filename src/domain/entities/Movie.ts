export class Movie {
    constructor(
        public id: string,
        public title: string,
        public genre: string[],
        public language: string,
        public releaseDate: string,
        public posterPath: string,
        public runtime: string,
        public backdropPath: string,
    ) { }
}

// export enum Genre {
//     Action = "Action",
//     Adventure= "Adventure",
//     Drama = "Drama",
//     Comedy = "Comedy",
//     Thriller = "Thriller",
//     SciFi = "Science Fiction",
//     Fantasy = "Fantasy",
// }

// export enum Language {
//     English = "en",
//     Hindi = "Hindi",
//     Spanish = "Spanish",
//     French = "French",
// }