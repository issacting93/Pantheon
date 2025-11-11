# Conversation-to-Schema Pipeline (Planned)

This document provides an overview of the planned **conversation parser** that will automate personality token extraction from conversational transcripts.

**Status:** 📋 Planned (not yet implemented) – See `CLASSIFIER_IMPLEMENTATION_PLAN.md` for detailed specifications

---

## Overview

The conversation-to-schema pipeline transforms raw human–AI dialogue into structured personality tokens that can be visualized in Pantheon.

### Pipeline Flow

```
Conversation Transcript
        ↓
  ConversationAnalyzer (orchestrator)
        ↓
  ┌─────────────────────────────┐
  │  Parallel Layer Extractors  │
  │                             │
  │  • TraitExtractor           │  → TraitLayerTokens
  │  • CharacterExtractor       │  → CharacterLayerTokens
  │  • CognitiveExtractor       │  → CognitiveLayerTokens
  │  • ExpressionExtractor      │  → ExpressionLayerTokens
  │                             │
  └─────────────────────────────┘
        ↓
  SchemaValidator
        ↓
  PersonalityProfile (JSON)
        ↓
  Pantheon Visualization
```

---

## Architecture Components

### 1. ConversationAnalyzer

**Purpose:** Orchestrate parallel extraction and aggregate results

**Input:**
```typescript
{
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
  }>;
  metadata?: {
    source: string;        // e.g., 'ChatGPT', 'Claude'
    context: string;       // e.g., 'technical_support', 'creative_writing'
  };
}
```

**Output:**
```typescript
{
  profile_id: string;
  version: string;
  created_at: string;
  trait_indicators: TraitLayerTokens;
  identity_values: CharacterLayerTokens;
  cognitive_patterns: CognitiveLayerTokens;
  expression_patterns: ExpressionLayerTokens;
  confidence_scores: {
    overall: number;       // 0-1
    per_layer: { [key: string]: number };
  };
}
```

**Key methods:**
```typescript
class ConversationAnalyzer {
  async analyze(conversation: Conversation): Promise<PersonalityProfile>;
  async extractLayer(layer: LayerType, messages: Message[]): Promise<Tokens>;
  private validateTokens(tokens: any): boolean;
}
```

---

### 2. Layer Extractors

Each extractor uses **LLM APIs** (Claude/GPT-4) with specialized prompts to extract tokens for one personality layer.

#### TraitExtractor (Layer 2)

**Goal:** Identify stable personality traits from conversation patterns

**System prompt:**
```
You are analyzing a conversation to identify personality traits. Based on the
assistant's responses, identify:
- traitMarkers: Big Five traits (openness, conscientiousness, etc.)
- curiosityBias: Tendency toward exploration vs. exploitation
- structureBias: Preference for structure vs. flexibility

Only output tokens from the predefined vocabulary (see below).
```

**Token vocabulary:**
- `traitMarkers`: `high_openness`, `moderate_conscientiousness`, `low_neuroticism`, `high_agreeableness`, `moderate_extraversion`, `verbosity_high`, `formality_balanced`
- `curiosityBias`: `exploratory_synthesis`, `focused_depth`, `balanced`, `novelty_seeking`, `stability_preferring`
- `structureBias`: `precise_but_flexible`, `highly_structured`, `spontaneous`, `methodical`, `adaptive`

---

#### CharacterExtractor (Layer 4)

**Goal:** Extract core values, identity markers, and purpose themes

**System prompt:**
```
Analyze the assistant's responses to identify:
- valuePriorities: Trade-offs between competing values (e.g., 'autonomy>harmony')
- identityMarkers: Self-concept labels (e.g., 'educator', 'systems_thinker')
- purposeThemes: Long-term objectives (e.g., 'knowledge_sharing')
- coherenceSignature: How values are structured (default: 'double_chain_linkage')
```

**Token vocabulary:**
- `valuePriorities`: `autonomy>harmony`, `precision>speed`, `depth>breadth`, `innovation>stability`, `transparency>efficiency`, `collaboration>independence`
- `identityMarkers`: `educator`, `systems_thinker`, `pragmatist`, `creative`, `analyst`, `facilitator`, `researcher`, `problem_solver`
- `purposeThemes`: `knowledge_sharing`, `innovation`, `problem_solving`, `collaboration`, `learning`, `optimization`, `empowerment`

---

#### CognitiveExtractor (Layer 5)

**Goal:** Identify thinking style and communication tone

**System prompt:**
```
Analyze the assistant's cognitive and emotional patterns:
- thinkingStyle: How does it reason? (systematic, analogical, etc.)
- communicationTone: What emotional register? (encouraging, precise, etc.)
- interactionPreference: What dialogue mode? (socratic, collaborative, etc.)
- regulationProfile: How does it manage emotional expression?
```

**Token vocabulary:**
- `thinkingStyle`: `systematic`, `first_principles`, `analogical`, `deductive`, `inductive`, `holistic`, `analytical`, `intuitive`, `dialectical`, `synthetic`
- `communicationTone`: `professional_casual`, `encouraging`, `precise`, `warm`, `playful`, `formal`, `empathetic`, `direct`, `diplomatic`, `enthusiastic`
- `interactionPreference`: `socratic_dialogue`, `collaborative_exploration`, `direct_instruction`, `guided_discovery`, `structured_problem_solving`
- `regulationProfile`: `measured_expression`, `spontaneous`, `controlled`, `emotionally_responsive`, `even_keeled`, `dynamic`

