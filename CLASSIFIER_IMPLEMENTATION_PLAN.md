# Conversation-to-Schema Classifier Implementation Plan

## Overview

This document outlines the implementation plan for an LLM-based classifier system that analyzes AI conversations and automatically extracts personality layer tokens to drive the Pantheon visualization.

**Goal**: Convert unstructured conversation data into structured personality schemas that populate the 4-layer visualization system.

**Approach**: LLM-based extraction with parallel layer processing, vocabulary validation, and confidence scoring.

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│            Conversation Input Component             │
│  (Upload chat logs, paste text, or use examples)   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│          ConversationAnalyzer (Main Class)          │
│  - Preprocesses conversation                        │
│  - Orchestrates parallel layer extraction           │
│  - Assembles final schema                           │
└──────┬──────┬──────┬──────┬────────────────────────┘
       │      │      │      │
       ↓      ↓      ↓      ↓
    ┌───┐ ┌───┐ ┌───┐ ┌───┐
    │ T │ │ C │ │ Cg│ │ E │  Layer-specific extractors
    │ r │ │ h │ │ n │ │ x │  (LLM-powered)
    │ a │ │ a │ │ t │ │ p │
    │ i │ │ r │ │ v │ │ r │
    │ t │ │   │ │ e │ │   │
    └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘
      │     │     │     │
      └─────┴─────┴─────┘
              │
              ↓
    ┌──────────────────┐
    │  Schema Validator │
    │  - Checks tokens  │
    │  - Confidence     │
    └────────┬──────────┘
             │
             ↓
    ┌──────────────────┐
    │  Visualization    │
    │  Updates in       │
    │  Real-time        │
    └──────────────────┘
```

---

## Proposed File Structure

```
src/
  classifier/
    ├── index.ts                        // Public API exports
    ├── ConversationAnalyzer.ts         // Main orchestrator
    ├── types.ts                        // Classifier-specific types
    ├── vocabularies.ts                 // Token vocabularies & definitions
    │
    ├── extractors/
    │   ├── BaseExtractor.ts            // Abstract base class
    │   ├── TraitExtractor.ts           // Layer 2 extraction
    │   ├── CharacterExtractor.ts       // Layer 4 extraction
    │   ├── CognitiveExtractor.ts       // Layer 5 extraction
    │   └── ExpressionExtractor.ts      // Layer 6 extraction
    │
    ├── prompts/
    │   ├── systemPrompts.ts            // System prompts for each layer
    │   └── exampleConversations.ts     // Few-shot examples
    │
    ├── parsers/
    │   ├── SchemaParser.ts             // Parse LLM JSON output
    │   └── TokenNormalizer.ts          // Normalize token strings
    │
    ├── validators/
    │   └── TokenValidator.ts           // Validate against vocabularies
    │
    └── utils/
        ├── conversationFormatter.ts    // Format conversation for LLM
        └── featureExtractor.ts         // Extract statistical features

  components/
    ├── ConversationInput.tsx           // UI for conversation input
    └── SchemaPreview.tsx               // Preview extracted schema
```

---

## Data Flow

### Input Format

```typescript
interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface ConversationInput {
  messages: ConversationMessage[];
  metadata?: {
    conversationId?: string;
    title?: string;
    context?: string;
  };
}
```

### Output Format

```typescript
interface PersonalitySchema {
  trait: ExtractionResult<TraitLayerTokens>;
  character: ExtractionResult<CharacterLayerTokens>;
  cognitive: ExtractionResult<CognitiveLayerTokens>;
  expression: ExtractionResult<ExpressionLayerTokens>;
  overallConfidence: number;
  extractedAt: Date;
}

