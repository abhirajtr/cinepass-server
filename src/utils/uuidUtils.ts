// utils/uuidUtils.ts
import { v4 as uuidv4 } from 'uuid';

// Generate a unique UUID for a user
export const generateUserId = (): string => {
    return uuidv4(); // Generate a version 4 UUID
};
