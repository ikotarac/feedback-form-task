import { Feedback, RatingOption } from "../models";

const FEEDBACKS_LOCAL_STORAGE_KEY = "feedbacks";

export type RatingDistribution = {
  [key in RatingOption]: number;
};

export interface FeedbackStorage {
  feedbacks: Feedback[];
  ratings: RatingDistribution;
}

const initialStorage: FeedbackStorage = {
  feedbacks: [],
  ratings: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

const getFeedbacks = (): FeedbackStorage => {
  const feedbackStorageString = localStorage.getItem(
    FEEDBACKS_LOCAL_STORAGE_KEY
  );
  const feedbackStorage =
    feedbackStorageString === null
      ? initialStorage
      : (JSON.parse(feedbackStorageString) as FeedbackStorage);

  return feedbackStorage;
};

const sendFeedback = (feedback: Feedback): void => {
  const feedbackStorage = getFeedbacks();
  const updatedFeedbackStorageString = JSON.stringify({
    ratings: {
      ...feedbackStorage.ratings,
      [feedback.rating]: feedbackStorage.ratings[feedback.rating] + 1,
    },
    feedbacks: [...feedbackStorage.feedbacks, feedback],
  });

  localStorage.setItem(
    FEEDBACKS_LOCAL_STORAGE_KEY,
    updatedFeedbackStorageString
  );
};

export const FeedbackApi = {
  getFeedbacks,
  sendFeedback,
};