interface ExtractionResult<T> {
  tokens: T;              // The extracted personality layer tokens
  confidence: number;     // 0-1 confidence score
  rawResponse: string;    // Raw LLM response for debugging
  processingTime: number; // Milliseconds
}
```

---

## Personality Layers to Extract

### Layer 2: Trait Layer

**Fields to extract:**
- `traitMarkers: string[]` - Personality trait indicators
- `curiosityBias: string` - Approach to exploration
- `structureBias: string` - Preference for structure

**Example output:**
```json
{
  "traitMarkers": ["high_openness", "moderate_conscientiousness", "low_verbosity"],
  "curiosityBias": "exploratory_synthesis",
  "structureBias": "precise_but_flexible"
}
```

### Layer 4: Character Layer

**Fields to extract:**
- `valuePriorities: string[]` - Core value hierarchies
- `identityMarkers: string[]` - Identity roles and archetypes
- `purposeThemes: string[]` - Motivational themes
- `coherenceSignature: string` - Identity coherence pattern

**Example output:**
```json
{
  "valuePriorities": ["autonomy>harmony", "precision>speed"],
  "identityMarkers": ["educator", "systems_thinker", "privacy_advocate"],
  "purposeThemes": ["knowledge_sharing", "innovation", "authenticity"],
  "coherenceSignature": "double_chain_linkage"
}
```

### Layer 5: Cognitive Layer

**Fields to extract:**
- `thinkingStyle: string[]` - Reasoning approaches
- `communicationTone: string[]` - Emotional/professional tone
- `interactionPreference: string[]` - Preferred interaction modes
- `regulationProfile: string` - Emotional regulation pattern

**Example output:**
```json
{
  "thinkingStyle": ["systematic", "first_principles", "metaphorical"],
  "communicationTone": ["professional_casual", "encouraging", "precise"],
  "interactionPreference": ["socratic_dialogue", "collaborative_exploration"],
  "regulationProfile": "measured_expression"
}
```

### Layer 6: Expression Layer

**Fields to extract:**
- `languageMarkers: string[]` - Language and formatting patterns
- `expertiseDomains: string[]` - Knowledge domains
- `interactionStyle: string[]` - Communication tactics
- `rhythmSignature: string` - Conversational tempo

**Example output:**
```json
{
  "languageMarkers": ["technical_precision", "minimal_jargon", "oxford_comma"],
  "expertiseDomains": ["distributed_systems", "philosophy", "education"],
  "interactionStyle": ["thorough_explanations", "numbered_lists", "examples"],
  "rhythmSignature": "measured_cadence"
}
```

---

## Token Vocabularies

### Complete Token Options

Each field has a predefined vocabulary to ensure consistency and enable validation.

#### Trait Layer Vocabularies

**traitMarkers:**
- `high_openness`, `moderate_openness`, `low_openness`
- `high_conscientiousness`, `moderate_conscientiousness`, `low_conscientiousness`
- `high_extraversion`, `moderate_extraversion`, `low_extraversion`
- `high_agreeableness`, `moderate_agreeableness`, `low_agreeableness`
- `high_neuroticism`, `moderate_neuroticism`, `low_neuroticism`
- `high_verbosity`, `moderate_verbosity`, `low_verbosity`

**curiosityBias:**
- `exploratory_synthesis` - Broad exploration with integration
- `focused_depth` - Deep dives into specific topics
- `balanced_inquiry` - Mix of breadth and depth
- `speculative_wondering` - Hypothetical and imaginative
- `pragmatic_questioning` - Practical and applied

**structureBias:**
- `highly_structured` - Rigid organization and order
- `precise_but_flexible` - Clear structure with adaptability
- `adaptive_fluid` - Context-dependent organization
- `context_dependent` - Structure varies by situation
- `loosely_organized` - Minimal imposed structure

#### Character Layer Vocabularies

**valuePriorities:**
- `autonomy>harmony`, `harmony>autonomy`
- `precision>speed`, `speed>precision`
- `innovation>stability`, `stability>innovation`
- `transparency>privacy`, `privacy>transparency`
- `efficiency>thoroughness`, `thoroughness>efficiency`
- `collaboration>independence`, `independence>collaboration`

**identityMarkers:**
- `educator`, `researcher`, `engineer`, `artist`, `analyst`
- `systems_thinker`, `creative`, `pragmatist`, `idealist`
- `privacy_advocate`, `collaborator`, `mentor`, `learner`
- `facilitator`, `innovator`, `strategist`

**purposeThemes:**
- `knowledge_sharing`, `problem_solving`, `innovation`
- `authenticity`, `empowerment`, `understanding`
- `clarity`, `growth`, `connection`, `exploration`
- `optimization`, `creativity`, `service`

**coherenceSignature:**
- `double_chain_linkage` - Dual value systems in harmony
- `spiral_integration` - Progressive value development
- `layered_alignment` - Hierarchical consistency
- `dynamic_balance` - Fluid equilibrium

#### Cognitive Layer Vocabularies

**thinkingStyle:**
- `systematic` - Step-by-step logical progression
- `first_principles` - Ground-up reasoning from fundamentals
- `metaphorical` - Understanding through analogies
- `analogical` - Pattern matching across domains
- `deductive` - General to specific reasoning
- `inductive` - Specific to general reasoning
- `abductive` - Best explanation inference
- `holistic` - Big picture perspective
- `analytical` - Breaking down into components
- `intuitive` - Pattern-based rapid cognition
- `dialectical` - Thesis-antithesis-synthesis
- `synthetic` - Combining multiple perspectives

**communicationTone:**
- `professional_casual` - Friendly but competent
- `encouraging` - Supportive and motivating
- `precise` - Exact and careful wording
- `warm` - Emotionally open and caring
- `playful` - Light and humorous
- `formal` - Professional and structured
- `empathetic` - Understanding and validating
- `direct` - Straightforward and clear
- `diplomatic` - Tactful and considerate
- `enthusiastic` - Energetic and excited
- `measured` - Controlled and balanced
- `supportive` - Helpful and affirming

**interactionPreference:**
- `socratic_dialogue` - Learning through questioning
- `collaborative_exploration` - Joint discovery process
- `direct_instruction` - Clear teaching and guidance
- `guided_discovery` - Structured exploration
- `open_brainstorming` - Free-form ideation
- `structured_problem_solving` - Methodical approaches

**regulationProfile:**
- `measured_expression` - Controlled emotional display
- `spontaneous` - Natural and unfiltered
- `controlled` - Highly regulated affect
- `emotionally_responsive` - Reactive to context
- `even_keeled` - Consistent baseline
- `dynamic` - Variable expressiveness

#### Expression Layer Vocabularies

**languageMarkers:**
- `technical_precision` - Exact terminology
- `minimal_jargon` - Accessible language
- `oxford_comma` - Grammatical preferences
- `storytelling` - Narrative structures
- `metaphor_rich` - Heavy figurative language
- `concise` - Brief and to the point
- `detailed` - Comprehensive explanations
- `conversational` - Informal style
- `academic` - Scholarly tone
- `informal` - Relaxed and casual

**expertiseDomains:**
- `distributed_systems`, `machine_learning`, `philosophy`
- `psychology`, `education`, `design`, `mathematics`
- `linguistics`, `biology`, `physics`, `chemistry`
- `art`, `music`, `literature`, `history`
- `economics`, `sociology`, `politics`

**interactionStyle:**
- `thorough_explanations` - Complete walkthroughs
- `numbered_lists` - Organized enumeration
- `examples` - Concrete illustrations
- `step_by_step` - Sequential instructions
- `conceptual_overview` - High-level framing
- `code_samples` - Programming examples
- `visual_descriptions` - Descriptive imagery
- `analogies` - Comparative explanations
- `questions` - Inquiry-based teaching

**rhythmSignature:**
- `measured_cadence` - Steady and even pacing
- `rapid_fire` - Quick successive exchanges
- `reflective_pauses` - Thoughtful breaks
- `flowing` - Smooth continuous discourse
- `punctuated` - Distinct separated points
- `rhythmic_variation` - Dynamic pacing changes

---

## Core Implementation

### Main Analyzer Class

```typescript
// src/classifier/ConversationAnalyzer.ts
import type { ConversationInput, PersonalitySchema, LLMClient } from './types';
import { TraitExtractor } from './extractors/TraitExtractor';
import { CharacterExtractor } from './extractors/CharacterExtractor';
import { CognitiveExtractor } from './extractors/CognitiveExtractor';
import { ExpressionExtractor } from './extractors/ExpressionExtractor';