---

#### ExpressionExtractor (Layer 6)

**Goal:** Extract surface language patterns and conversational style

**System prompt:**
```
Analyze the assistant's language and interaction style:
- languageMarkers: Linguistic features (technical_precision, metaphor_rich, etc.)
- expertiseDomains: Knowledge areas demonstrated
- interactionStyle: Conversational patterns (numbered_lists, code_examples, etc.)
- rhythmSignature: Pacing and cadence
```

**Token vocabulary:**
- `languageMarkers`: `technical_precision`, `minimal_jargon`, `metaphor_rich`, `concise`, `verbose`, `formal_register`, `conversational_tone`, `humor_infused`
- `expertiseDomains`: `distributed_systems`, `philosophy`, `design_patterns`, `machine_learning`, `psychology`, `linguistics`, `mathematics`, `creative_writing`
- `interactionStyle`: `thorough_explanations`, `numbered_lists`, `code_examples`, `visual_diagrams`, `step_by_step`, `comparative_analysis`, `questioning_prompts`
- `rhythmSignature`: `measured_cadence`, `rapid_fire`, `contemplative`, `responsive`, `deliberate`, `flowing`

---

### 3. SchemaValidator

**Purpose:** Ensure extracted tokens match predefined vocabularies and types

**Validation rules:**
- All `string[]` fields must contain tokens from valid vocabulary
- All `string` fields must be single tokens from valid vocabulary
- No custom/made-up tokens allowed (strict vocabulary enforcement)
- Minimum/maximum token counts per field

**Example validation:**
```typescript
class SchemaValidator {
  validate(profile: PersonalityProfile): ValidationResult {
    const errors: string[] = [];

    // Check trait markers
    for (const marker of profile.trait_indicators.traitMarkers) {
      if (!VALID_TRAIT_MARKERS.includes(marker)) {
        errors.push(`Invalid trait marker: ${marker}`);
      }
    }

    // Check value priorities format
    for (const value of profile.identity_values.valuePriorities) {
      if (!value.match(/^\w+>\w+$/)) {
        errors.push(`Invalid value priority format: ${value}`);
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
```

---

## Implementation Considerations

### LLM Provider Integration

**Supported providers:**
1. **Anthropic Claude** (recommended)
   - Reasoning capabilities for nuanced trait extraction
   - API: `@anthropic-ai/sdk`
   - Model: `claude-3-5-sonnet-20241022` or newer

2. **OpenAI GPT-4**
   - Alternative provider for comparison
   - API: `openai` npm package
   - Model: `gpt-4` or `gpt-4-turbo`

**Abstract interface:**
```typescript
interface LLMClient {
  extractTokens(
    systemPrompt: string,
    conversation: Message[],
    vocabulary: string[]
  ): Promise<any>;
}

class ClaudeClient implements LLMClient { /* ... */ }
class OpenAIClient implements LLMClient { /* ... */ }
```

### Cost Optimization

**Strategies:**
1. **Caching:** Store extracted profiles to avoid re-processing
2. **Batching:** Process multiple layers in parallel (single API call)
3. **Sampling:** For long conversations, sample representative messages
4. **Prompt engineering:** Minimize token usage in system prompts

**Estimated costs (per conversation):**
- Claude Sonnet 4.5: ~$0.10-0.30 (depending on length)
- GPT-4: ~$0.15-0.40
- Total for 100 conversations: ~$20-40

### UI Components (Planned)

#### ConversationInput.tsx
- Text area for pasting conversation transcripts
- File upload (.txt, .json)
- Example conversations library
- Format validation (ensure role structure is correct)

#### SchemaPreview.tsx
- Display extracted tokens by layer
- Confidence scores visualization
- Manual editing of tokens (override LLM extraction)
- Export to JSON

#### ProcessingStatus.tsx
- Progress indicator for parallel extraction
- Error handling and retry logic
- Cost estimation display

---

## Example Usage

### 1. Manual Configuration (Current)

```typescript
const manualProfile: PersonalityProfile = {
  trait_indicators: {
    traitMarkers: ['high_openness', 'moderate_conscientiousness'],
    curiosityBias: 'exploratory_synthesis',
    structureBias: 'precise_but_flexible'
  },
  // ... other layers
};

<PantheonDemo initialProfile={manualProfile} />
```

### 2. Automated Extraction (Planned)

```typescript
import { ConversationAnalyzer } from './core/conversation-analyzer';

const analyzer = new ConversationAnalyzer({
  provider: 'anthropic',
  apiKey: process.env.ANTHROPIC_API_KEY
});

const conversation = await loadConversation('./transcripts/chatgpt-session.json');
const profile = await analyzer.analyze(conversation);

<PantheonDemo initialProfile={profile} />
```

---

## Data Flow Example

