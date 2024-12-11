import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, ValidateIf, Matches } from "class-validator";
import { Match } from "./match.decorator";

export class SignupDto {
    @IsEmail({}, { message: "Email is invalid" })
    @IsNotEmpty({ message: "Email is required" })
    email!: string;

    @IsNotEmpty({ message: "Phone number is required" })
    @Matches(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits" })
    phoneNumber!: string;

    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @MaxLength(20, { message: "Password must not exceed 20 characters" })
    password!: string;

    @IsString({ message: "Confirm password must be a string" })
    @IsNotEmpty({ message: "Confirm password is required" })
    @MinLength(8, { message: "Confirm password must be at least 8 characters long" })
    @MaxLength(20, { message: "Confirm password must not exceed 20 characters" })
    @Match('password', { message: "Password and confirm password must match" })
    confirmPassword!: string;
}
