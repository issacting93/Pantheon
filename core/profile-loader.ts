/**
 * Profile Loader
 * 
 * Loads personality profiles from static synthetic data files.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { PersonalityProfile } from '../schema/personality-profile';

/**
 * Loads a profile from a JSON file
 */
export async function loadProfileFromFile(filePath: string): Promise<PersonalityProfile> {
  try {
    const fullPath = path.resolve(filePath);
    const fileContent = await fs.readFile(fullPath, 'utf-8');
    const profile = JSON.parse(fileContent) as PersonalityProfile;
    
    // Basic validation
    if (!validateProfileStructure(profile)) {
      throw new Error('Invalid profile structure');
    }
    
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        throw new Error(`Profile file not found: ${filePath}`);
      }
      if (error.message.includes('JSON')) {
        throw new Error(`Invalid JSON in profile file: ${filePath}`);
      }
    }
    throw error;
  }
}

/**
 * Loads the synthetic profile (default for demo)
 */
export async function loadSyntheticProfile(): Promise<PersonalityProfile> {
  // Get the project root (assuming we're in dist/ or src/)
  const currentDir = process.cwd();
  const syntheticProfilePath = path.join(
    currentDir,
    'examples/synthetic-profile.json'
  );
  return loadProfileFromFile(syntheticProfilePath);
}

/**
 * Basic validation of profile structure
 */
export function validateProfileStructure(data: unknown): data is PersonalityProfile {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const candidate = data as Record<string, unknown>;

  if (typeof candidate.profile_id !== 'string') return false;
  if (typeof candidate.version !== 'string') return false;
  if (typeof candidate.created_at !== 'string') return false;
  if (typeof candidate.updated_at !== 'string') return false;
  if (typeof candidate.session_count !== 'number') return false;

  const initializationState = candidate.initialization_state;
  const validInitializationStates = new Set(['empty', 'seeded', 'learning', 'complete']);
  if (typeof initializationState !== 'string' || !validInitializationStates.has(initializationState)) {
    return false;
  }

  if (typeof candidate.overall_confidence !== 'number') return false;

  const nestedKeys: Array<keyof PersonalityProfile> = [
    'trait_indicators',
    'identity_values',
    'cognitive_patterns',
    'emotional_patterns',
    'expression_patterns',
    'domain_context'
  ];

  return nestedKeys.every((key) => key in candidate && typeof candidate[key] === 'object' && candidate[key] !== null);
}
