/**
 * Main Entry Point
 * 
 * Exports public API for the Personality Memory Layer.
 */

// Core functions
export { loadProfileFromFile, loadSyntheticProfile, validateProfileStructure } from './core/profile-loader';
export { calculateConfidence, updateProfileConfidence, getConfidenceLevel, isConfidenceSufficient } from './core/confidence-calculator';
export { toCompressedTokens } from './core/token-compressor';

// Types
export type { PersonalityProfile } from './schema/personality-profile';
export type { CompressedTokens } from './schema/compressed-tokens';

// Re-export all schema types for convenience
export type {
  TraitIndicators,
  OpennessProfile,
  ConscientiousnessProfile,
  ExtraversionProfile,
  IdentityValues,
  CoreValues,
  RoleIdentities,
  PurposeThemes,
  Worldview,
  CognitivePatterns,
  EmotionalPatterns,
  ExpressionPatterns,
  DomainContext
} from './schema/personality-profile';
