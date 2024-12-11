import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "Email is invalid" })
    @IsNotEmpty({ message: "Email is required" })
    email!: string;

    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @MaxLength(20, { message: "Password must not exceed 20 characters" })
    password!: string;
}