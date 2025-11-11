# Theoretical Foundations: Relational Frameworks for Human–AI Interaction

**Pantheon** reimagines AI transparency through the lens of **relational dynamics** rather than technical explainability. This document outlines the theoretical foundations that inform the visualization design and situates the project within Human–AI Interaction (HAI), Explainable AI, and Critical AI Studies.

---

## 1. From Technical Explainability to Relational Transparency

### The Limits of Technical Transparency

Traditional approaches to AI transparency focus on *technical* mechanisms:
- **Model interpretability**: SHAP values, attention maps, feature importance
- **Algorithmic accountability**: Audit trails, decision provenance
- **Behavioral transparency**: Input-output consistency, failure modes

These approaches answer: *"How does the system work?"*

But for conversational AI agents—chatbots, virtual assistants, AI collaborators—users don't primarily engage with algorithms. They engage with **social actors** who occupy roles, project personas, and negotiate relationships.

### Relational Transparency: A New Lens

**Relational transparency** shifts the question from "How does this work?" to:

> **"What social role is this AI performing, and how do I perceive and negotiate that positioning?"**

This reframing draws from **interpersonal psychology**, where understanding relationships requires analyzing:
1. **Role enactment** – What social scripts are being performed?
2. **Power dynamics** – Who has authority, agency, and influence?
3. **Affective tone** – What emotional register is occupied?
4. **Dependence patterns** – How reciprocal or asymmetric is the relationship?

Pantheon visualizes these dimensions spatially, making abstract relational dynamics **tangible and explorable**.

---

## 2. Theoretical Frameworks: Mapping Human Relational Models to AI

### 2.1 Games People Play (Berne, 1964) – Transactional Analysis

Eric Berne's **Transactional Analysis** describes interpersonal interactions as role-based "games" with three ego states:
- **Parent**: Authoritative, rule-giving, protective
- **Adult**: Rational, problem-solving, egalitarian
- **Child**: Spontaneous, emotional, dependent

**Application to HAI:**
AI agents can be perceived as occupying any of these roles:
- A **Parent AI** might adopt a didactic, authoritative tone (e.g., "You should prioritize security over convenience")
- An **Adult AI** positions itself as a collaborative peer (e.g., "Let's explore the trade-offs together")
- A **Child AI** might express uncertainty or playfulness (e.g., "I'm not sure, but maybe we could try...?")

**Visualization Mapping:**
- **Layer 4 (Character)** encodes value priorities and identity markers that signal which ego state the AI defaults to
- **Layer 5 (Cognitive-Emotional)** controls the *tone* of interactions (formal vs. playful, directive vs. exploratory)

Users unconsciously respond to these cues, adjusting their own role in the interaction. A Parent AI elicits compliance or resistance; an Adult AI invites collaboration; a Child AI may prompt nurturing or frustration.

### 2.2 Interpersonal Circumplex Theory (Leary, 1957; Wiggins, 1979)

The **Interpersonal Circumplex** models relationships along two axes:
1. **Agency (Dominance–Submission)** – Who has control?
2. **Communion (Affiliation–Hostility)** – How warm or cold is the interaction?

These axes create a circular space of interpersonal behaviors:

```
         Dominant (High Agency)
                 |
    Directive    |    Supportive
                 |
Hostile ---------|--------- Warm
                 |
     Detached    |    Deferential
                 |
         Submissive (Low Agency)
```

**Application to HAI:**
Conversational AI can be positioned anywhere in this space:
- **High Agency + High Warmth**: Mentor, coach, guide
- **High Agency + Low Warmth**: Expert, authority, gatekeeper
- **Low Agency + High Warmth**: Companion, peer, friend
- **Low Agency + Low Warmth**: Tool, servant, assistant

**Visualization Mapping:**
- **Layer 4 (Character)**: `valuePriorities` and `identityMarkers` determine agency posture (autonomy > harmony suggests high agency)
- **Layer 5 (Cognitive-Emotional)**: `communicationTone` and `interactionPreference` control warmth (encouraging, empathetic = high warmth)
- **Spatial position**: The parametric ring's scale and movement tempo convey dominance/submission; the central sphere's glow conveys warmth/coldness

The Interpersonal Circumplex predicts that **complementary roles stabilize relationships** (dominant seeks submissive), while **similar roles create tension** (two dominants compete). Pantheon allows researchers to visualize these dynamics and explore whether AI agents should adapt to complement users or maintain consistent positioning.

