import { Request, Response, NextFunction } from "express";
import { createApiResponse } from "../../infrastructure/http/common-response";
import { DIContainer } from "../../infrastructure/DIContainer";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { GetNowShowingMoviesUseCase } from "../../useCases/User/GetNowShowingMoviesUseCase";

export class MovieController {
    private addMovieAdminUseCase = DIContainer.getAddMovieAdminUseCase();
    private getGetAllMoviesAdminUseCase = DIContainer.getGetAllMoviesAdminUseCase();
    private getDeleteMovieAdminUseCase = DIContainer.getDeleteMovieAdminUseCase();
    private getNowShowingMoviesUseCase = new GetNowShowingMoviesUseCase(DIContainer.getMovieRepository());
    private getMovieDetailsUseCase = DIContainer.getGetMovieDetailsUseCase();

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
}