import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateTheatreDto {
    @IsString({ message: "Theatre name must be a string." })
    @IsNotEmpty({ message: "Theatre name is required." })
    name!: string;

    @IsEmail({}, { message: "Please provide a valid email address." })
    email!: string;

    @Matches(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." })
    phone!: string; // Strictly 10-digit numeric phone number

    @IsString({ message: "Address must be a string." })
    @IsNotEmpty({ message: "Address is required." })
    address!: string;

    @IsString({ message: "City name must be a string." })
    @IsNotEmpty({ message: "City name is required." })
    city!: string;

    @IsString({ message: "State name must be a string." })
    @IsNotEmpty({ message: "State name is required." })
    state!: string;

    @IsString({ message: "Zip Code must be a string." })
    @Length(5, 10, { message: "Zip Code must be between 5 and 10 characters long." })
    zipCode!: string;

    @IsString({ message: "License Number must be a string." })
    @IsNotEmpty({ message: "License Number is required." })
    licenseNumber!: string;

    @IsNumber({}, { message: "Latitude must be a valid number." })
    @IsNotEmpty({ message: "Latitude is required." })
    latitude!: number;

    @IsNumber({}, { message: "Longitude must be a valid number." })
    @IsNotEmpty({ message: "Longitude is required." })
    longitude!: number;
}
