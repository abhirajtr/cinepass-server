type CastMember = {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
};

type CrewMember = {
    id: number;
    name: string;
    job: string;
    profilePath: string | null;
};

export class Movie {
    constructor(
        public movieId: string,
        public title: string,
        public genre: string[],
        public language: string,
        public releaseDate: string,
        public posterPath: string,
        public runtime: string,
        public backdropPath: string,
        public overview: string,
        public voteAverage: number,
        public voteCount: number,
        public cast: CastMember[],
        public crew: CrewMember[],
    ) { }
}
