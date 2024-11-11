import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};