### 2.3 Relational Role Classification (Reis & Sprecher, 2009)

Relationship science categorizes roles based on:
1. **Instrumentality vs. Expressiveness** – Task-focused vs. emotional support
2. **Reciprocity vs. Exchange** – Mutual give-and-take vs. transactional exchange
3. **Stability vs. Temporality** – Long-term bonds vs. situational interactions

**Application to HAI:**
- **Instrumental AI** (e.g., code copilots, data analysts) prioritizes efficiency and task completion
- **Expressive AI** (e.g., therapy chatbots, creative collaborators) prioritizes emotional attunement
- **Reciprocal AI** learns and adapts to individual users over time
- **Transactional AI** provides consistent, context-independent responses

**Visualization Mapping:**
- **Layer 2 (Trait Indicators)**: `structureBias` signals instrumentality (precise, methodical) vs. expressiveness (exploratory, creative)
- **Layer 4 (Character)**: `purposeThemes` reveal whether the AI's purpose is task-oriented or relational
- **Layer 6 (Expression)**: `interactionStyle` determines reciprocity (adaptive tone vs. fixed persona)

### 2.4 Attachment Theory (Bowlby, 1969; Ainsworth, 1978)

Attachment theory describes relational patterns based on:
- **Secure**: Consistent, responsive, trustworthy
- **Anxious**: Unpredictable, seeking reassurance
- **Avoidant**: Distant, minimizing emotional engagement

**Application to HAI:**
AI agents can evoke attachment styles:
- A **secure AI** provides consistent, supportive responses (high predictability + high warmth)
- An **anxious AI** might over-explain or seek user validation ("Was that helpful?")
- An **avoidant AI** minimizes relational language, focusing strictly on tasks

**Visualization Mapping:**
- **Layer 2 (Trait Indicators)**: Stability of traits signals attachment security (slow-changing = secure, volatile = anxious)
- **Layer 5 (Cognitive-Emotional)**: `regulationProfile` determines consistency (measured = secure, dynamic = anxious)
- **Temporal animation**: The central sphere's "breathing" rhythm conveys emotional regulation (slow = secure, erratic = anxious)

---

## 3. Four Relational Dimensions in Pantheon

Pantheon synthesizes these frameworks into **four relational dimensions** that map to visual layers:

| Dimension | Definition | Theoretical Basis | Visual Layer |
| --------- | ---------- | ----------------- | ------------ |
| **Authority Posture** | How consistent, predictable, and rule-bound is the AI? High authority = directive, low authority = adaptive | Berne (Parent/Adult/Child), Interpersonal Circumplex (Dominance) | **Layer 2: Trait Indicators** – Stability over time |
| **Identity Coherence** | What does the AI stand for? What values guide its responses? | Relational Role Classification (Instrumentality vs. Expressiveness) | **Layer 4: Character & Self-Concept** – Core values and purpose |
| **Affect & Reciprocity** | What emotional register does it occupy? Is it warm or cold, directive or exploratory? | Interpersonal Circumplex (Communion), Attachment Theory (Responsiveness) | **Layer 5: Cognitive-Emotional** – Tone and interaction style |
| **Dependence Dynamics** | How much does the AI adapt to context vs. maintain a fixed persona? | Reciprocity Theory (Exchange vs. Mutual Adaptation) | **Layer 6: Expression & Social Identity** – Surface language and rhythm |

These dimensions are **not independent**—they interact to create an overall relational posture:
- A **mentor** might have high authority, clear identity, warm affect, and low dependence (consistent guidance)
- A **peer collaborator** might have moderate authority, flexible identity, warm affect, and high dependence (adaptive support)
- An **expert system** might have high authority, narrow identity, cold affect, and no dependence (transactional exchange)

By visualizing these dimensions spatially, Pantheon reveals the **relational politics** embedded in conversational AI design choices.

---

## 4. Positioning Pantheon in HAI Research

### 4.1 Human–AI Interaction (HAI)

**Key debates in HAI:**
- Should AI agents be designed to complement or mirror human behavior?
- How do users perceive AI agency, intentionality, and social presence?
- What are the ethical implications of anthropomorphizing AI?

**Pantheon's contribution:**
- Provides a **visual framework** for analyzing AI social positioning
- Enables comparative studies of personality configurations
- Surfaces design assumptions about appropriate AI roles

