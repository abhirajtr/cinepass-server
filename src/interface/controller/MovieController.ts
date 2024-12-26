import { Request, Response, NextFunction } from "express";
import { createApiErrorResponse, createApiResponse } from "../../infrastructure/http/common-response";
import { DIContainer } from "../../infrastructure/DIContainer";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { GetNowShowingMoviesUseCase } from "../../useCases/User/GetNowShowingMoviesUseCase";
import { GetTheatresForMovieUseCase } from "../../useCases/User/GetTheatresForMovieUseCase";
import { GetUpcomingMoviesUseCase } from "../../useCases/GetUpcomingMoviesUseCase";
import { SearchMovieUseCase } from "../../useCases/User/SearchMovieUseCase";
import { HttpStatusCode } from "../../infrastructure/http/HttpstatusCode";

export class MovieController {
    private addMovieAdminUseCase = DIContainer.getAddMovieAdminUseCase();
    private getGetAllMoviesAdminUseCase = DIContainer.getGetAllMoviesAdminUseCase();
    private getDeleteMovieAdminUseCase = DIContainer.getDeleteMovieAdminUseCase();
    private getNowShowingMoviesUseCase = new GetNowShowingMoviesUseCase(DIContainer.getMovieRepository());
    private getMovieDetailsUseCase = DIContainer.getGetMovieDetailsUseCase();
    private getTheatreForMovieUseCase = new GetTheatresForMovieUseCase(DIContainer.getMovieRepository(), DIContainer.getShowRepository());
    private getUpcomingMoviesUseCase = new GetUpcomingMoviesUseCase(DIContainer.getMovieRepository());
    private searchMovieUseCase = new SearchMovieUseCase(DIContainer.getMovieRepository());

    async addMovieAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id && id !== String) {
                throw new BadRequestError("Invalid movie id");
            }
            await this.addMovieAdminUseCase.execute(id);
            res.status(200).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }

    async getAllMoviesAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            let { searchTerm } = req.query;
            if (typeof searchTerm !== 'string') {
                searchTerm = '';
            }
            const movies = await this.getGetAllMoviesAdminUseCase.execute(searchTerm);
            res.status(200).json(createApiResponse({ movies }));
        } catch (error) {
            next(error);
        }
    }

    async deleteMovieAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.getDeleteMovieAdminUseCase.execute(id);
            res.status(200).json(createApiResponse());
        } catch (error) {
            next(error);
        }
    }

    async getNowShowingMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const nowShowingMovies = await this.getNowShowingMoviesUseCase.execute();
            res.status(200).json(createApiResponse({ nowShowingMovies }));
        } catch (error) {
            next(error);
        }
    }

    async getMovieDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { movieId } = req.params;
            const movieDetails = await this.getMovieDetailsUseCase.execute(movieId);
            res.status(200).json(createApiResponse({ movieDetails }));
        } catch (error) {
            next(error);
        }
    }

    async getTheatresForMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { movieId } = req.params as { movieId: string };
            const { date, city } = req.query as { date: string; city: string };
            console.log(movieId, date, city);

            if (!date || !city || !movieId) {
                res.status(400).json({ message: "Movie ID, date, and city are required." });
                return;
            }
            console.log(movieId, date, city);
            const response = await this.getTheatreForMovieUseCase.execute(movieId, date, city);

            res.status(200).json(createApiResponse(response));
        } catch (error) {
            next(error);
        }
    }
    async getUpcomingMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const { movieId } = req.params;
            const movieDetails = await this.getMovieDetailsUseCase.execute(movieId);
            res.status(200).json(createApiResponse({ movieDetails }));
        } catch (error) {
            next(error);
        }
    }
    async searchMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { search } = req.query;
            if (typeof search !== 'string') {
                res.status(HttpStatusCode.BAD_REQUEST).json(createApiErrorResponse(["Search term is required and must be a string"]));
                return 
            }
            const movies = await this.searchMovieUseCase.execute(search);
            res.status(HttpStatusCode.ACCEPTED).json(createApiResponse(movies));
        } catch (error) {
            next(error);
        }
    }
}