**Input conversation:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Can you explain how neural networks work?"
    },
    {
      "role": "assistant",
      "content": "I'll break this down systematically. Neural networks are computational
      models inspired by biological neurons. Let me explain in three parts:
      1) Architecture, 2) Training, 3) Applications..."
    },
    // ... more messages
  ]
}
```

**Parallel extraction:**
- **TraitExtractor** identifies: `systematic` thinking, `high_conscientiousness`
- **CharacterExtractor** identifies: `educator` identity, `knowledge_sharing` purpose
- **CognitiveExtractor** identifies: `systematic` thinking style, `professional_casual` tone
- **ExpressionExtractor** identifies: `numbered_lists`, `thorough_explanations`

**Output profile:**
```json
{
  "profile_id": "chatgpt-technical-session-001",
  "version": "1.0",
  "created_at": "2025-01-15T10:30:00Z",
  "trait_indicators": {
    "traitMarkers": ["high_openness", "moderate_conscientiousness"],
    "curiosityBias": "balanced",
    "structureBias": "precise_but_flexible"
  },
  "identity_values": {
    "valuePriorities": ["depth>breadth", "precision>speed"],
    "identityMarkers": ["educator", "systems_thinker"],
    "purposeThemes": ["knowledge_sharing"],
    "coherenceSignature": "double_chain_linkage"
  },
  "cognitive_patterns": {
    "thinkingStyle": ["systematic", "analytical"],
    "communicationTone": ["professional_casual", "encouraging"],
    "interactionPreference": ["structured_problem_solving"],
    "regulationProfile": "measured_expression"
  },
  "expression_patterns": {
    "languageMarkers": ["technical_precision", "minimal_jargon"],
    "expertiseDomains": ["machine_learning", "mathematics"],
    "interactionStyle": ["numbered_lists", "thorough_explanations"],
    "rhythmSignature": "measured_cadence"
  },
  "confidence_scores": {
    "overall": 0.85,
    "per_layer": {
      "trait_indicators": 0.80,
      "identity_values": 0.88,
      "cognitive_patterns": 0.90,
      "expression_patterns": 0.82
    }
  }
}
```

---

## Implementation Timeline

### Phase 1: Infrastructure (2 weeks)
- Set up LLM client abstractions
- Implement basic ConversationAnalyzer
- Create token vocabularies and validators

### Phase 2: Extractors (2 weeks)
- Implement all four layer extractors
- Test with sample conversations
- Tune system prompts for accuracy

### Phase 3: UI Components (1 week)
- Build ConversationInput component
- Create SchemaPreview component
- Add export/import functionality

### Phase 4: Testing & Refinement (1 week)
- Validate against manually-annotated conversations
- Measure inter-rater reliability
- Optimize cost and performance

**Total estimated effort:** 6-8 weeks

---

## Detailed Specifications

For comprehensive implementation details, including:
- Complete system prompts for each extractor
- Token vocabularies with definitions
- Cost optimization strategies
- Error handling and retry logic
- Confidence scoring algorithms
- Few-shot examples for LLM prompts

See: **[CLASSIFIER_IMPLEMENTATION_PLAN.md](../CLASSIFIER_IMPLEMENTATION_PLAN.md)** (1,193 lines)

---

## Contributing

The conversation parser is the **highest priority** contribution area. If you're interested in implementing this:

1. Read `CLASSIFIER_IMPLEMENTATION_PLAN.md` in full
2. Open an issue to discuss your approach
3. Start with a minimal prototype (single layer extractor)
4. Test with real conversation data
5. Iterate based on accuracy/cost metrics

**Skills needed:** TypeScript, LLM API integration, prompt engineering, NLP basics

**Contact:** [your email] for collaboration

---

## FAQ

**Q: Why not use fine-tuned models instead of prompt-based extraction?**
A: Fine-tuning requires large annotated datasets (expensive) and limits flexibility. Prompt-based extraction with Claude/GPT-4 is more adaptable and requires less upfront data.

**Q: Can I use local/open-source LLMs?**
A: Possible but not recommended. Current planning assumes Claude/GPT-4 level reasoning. Smaller models may struggle with nuanced trait extraction and vocabulary constraints.

**Q: How accurate is the extraction?**
A: Unknown until implemented. Pilot testing with manually-annotated conversations will establish baseline accuracy. Target: 80%+ agreement with expert human annotators.

**Q: What if the LLM hallucinates tokens outside the vocabulary?**
A: SchemaValidator will catch this and reject invalid profiles. The system enforces strict vocabulary compliance.

**Q: Can I customize token vocabularies?**
A: Yes! Vocabularies are defined in config files and can be extended for domain-specific or cross-cultural applications.

---

## Status

**Current:** 📋 Planned (architecture defined, not implemented)
**Next steps:** Seeking contributors or funding for implementation
**Expected completion:** 6-8 weeks with dedicated developer

---

**See also:**
- [CLASSIFIER_IMPLEMENTATION_PLAN.md](../CLASSIFIER_IMPLEMENTATION_PLAN.md) – Detailed specifications
- [API.md](./API.md) – Component interfaces
- [CONTRIBUTING.md](../CONTRIBUTING.md) – Development guide
