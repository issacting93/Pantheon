/**
 * Token Compressor
 * 
 * Converts detailed PersonalityProfile to lightweight CompressedTokens.
 */

import { PersonalityProfile } from '../schema/personality-profile';
import { CompressedTokens } from '../schema/compressed-tokens';

/**
 * Converts a detailed profile to compressed tokens
 */
export function toCompressedTokens(profile: PersonalityProfile): CompressedTokens {
  return {
    identity_core: extractIdentityCore(profile),
    cognitive_style: extractCognitiveStyle(profile),
    expression_patterns: extractExpressionPatterns(profile),
    trait_indicators: aggregateTraitIndicators(profile)
  };
}

/**
 * Extracts identity core from profile
 */
function extractIdentityCore(profile: PersonalityProfile): CompressedTokens['identity_core'] {
  const roles = profile.identity_values?.role_identities?.primary_roles?.map(r => r.role_label) || [];
  const purpose = profile.identity_values?.purpose_themes?.life_themes?.[0];
  
  return {
    values: profile.identity_values?.core_values?.primary_values || [],
    roles: roles,
    purpose: purpose
  };
}

/**
 * Extracts cognitive style from profile
 */
function extractCognitiveStyle(profile: PersonalityProfile): CompressedTokens['cognitive_style'] {
  const thinking = profile.cognitive_patterns?.thinking_style?.processing_mode || "linear";
  const problemSolving = profile.cognitive_patterns?.problem_solving?.primary_approach || "first_principles";
  
  // Determine communication style from expression patterns
  const formality = profile.expression_patterns?.language_style?.formality_level || 0.5;
  const communication = formality > 0.7 ? "formal_structured" : 
                       formality > 0.4 ? "clear_structured" : 
                       "casual_clear";
  
  return {
    thinking: thinking,
    communication: communication,
    problem_solving: problemSolving
  };
}

/**
 * Extracts expression patterns from profile
 */
function extractExpressionPatterns(profile: PersonalityProfile): CompressedTokens['expression_patterns'] {
  const formality = profile.expression_patterns?.language_style?.formality_level || 0.5;
  const technicalDepth = profile.expression_patterns?.language_style?.technical_density || 0.5;
  const humorStyle = profile.expression_patterns?.rhetorical_devices?.humor_style;
  const explanationStyle = profile.expression_patterns?.discourse_structure?.organization_pattern || "hierarchical";
  
  return {
    formality: formality,
    technical_depth: technicalDepth,
    humor_style: humorStyle,
    explanation_style: explanationStyle
  };
}

/**
 * Aggregates trait indicators
 */
function aggregateTraitIndicators(profile: PersonalityProfile): CompressedTokens['trait_indicators'] {
  const openness = averageOpenness(profile.trait_indicators?.openness);
  const structurePreference = profile.trait_indicators?.conscientiousness?.organization_level || 0.5;
  const interactionEnergy = profile.trait_indicators?.extraversion?.energy_level || 0.5;
  
  return {
    openness: openness,
    structure_preference: structurePreference,
    interaction_energy: interactionEnergy
  };
}

/**
 * Calculates average openness score
 */
function averageOpenness(openness: PersonalityProfile['trait_indicators']['openness']): number {
  if (!openness) return 0.5;
  
  const values = [
    openness.novelty_preference,
    openness.abstract_thinking,
    openness.idea_exploration,
    openness.creative_expression,
    openness.intellectual_curiosity,
    openness.change_comfort
  ];
  
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}
