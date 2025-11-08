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
export function validateProfileStructure(data: any): data is PersonalityProfile {
  // Check required root fields
  if (!data.profile_id || typeof data.profile_id !== 'string') return false;
  if (!data.version || typeof data.version !== 'string') return false;
  if (!data.created_at || typeof data.created_at !== 'string') return false;
  if (!data.updated_at || typeof data.updated_at !== 'string') return false;
  if (typeof data.session_count !== 'number') return false;
  if (!['empty', 'seeded', 'learning', 'complete'].includes(data.initialization_state)) return false;
  if (typeof data.overall_confidence !== 'number') return false;
  
  // Check layers exist
  if (!data.trait_indicators) return false;
  if (!data.identity_values) return false;
  if (!data.cognitive_patterns) return false;
  if (!data.emotional_patterns) return false;
  if (!data.expression_patterns) return false;
  if (!data.domain_context) return false;
  
  return true;
}