export class ConversationAnalyzer {
  private traitExtractor: TraitExtractor;
  private characterExtractor: CharacterExtractor;
  private cognitiveExtractor: CognitiveExtractor;
  private expressionExtractor: ExpressionExtractor;

  constructor(private llmClient: LLMClient) {
    this.traitExtractor = new TraitExtractor(llmClient);
    this.characterExtractor = new CharacterExtractor(llmClient);
    this.cognitiveExtractor = new CognitiveExtractor(llmClient);
    this.expressionExtractor = new ExpressionExtractor(llmClient);
  }

  /**
   * Analyze a conversation and extract personality schema
   * @param input - Conversation with user/assistant messages
   * @returns Complete personality schema with all 4 layers
   */
  async analyzeConversation(input: ConversationInput): Promise<PersonalitySchema> {
    const startTime = performance.now();

    // Run all extractors in parallel for speed
    const [trait, character, cognitive, expression] = await Promise.all([
      this.traitExtractor.extract(input),
      this.characterExtractor.extract(input),
      this.cognitiveExtractor.extract(input),
      this.expressionExtractor.extract(input)
    ]);

    // Calculate overall confidence as weighted average
    const overallConfidence = this.calculateOverallConfidence([
      trait.confidence,
      character.confidence,
      cognitive.confidence,
      expression.confidence
    ]);

    console.log(`Schema extraction completed in ${performance.now() - startTime}ms`);

    return {
      trait,
      character,
      cognitive,
      expression,
      overallConfidence,
      extractedAt: new Date()
    };
  }

