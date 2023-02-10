export const ratingOptions = [1, 2, 3, 4, 5] as const;

export type RatingOption = (typeof ratingOptions)[number];

export interface Feedback {
  name: string;
  email: string;
  rating: RatingOption;
  comment: string;
}
