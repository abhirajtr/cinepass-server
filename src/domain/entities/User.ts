// export enum UserRole {
//     Admin = 'admin',
//     TheatreOwner = 'theatreOwner',
//     RegularUser = 'regularUser',
// }

export type UserRole = 'admin' | 'theatreOwner' | 'regularUser';

export class User {
    constructor(
        public userId: string,
        public name: string,
        public email: string,
        public phone: string,
        public createdAt: Date,
        public role: UserRole,
        public password: string,
        public isBlocked: boolean,
        public theatres?: [],
    ) { }
}