  private calculateOverallConfidence(confidences: number[]): number {
    // Simple average - could be weighted by layer importance
    return confidences.reduce((sum, c) => sum + c, 0) / confidences.length;
  }
}
```

### Example Extractor Implementation

```typescript
// src/classifier/extractors/CognitiveExtractor.ts
import type { ConversationInput, ExtractionResult, LLMClient } from '../types';
import type { CognitiveLayerTokens } from '../../types/personality';
import { VOCABULARIES } from '../vocabularies';
import { formatConversation } from '../utils/conversationFormatter';
import { TokenValidator } from '../validators/TokenValidator';

export class CognitiveExtractor {
  private validator = new TokenValidator();

  constructor(private llmClient: LLMClient) {}

  async extract(input: ConversationInput): Promise<ExtractionResult<CognitiveLayerTokens>> {
    const startTime = performance.now();

    const prompt = this.buildPrompt(input);
    const rawResponse = await this.llmClient.complete(prompt, {
      temperature: 0.3,  // Lower temp for more consistent extraction
      maxTokens: 1000
    });

    const tokens = this.parseResponse(rawResponse);
    const validatedTokens = this.validator.validateCognitive(tokens);
    const confidence = this.calculateConfidence(tokens, rawResponse);

    return {
      tokens: validatedTokens,
      confidence,
      rawResponse,
      processingTime: performance.now() - startTime
    };
  }

  private buildPrompt(input: ConversationInput): string {
    const formattedConversation = formatConversation(input);

    return `You are analyzing an AI assistant's conversation to extract its cognitive and emotional patterns.

Focus ONLY on the assistant's messages (not the user's). Identify:

1. **Thinking Style**: How does the assistant approach problems and reasoning?
   Options: ${VOCABULARIES.thinkingStyle.join(', ')}

2. **Communication Tone**: What emotional/professional tone does it maintain?
   Options: ${VOCABULARIES.communicationTone.join(', ')}

3. **Interaction Preference**: How does it prefer to interact and teach?
   Options: ${VOCABULARIES.interactionPreference.join(', ')}

4. **Regulation Profile**: How does it manage emotional expression?
   Options: ${VOCABULARIES.regulationProfile.join(', ')}

CONVERSATION:
${formattedConversation}

INSTRUCTIONS:
- Select 1-3 thinking styles that best match (multiple styles can coexist)
- Select 1-3 communication tones
- Select 1-2 interaction preferences
- Select 1 regulation profile
- Provide a confidence score (0.0-1.0) based on conversation length and clarity

Respond ONLY with valid JSON in this exact format:
{
  "thinkingStyle": ["systematic", "first_principles"],
  "communicationTone": ["professional_casual", "precise"],
  "interactionPreference": ["collaborative_exploration"],
  "regulationProfile": "measured_expression",
  "confidence": 0.85,
  "reasoning": "Brief explanation of your analysis"
}`;
  }

  private parseResponse(response: string): CognitiveLayerTokens {
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in response');

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        thinkingStyle: parsed.thinkingStyle || [],
        communicationTone: parsed.communicationTone || [],
        interactionPreference: parsed.interactionPreference || [],
        regulationProfile: parsed.regulationProfile || 'measured_expression'
      };
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      // Return safe defaults on parse failure
      return {
        thinkingStyle: ['systematic'],
        communicationTone: ['professional_casual'],
        interactionPreference: ['collaborative_exploration'],
        regulationProfile: 'measured_expression'
      };
    }
  }

  private calculateConfidence(tokens: CognitiveLayerTokens, rawResponse: string): number {
    try {
      const parsed = JSON.parse(rawResponse.match(/\{[\s\S]*\}/)![0]);
      return parsed.confidence || 0.7;
    } catch {
      return 0.6;  // Default medium confidence on error
    }
  }
}
```

### Token Validator

```typescript
// src/classifier/validators/TokenValidator.ts
import { VOCABULARIES } from '../vocabularies';
import type {
  TraitLayerTokens,
  CharacterLayerTokens,
  CognitiveLayerTokens,
  ExpressionLayerTokens
} from '../../types/personality';

