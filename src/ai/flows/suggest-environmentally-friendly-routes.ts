'use server';
/**
 * @fileOverview An AI agent that suggests environmentally friendly routes.
 *
 * - suggestEnvironmentallyFriendlyRoutes - A function that suggests routes tailored to minimize environmental impact.
 * - SuggestEnvironmentallyFriendlyRoutesInput - The input type for the suggestEnvironmentallyFriendlyRoutes function.
 * - SuggestEnvironmentallyFriendlyRoutesOutput - The return type for the suggestEnvironmentallyFriendlyRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEnvironmentallyFriendlyRoutesInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  endLocation: z.string().describe('The destination location for the route.'),
  currentTrafficConditions: z.string().describe('A description of the current traffic conditions.'),
});
export type SuggestEnvironmentallyFriendlyRoutesInput = z.infer<
  typeof SuggestEnvironmentallyFriendlyRoutesInputSchema
>;

const SuggestEnvironmentallyFriendlyRoutesOutputSchema = z.object({
  suggestedRoute: z
    .string()
    .describe(
      'A detailed description of the suggested route, optimized for minimal environmental impact.'
    ),
  estimatedEmissionsReduction: z
    .string()
    .describe(
      'An estimate of the emissions reduction compared to a standard route, including units.'
    ),
  additionalTips: z
    .string()
    .describe(
      'Additional tips for environmentally friendly driving, such as avoiding sudden acceleration and braking.'
    ),
});
export type SuggestEnvironmentallyFriendlyRoutesOutput = z.infer<
  typeof SuggestEnvironmentallyFriendlyRoutesOutputSchema
>;

export async function suggestEnvironmentallyFriendlyRoutes(
  input: SuggestEnvironmentallyFriendlyRoutesInput
): Promise<SuggestEnvironmentallyFriendlyRoutesOutput> {
  return suggestEnvironmentallyFriendlyRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEnvironmentallyFriendlyRoutesPrompt',
  input: {schema: SuggestEnvironmentallyFriendlyRoutesInputSchema},
  output: {schema: SuggestEnvironmentallyFriendlyRoutesOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting environmentally friendly routes for travelers.

  Given the following information, suggest a route that minimizes environmental impact, considering factors like traffic conditions and stop-and-go situations. Also provide an estimate of the emissions reduction compared to a standard route, and additional tips for environmentally friendly driving.

  Start Location: {{{startLocation}}}
  End Location: {{{endLocation}}}
  Current Traffic Conditions: {{{currentTrafficConditions}}}

  Focus on routes with fewer stop-and-go situations and provide clear, actionable advice.
  `,
});

const suggestEnvironmentallyFriendlyRoutesFlow = ai.defineFlow(
  {
    name: 'suggestEnvironmentallyFriendlyRoutesFlow',
    inputSchema: SuggestEnvironmentallyFriendlyRoutesInputSchema,
    outputSchema: SuggestEnvironmentallyFriendlyRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
