'use server';
/**
 * @fileOverview An AI agent that finds the number of users in a given city.
 *
 * - findUsersInCity - A function that returns the number of users in a city.
 * - FindUsersInCityInput - The input type for the findUsersInCity function.
 * - FindUsersInCityOutput - The return type for the findUsersInCity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindUsersInCityInputSchema = z.object({
  city: z.string().describe('The city to search for users in.'),
});
export type FindUsersInCityInput = z.infer<
  typeof FindUsersInCityInputSchema
>;

const FindUsersInCityOutputSchema = z.object({
  userCount: z.number().describe('The number of registered users in the city.'),
});
export type FindUsersInCityOutput = z.infer<
  typeof FindUsersInCityOutputSchema
>;

export async function findUsersInCity(
  input: FindUsersInCityInput
): Promise<FindUsersInCityOutput> {
  return findUsersInCityFlow(input);
}

// Mock function to simulate fetching user data.
// In a real application, this would query a database.
const getRegisteredUsersByCity = async (city: string): Promise<number> => {
    console.log(`Searching for users in ${city}`);
    // Return a pseudo-random number based on the city name length
    // to give a semblance of different results for different cities.
    return city.length * 100 + Math.floor(Math.random() * 500);
}


const findUsersInCityFlow = ai.defineFlow(
  {
    name: 'findUsersInCityFlow',
    inputSchema: FindUsersInCityInputSchema,
    outputSchema: FindUsersInCityOutputSchema,
  },
  async input => {
    const userCount = await getRegisteredUsersByCity(input.city);
    return {
        userCount
    };
  }
);