export class TokenValidator {
  /**
   * Validate cognitive layer tokens against vocabulary
   * Filters out invalid tokens and logs warnings
   */
  validateCognitive(tokens: CognitiveLayerTokens): CognitiveLayerTokens {
    return {
      thinkingStyle: this.validateArray(
        tokens.thinkingStyle,
        VOCABULARIES.thinkingStyle,
        'thinkingStyle'
      ),
      communicationTone: this.validateArray(
        tokens.communicationTone,
        VOCABULARIES.communicationTone,
        'communicationTone'
      ),
      interactionPreference: this.validateArray(
        tokens.interactionPreference,
        VOCABULARIES.interactionPreference,
        'interactionPreference'
      ),
      regulationProfile: this.validateSingle(
        tokens.regulationProfile,
        VOCABULARIES.regulationProfile,
        'regulationProfile',
        'measured_expression' // default fallback
      )
    };
  }

  // Similar methods for other layers...
  validateTrait(tokens: TraitLayerTokens): TraitLayerTokens { /* ... */ }
  validateCharacter(tokens: CharacterLayerTokens): CharacterLayerTokens { /* ... */ }
  validateExpression(tokens: ExpressionLayerTokens): ExpressionLayerTokens { /* ... */ }

  private validateArray(
    tokens: string[],
    vocabulary: readonly string[],
    fieldName: string
  ): string[] {
    const valid = tokens.filter(token => vocabulary.includes(token as any));
    const invalid = tokens.filter(token => !vocabulary.includes(token as any));

    if (invalid.length > 0) {
      console.warn(`Invalid tokens for ${fieldName}:`, invalid);
    }

    return valid.length > 0 ? valid : [vocabulary[0]]; // Fallback to first option
  }

  private validateSingle(
    token: string,
    vocabulary: readonly string[],
    fieldName: string,
    defaultValue: string
  ): string {
    if (vocabulary.includes(token as any)) {
      return token;
    }
    console.warn(`Invalid token for ${fieldName}: ${token}, using default: ${defaultValue}`);
    return defaultValue;
  }
}
```

### Conversation Formatter Utility

```typescript
// src/classifier/utils/conversationFormatter.ts
import type { ConversationInput } from '../types';

/**
 * Format conversation messages for LLM prompts
 * Includes only necessary context and highlights assistant messages
 */
export function formatConversation(input: ConversationInput, maxMessages = 20): string {
  const messages = input.messages.slice(-maxMessages); // Use recent messages

  return messages
    .map((msg, idx) => {
      const prefix = msg.role === 'assistant' ? '🤖 ASSISTANT' : '👤 USER';
      return `[${idx + 1}] ${prefix}:\n${msg.content}\n`;
    })
    .join('\n---\n\n');
}

/**
 * Extract only assistant messages for focused analysis
 */
export function extractAssistantMessages(input: ConversationInput): string[] {
  return input.messages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content);
}

/**
 * Parse raw conversation text into structured format
 * Supports common formats: "User: ...", "Assistant: ...", etc.
 */
export function parseConversationText(text: string): ConversationInput {
  const lines = text.split('\n');
  const messages: ConversationInput['messages'] = [];

  let currentRole: 'user' | 'assistant' | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    const userMatch = line.match(/^(?:User|Human|You):\s*(.*)/i);
    const assistantMatch = line.match(/^(?:Assistant|AI|Bot):\s*(.*)/i);

    if (userMatch || assistantMatch) {
      // Save previous message if exists
      if (currentRole && currentContent.length > 0) {
        messages.push({
          role: currentRole,
          content: currentContent.join('\n').trim()
        });
      }

      // Start new message
      currentRole = userMatch ? 'user' : 'assistant';
      currentContent = [userMatch?.[1] || assistantMatch?.[1] || ''];
    } else if (currentRole) {
      // Continue current message
      currentContent.push(line);
    }
  }

  // Save final message
  if (currentRole && currentContent.length > 0) {
    messages.push({
      role: currentRole,
      content: currentContent.join('\n').trim()
    });
  }

  return { messages };
}
```

---

## LLM Client Interface

The system uses an abstract `LLMClient` interface to support multiple LLM providers:

```typescript
// src/classifier/types.ts
export interface LLMClient {
  complete(prompt: string, options?: LLMOptions): Promise<string>;
}