**Related work:**
- Nass & Moon (2000): Computers Are Social Actors (CASA) paradigm
- Cowan et al. (2017): Rapport and relational agents
- Jakesch et al. (2019): AI disclosure effects on conversation

### 4.2 Explainable AI (XAI)

**Key debates in XAI:**
- How much transparency is necessary for trust?
- Who is the audience for explanations (end users vs. auditors)?
- Can post-hoc explanations accurately reflect model behavior?

**Pantheon's contribution:**
- Reframes transparency as **relational legibility** rather than technical interpretability
- Visualizes the *social interface* of AI rather than the algorithmic substrate
- Proposes that users need to understand *how to relate to AI*, not how it computes

**Related work:**
- Doshi-Velez & Kim (2017): Interpretability taxonomy
- Miller (2019): Explanation as social practice
- Chromik et al. (2021): Dark patterns in XAI

### 4.3 Computational Social Science

**Key debates:**
- How can we systematically analyze conversational dynamics at scale?
- What metrics capture relational quality (beyond sentiment)?
- How do we trace shifts in role enactment over time?

**Pantheon's contribution:**
- Offers a **spatialized metric space** for personality configurations
- Enables temporal tracking of personality drift (when classifier is implemented)
- Provides a shared vocabulary for cross-disciplinary conversation analysis

**Related work:**
- Danescu-Niculescu-Mizil et al. (2012): Linguistic coordination in conversation
- Prabhakaran & Rambow (2014): Power and politeness
- Althoff et al. (2016): Linguistic style matching

### 4.4 Critical AI Studies

**Key debates:**
- Who benefits from "helpful, harmless, and honest" AI framing?
- How do AI systems reinforce or disrupt social hierarchies?
- What ideologies are encoded in conversational design choices?

**Pantheon's contribution:**
- Makes **relational power dynamics visible**
- Questions what "consistency" and "adaptability" mean in conversational AI
- Reveals that AI personality is not neutral—it performs politics

**Related work:**
- Crawford (2021): Atlas of AI (labor, power, and capital)
- Benjamin (2019): Race After Technology
- Birhane & van Dijk (2020): Robot rights, human consequences

---

## 5. Conceptual Innovations

### 5.1 Personality as Cartography

Traditional AI personality models treat traits as **fixed attributes** (e.g., Big Five scores). Pantheon treats personality as **dynamic landscape**—a navigable space where:
- **Spatial position** = relational configuration
- **Movement** = adaptation over time
- **Distance** = relational similarity/difference

This shift from *trait list* to *living cartography* enables:
- Visual comparison of AI agents (overlay multiple personalities)
- Temporal tracking of personality drift
- Exploration of "nearby" configurations (e.g., "What if we increase warmth by 10%?")

### 5.2 Temporal Hierarchy in Personality

Pantheon's four layers operate at different **update frequencies**:
- **Layer 2 (Traits)**: Weeks–Months – Stable identity
- **Layer 4 (Character)**: Months – Core values
- **Layer 5 (Cognitive-Emotional)**: Days – Situational tone
- **Layer 6 (Expression)**: Hours – Surface adaptation

This temporal hierarchy reflects **coherence constraints**—an AI can't be "trustworthy" if its values shift daily, but it *should* adapt its language to context.

**Why this matters:**
- Users perceive **rapidly changing core traits** as inconsistency or deception
- Users perceive **static surface language** as robotic or insincere
- The right balance creates **authentic adaptability**

### 5.3 Relational Transparency as Design Requirement

If AI agents are perceived as social actors (CASA paradigm), then transparency must include:
1. **Role clarity**: What position is this AI occupying? (mentor, peer, tool)
2. **Posture legibility**: What authority/warmth does it project?
3. **Adaptation boundaries**: What will it change vs. hold stable?

**Design implication:** AI systems should disclose not just *what they know* but **how they relate**—and Pantheon provides the visual vocabulary for that disclosure.

---

## 6. Methodological Affordances

Pantheon enables several research methodologies:

### 6.1 Comparative Personality Analysis
**Method:** Load multiple personality profiles and compare their spatial configurations
**Research questions:**
- How do ChatGPT, Claude, and Gemini differ in relational positioning?
- Do domain-specific AI agents (medical, legal, creative) occupy distinct regions of personality space?

### 6.2 Perceptual Studies
**Method:** Show participants visualizations and ask them to rate perceived traits (warmth, authority, trustworthiness)
**Research questions:**
- Do spatial metaphors effectively communicate relational dimensions?
- Can users accurately infer personality from visualization alone?

