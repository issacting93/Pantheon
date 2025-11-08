/**
 * Confidence Calculator
 * 
 * Calculates confidence scores for personality profiles.
 */

import { PersonalityProfile } from '../schema/personality-profile';

/**
 * Calculates confidence based on session count
 * Formula: min(0.9, session_count / 50)
 */
export function calculateConfidence(session_count: number): number {
  return Math.min(0.9, session_count / 50);
}

/**
 * Updates profile confidence from session count
 */
export function updateProfileConfidence(profile: PersonalityProfile): PersonalityProfile {
  return {
    ...profile,
    overall_confidence: calculateConfidence(profile.session_count)
  };
}

/**
 * Gets confidence level (low, medium, high)
 */
export function getConfidenceLevel(confidence: number): "low" | "medium" | "high" {
  if (confidence < 0.3) return "low";
  if (confidence < 0.7) return "medium";
  return "high";
}

/**
 * Checks if confidence is sufficient for a given threshold
 */
export function isConfidenceSufficient(confidence: number, threshold: number): boolean {
  return confidence >= threshold;
}