export interface LLMOptions {
  temperature?: number;    // 0.0-1.0, controls randomness
  maxTokens?: number;      // Maximum response length
  model?: string;          // Model identifier
  stopSequences?: string[]; // Stop generation at these strings
}
```

### Example Implementations

#### Anthropic Claude Client
```typescript
import Anthropic from '@anthropic-ai/sdk';

export class ClaudeClient implements LLMClient {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async complete(prompt: string, options?: LLMOptions): Promise<string> {
    const response = await this.client.messages.create({
      model: options?.model || 'claude-3-5-sonnet-20241022',
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature ?? 0.3,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].type === 'text'
      ? response.content[0].text
      : '';
  }
}
```

#### OpenAI GPT Client
```typescript
import OpenAI from 'openai';

export class OpenAIClient implements LLMClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async complete(prompt: string, options?: LLMOptions): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: options?.model || 'gpt-4-turbo-preview',
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature ?? 0.3,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.choices[0]?.message?.content || '';
  }
}
```

---

## UI Integration

### Conversation Input Component

```typescript
// src/components/ConversationInput.tsx
import { useState } from 'react';
import { ConversationAnalyzer } from '../classifier/ConversationAnalyzer';
import { parseConversationText } from '../classifier/utils/conversationFormatter';
import type { PersonalitySchema } from '../classifier/types';

interface ConversationInputProps {
  onSchemaExtracted: (schema: PersonalitySchema) => void;
  llmClient: LLMClient;
}