### 6.3 Longitudinal Tracking
**Method:** Visualize the same AI agent's personality over time (e.g., after fine-tuning or RLHF)
**Research questions:**
- How do AI personalities drift during training?
- Does user feedback push AI toward specific relational postures?

### 6.4 Intervention Studies
**Method:** Manipulate personality layers and measure user perception/behavior
**Research questions:**
- Does increasing Layer 5 warmth improve user satisfaction?
- Does decreasing Layer 2 stability (trait consistency) reduce trust?

---

## 7. Limitations and Future Directions

### Limitations

1. **No conversation parser yet**: Current system requires manual personality configuration
2. **Limited validation**: Mapping between visual metaphors and perceived traits needs empirical testing
3. **Western-centric frameworks**: Relational models (Berne, Leary) reflect WEIRD (Western, Educated, Industrialized, Rich, Democratic) cultural norms
4. **Static visualizations**: Current system doesn't show temporal evolution within a single conversation

### Future Directions

1. **Cross-cultural personality models**: Integrate frameworks from non-Western relationship theories
2. **Real-time conversation tracking**: Animate personality shifts during live dialogue
3. **Multi-agent visualizations**: Show relational dynamics between multiple AI agents
4. **User modeling**: Visualize not just AI personality but human-AI relational fit
5. **Embodied interaction**: Tangible controls for manipulating personality (see `DIS_INTERACTIVITY_DESIGN.md`)

---

## 8. Conclusion: Toward a Poetics of AI Relations

Pantheon proposes that understanding AI agents requires a **relational epistemology**—a way of knowing grounded in interpersonal dynamics rather than computational mechanisms.

By visualizing AI personality as living cartography, Pantheon:
- Makes abstract relational dynamics **tangible**
- Surfaces the **politics** of conversational design
- Enables **comparative analysis** of AI social postures
- Provides a **shared vocabulary** for HAI research

The ultimate goal is not merely to explain AI behavior, but to **reflect on how we relate to AI**—and what kinds of relationships we want to design.

---

## References

**Core Theoretical Works:**
- Berne, E. (1964). *Games People Play*. Grove Press.
- Leary, T. (1957). *Interpersonal Diagnosis of Personality*. Ronald Press.
- Wiggins, J. S. (1979). A psychological taxonomy of trait-descriptive terms: The interpersonal domain. *Journal of Personality and Social Psychology, 37*(3), 395.
- Reis, H. T., & Sprecher, S. (Eds.). (2009). *Encyclopedia of Human Relationships*. SAGE.
- Bowlby, J. (1969). *Attachment and Loss: Vol. 1. Attachment*. Basic Books.
- Ainsworth, M. D. S., et al. (1978). *Patterns of Attachment*. Erlbaum.

**Human–AI Interaction:**
- Nass, C., & Moon, Y. (2000). Machines and mindlessness: Social responses to computers. *Journal of Social Issues, 56*(1), 81-103.
- Cowan, B. R., et al. (2017). "What can I help you with?": Infrequent users' experiences of intelligent personal assistants. *MobileHCI '17*.
- Jakesch, M., et al. (2019). AI disclosure and user perceptions. *CHI '19*.

**Explainable AI:**
- Doshi-Velez, F., & Kim, B. (2017). Towards a rigorous science of interpretable machine learning. *arXiv:1702.08608*.
- Miller, T. (2019). Explanation in artificial intelligence: Insights from the social sciences. *Artificial Intelligence, 267*, 1-38.
- Chromik, M., et al. (2021). Dark patterns of explainability. *CHI '21 Workshop*.

**Computational Social Science:**
- Danescu-Niculescu-Mizil, C., et al. (2012). Echoes of power: Language effects and power differences in social interaction. *WWW '12*.
- Prabhakaran, V., & Rambow, O. (2014). Predicting power relations between participants in dialogues. *ACL '14*.
- Althoff, T., et al. (2016). Large-scale analysis of counseling conversations. *TACL, 4*, 463-476.

**Critical AI Studies:**
- Crawford, K. (2021). *Atlas of AI*. Yale University Press.
- Benjamin, R. (2019). *Race After Technology*. Polity Press.
- Birhane, A., & van Dijk, J. (2020). Robot rights? Let's talk about human welfare instead. *AIES '20*.