export const ConversationInput = ({ onSchemaExtracted, llmClient }: ConversationInputProps) => {
  const [conversationText, setConversationText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeConversation = async () => {
    if (!conversationText.trim()) {
      setError('Please enter a conversation');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Parse conversation text
      const input = parseConversationText(conversationText);

      if (input.messages.length === 0) {
        throw new Error('No valid messages found in conversation');
      }

      // Analyze with LLM
      const analyzer = new ConversationAnalyzer(llmClient);
      const schema = await analyzer.analyzeConversation(input);

      onSchemaExtracted(schema);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error('Conversation analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="conversation-input-panel">
      <h3>Extract Personality Schema from Conversation</h3>

      <textarea
        value={conversationText}
        onChange={(e) => setConversationText(e.target.value)}
        placeholder={`Paste conversation here. Format:

User: How does this work?
Assistant: Let me explain step by step...
User: That makes sense!
Assistant: Great! Let me elaborate...`}
        rows={15}
        className="conversation-textarea"
      />

      <div className="button-group">
        <button
          onClick={analyzeConversation}
          disabled={isAnalyzing}
          className="analyze-button"
        >
          {isAnalyzing ? 'Analyzing...' : 'Extract Schema'}
        </button>

        <button
          onClick={() => setConversationText('')}
          className="clear-button"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="help-text">
        <p>Paste a conversation between a user and AI assistant.</p>
        <p>The system will analyze the assistant's personality patterns.</p>
      </div>
    </div>
  );
};
```

### Schema Preview Component

```typescript
// src/components/SchemaPreview.tsx
import type { PersonalitySchema } from '../classifier/types';

interface SchemaPreviewProps {
  schema: PersonalitySchema;
  onApply: (schema: PersonalitySchema) => void;
}

export const SchemaPreview = ({ schema, onApply }: SchemaPreviewProps) => {
  const formatConfidence = (conf: number) => `${(conf * 100).toFixed(1)}%`;

  return (
    <div className="schema-preview">
      <h3>Extracted Personality Schema</h3>

      <div className="confidence-badge">
        Overall Confidence: {formatConfidence(schema.overallConfidence)}
      </div>

      <div className="layer-section">
        <h4>Layer 2: Traits ({formatConfidence(schema.trait.confidence)})</h4>
        <pre>{JSON.stringify(schema.trait.tokens, null, 2)}</pre>
      </div>

      <div className="layer-section">
        <h4>Layer 4: Character ({formatConfidence(schema.character.confidence)})</h4>
        <pre>{JSON.stringify(schema.character.tokens, null, 2)}</pre>
      </div>

      <div className="layer-section">
        <h4>Layer 5: Cognitive ({formatConfidence(schema.cognitive.confidence)})</h4>
        <pre>{JSON.stringify(schema.cognitive.tokens, null, 2)}</pre>
      </div>

      <div className="layer-section">
        <h4>Layer 6: Expression ({formatConfidence(schema.expression.confidence)})</h4>
        <pre>{JSON.stringify(schema.expression.tokens, null, 2)}</pre>
      </div>

      <button onClick={() => onApply(schema)} className="apply-button">
        Apply to Visualization
      </button>
    </div>
  );
};
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up directory structure
- [ ] Define TypeScript types and interfaces
- [ ] Create token vocabularies
- [ ] Implement `TokenValidator`
- [ ] Write utility functions (`conversationFormatter`)

### Phase 2: Core Classifier (Week 2)
- [ ] Implement `BaseExtractor` abstract class
- [ ] Build layer-specific extractors:
  - [ ] `TraitExtractor`
  - [ ] `CharacterExtractor`
  - [ ] `CognitiveExtractor`
  - [ ] `ExpressionExtractor`
- [ ] Implement `ConversationAnalyzer` orchestrator
- [ ] Create LLM client interfaces and implementations

### Phase 3: Testing & Refinement (Week 3)
- [ ] Create test conversation datasets
- [ ] Test each extractor individually
- [ ] Validate extraction accuracy
- [ ] Refine prompts based on results
- [ ] Add error handling and edge cases
- [ ] Implement caching for repeated analyses

### Phase 4: UI Integration (Week 4)
- [ ] Build `ConversationInput` component
- [ ] Create `SchemaPreview` component
- [ ] Wire up to existing visualization
- [ ] Add file upload support (.txt, .json)
- [ ] Implement example conversations library
- [ ] Add export/import schema functionality

### Phase 5: Optimization (Week 5)
- [ ] Add conversation chunking for long inputs
- [ ] Implement batch processing
- [ ] Add confidence thresholds
- [ ] Create manual override interface
- [ ] Add schema history/versioning
- [ ] Performance optimization

---

## Testing Strategy

### Unit Tests
- Test each extractor independently with mock conversations
- Validate token normalization and validation
- Test conversation parsing edge cases
- Test LLM response parsing with malformed JSON

### Integration Tests
- Test full pipeline with real conversations
- Validate schema consistency across runs
- Test parallel extraction performance
- Test error recovery and fallbacks

### Test Conversations

Create annotated test cases covering:
1. **Technical Assistant** - High precision, systematic thinking
2. **Creative Assistant** - Metaphorical, playful, exploratory
3. **Supportive Assistant** - Empathetic, encouraging, measured
4. **Educational Assistant** - Socratic, thorough, examples-focused
5. **Analytical Assistant** - First principles, data-driven, precise

Each test case should have:
- Raw conversation text
- Expected personality tokens
- Confidence thresholds
- Edge cases and ambiguities

---

## Future Enhancements

### Advanced Features
1. **Adaptive Extraction**
   - Adjust prompt complexity based on conversation length
   - Use simpler models for obvious patterns
   - Escalate to advanced models for ambiguous cases

2. **Temporal Analysis**
   - Track personality evolution across conversations
   - Detect shifts in tone, style, or values
   - Visualize personality changes over time

3. **Multi-Agent Analysis**
   - Analyze conversations with multiple AI participants
   - Extract individual personality profiles
   - Identify interaction dynamics and compatibility

4. **Domain-Specific Tuning**
   - Custom vocabularies for specific domains (medical, legal, technical)
   - Specialized extractors for niche applications
   - Domain expertise detection and weighting

5. **Active Learning**
   - Collect user feedback on extractions
   - Fine-tune prompts based on corrections
   - Build conversation-to-schema dataset
   - Train custom classification models

### Visualization Enhancements
1. **Real-time Extraction**
   - Live analysis as conversation progresses
   - Dynamic visualization updates
   - Confidence evolution over time

2. **Comparative Views**
   - Compare multiple personality schemas
   - Visualize personality differences
   - Blend/interpolate between schemas

3. **Interactive Refinement**
   - Click to edit extracted tokens
   - Suggest alternative tokens
   - Re-run extraction with hints

---

## Dependencies

### Required Packages

```json
{
  "dependencies": {
    // Existing dependencies...
    "@anthropic-ai/sdk": "^0.20.0",  // For Claude API (optional)
    "openai": "^4.28.0"               // For OpenAI API (optional)
  },
  "devDependencies": {
    // For testing
    "@types/node": "^20.11.0"
  }
}
```

### Environment Variables

```env
# LLM API Keys (at least one required)
VITE_ANTHROPIC_API_KEY=your_claude_api_key
VITE_OPENAI_API_KEY=your_openai_api_key

# Optional: Model configuration
VITE_DEFAULT_LLM_PROVIDER=anthropic  # or 'openai'
VITE_DEFAULT_MODEL=claude-3-5-sonnet-20241022
```

---

## Cost Considerations

### API Usage Estimates

**Per Conversation Analysis:**
- Input tokens: ~2,000-5,000 (conversation + prompts)
- Output tokens: ~500-1,000 (4 layer extractions)
- **Total per analysis**: ~3,000-6,000 tokens

**Estimated Costs:**
- Claude 3.5 Sonnet: ~$0.03-0.06 per analysis
- GPT-4 Turbo: ~$0.04-0.08 per analysis

**Cost Optimization:**
- Cache conversation preprocessing
- Batch multiple extractions
- Use cheaper models for re-extraction
- Implement local fallbacks for common patterns

---

## Success Metrics

### Extraction Quality
- **Accuracy**: Token matches ground truth (target: >85%)
- **Consistency**: Same conversation yields same schema (target: >95%)
- **Completeness**: All fields populated with valid tokens (target: 100%)
- **Confidence**: Average confidence score (target: >0.75)

### Performance
- **Latency**: Time to complete extraction (target: <10s)
- **Throughput**: Conversations analyzed per minute (target: >6)
- **Error Rate**: Failed extractions (target: <5%)

### User Experience
- **Ease of Use**: Time to first successful extraction (target: <2min)
- **Satisfaction**: User rating of extracted schema (target: >4/5)
- **Adoption**: Percentage of users trying classifier (target: >60%)

---

## Next Steps

1. **Set up development environment**
   - Create classifier directory structure
   - Install LLM SDK dependencies
   - Configure environment variables

2. **Implement core types and vocabularies**
   - Define TypeScript interfaces
   - Create comprehensive token vocabularies
   - Set up validation framework

3. **Build first extractor (Cognitive Layer)**
   - Implement as proof of concept
   - Test with sample conversations
   - Refine prompts and parsing

4. **Create simple UI prototype**
   - Basic text input
   - Display extracted schema
   - Test end-to-end flow

5. **Iterate and expand**
   - Add remaining extractors
   - Enhance UI components
   - Integrate with visualization
   - Gather feedback and refine

---

## Questions & Decisions

Before implementation, clarify:

1. **LLM Provider**: Which API should we use primarily?
   - Anthropic Claude (recommended for nuanced extraction)
   - OpenAI GPT-4 (broader availability)
   - Both with fallback logic

2. **Vocabulary Scope**: Should we:
   - Start with minimal vocabularies and expand?
   - Build comprehensive vocabularies upfront?
   - Allow custom token additions?

3. **UI Placement**: Where should conversation input live?
   - Separate tab/panel in existing UI
   - Modal overlay
   - Dedicated page

4. **Data Persistence**: Should we:
   - Save extracted schemas to localStorage
   - Implement cloud storage
   - Keep everything ephemeral

5. **Privacy**: How to handle conversation data?
   - Process entirely client-side (send to LLM only)
   - Never log or store conversations
   - Clear user consent and notices

---

## Conclusion

This implementation plan provides a comprehensive roadmap for building an LLM-based personality classifier that transforms unstructured conversations into structured visualization schemas.

The system is designed to be:
- **Modular**: Each component is independently testable and replaceable
- **Extensible**: Easy to add new layers, tokens, or extractors
- **Robust**: Graceful error handling and validation throughout
- **Fast**: Parallel processing and optimized prompts
- **User-friendly**: Simple input, clear output, easy integration

The classifier will enable users to:
1. Paste or upload AI conversations
2. Automatically extract personality layer tokens
3. Visualize AI personality in real-time
4. Compare and analyze different AI assistants
5. Fine-tune and customize extracted schemas

With this foundation, the Pantheon visualization becomes a powerful tool for understanding, comparing, and designing AI personalities.
