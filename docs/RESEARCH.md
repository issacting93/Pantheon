# Research Methodology: Using Pantheon for HAI Studies

This document provides methodological guidance for researchers, designers, and practitioners who want to use Pantheon to study human–AI relational dynamics.

---

## Table of Contents

1. [Research Paradigms](#1-research-paradigms)
2. [Study Design Templates](#2-study-design-templates)
3. [Data Collection Methods](#3-data-collection-methods)
4. [Analysis Frameworks](#4-analysis-frameworks)
5. [Ethical Considerations](#5-ethical-considerations)
6. [Example Research Questions](#6-example-research-questions)
7. [Limitations & Mitigation Strategies](#7-limitations--mitigation-strategies)

---

## 1. Research Paradigms

Pantheon supports multiple research approaches:

### 1.1 Exploratory Research (Qualitative)

**Goal:** Generate insights about how users perceive and interpret AI personality visualizations

**Methods:**
- Think-aloud protocols while exploring visualizations
- Semi-structured interviews about perceived traits
- Diary studies tracking impressions over multiple sessions
- Focus groups comparing personality configurations

**Data types:**
- Verbal descriptions of perceived personality
- Sketches or annotations of spatial configurations
- Narrative accounts of relational positioning
- Comparative assessments ("This AI seems more X than that one")

**Example research question:**
> "How do users describe the relational posture of an AI when shown its Pantheon visualization?"

---

### 1.2 Comparative Studies (Mixed Methods)

**Goal:** Systematically compare personality configurations across AI agents or contexts

**Methods:**
- Between-subjects comparison (each participant sees one configuration)
- Within-subjects comparison (participants compare multiple configurations)
- A/B testing of visualization parameters
- Longitudinal tracking of personality drift

**Data types:**
- Likert-scale ratings (warmth, authority, trustworthiness)
- Forced-choice comparisons ("Which AI would you prefer as a mentor?")
- Behavioral traces (time spent examining each layer, zoom patterns)
- Physiological measures (eye tracking, galvanic skin response)

**Example research question:**
> "Do users perceive ChatGPT, Claude, and Gemini as occupying distinct positions in personality space?"

---

### 1.3 Intervention Studies (Experimental)

**Goal:** Test causal relationships between personality dimensions and user perception/behavior

**Methods:**
- Randomized controlled trials (manipulate personality, measure outcomes)
- Factorial designs (vary multiple dimensions independently)
- Counterbalancing to control for order effects
- Pre-post assessments of personality changes

**Data types:**
- Outcome measures (trust, satisfaction, task performance)
- Manipulation checks (did users notice the change?)
- Moderator variables (user expertise, prior AI experience)

**Example research question:**
> "Does increasing Layer 5 warmth (communication tone) improve user satisfaction with AI support?"

---

### 1.4 Critical/Reflexive Research (Humanities)

**Goal:** Interrogate the politics and ideologies embedded in AI personality design

**Methods:**
- Discourse analysis of personality token vocabularies
- Participatory design workshops with stakeholders
- Speculative design explorations ("What if AI had X trait?")
- Reflexive journaling by researchers

**Data types:**
- Qualitative coding of design assumptions
- Stakeholder power analyses (who benefits from which configurations?)
- Counter-narratives and alternative framings
- Historical tracing of personality models

**Example research question:**
> "What cultural norms are encoded in the 'ideal mentor' personality archetype?"

---

## 2. Study Design Templates

### 2.1 Perceptual Study: Mapping Visual Features to Perceived Traits

**Objective:** Validate the mapping between spatial metaphors and relational dimensions

#### Study Protocol

1. **Stimulus creation:**
   - Create 10-15 personality configurations spanning the design space
   - Ensure variation across all four layers (trait, character, cognitive, expression)
   - Export visualization screenshots or interactive demos

2. **Participant task:**
   - View each visualization for 30-60 seconds
   - Rate perceived traits on Likert scales:
     - Warmth (1-7): Cold–Warm
     - Authority (1-7): Submissive–Dominant
     - Consistency (1-7): Unpredictable–Reliable
     - Adaptability (1-7): Rigid–Flexible
   - Open-ended: "How would you describe this AI's personality?"

3. **Data analysis:**
   - Correlate visual parameters (e.g., central sphere glow intensity) with ratings
   - Cluster analysis: Do participants group personalities similarly?
   - Qualitative coding of open-ended responses

**Hypothesis:** Visualizations with larger central spheres will be rated higher in authority; denser particle clouds will be rated higher in warmth.

**Sample size:** 30-50 participants (sufficient for correlational analysis)

**Expected outcome:** Validation of spatial grammar + insights into interpretation variability

---

### 2.2 Comparative Study: AI Agent Personality Profiling

**Objective:** Compare the personality configurations of major conversational AI systems

#### Study Protocol

1. **Data collection:**
   - Collect 10-20 conversation transcripts for each AI agent (ChatGPT, Claude, Gemini, etc.)
   - Manually configure personality tokens based on observed behavior
   - (Future: Use conversation parser to automate extraction)

2. **Visualization generation:**
   - Render each AI's personality in Pantheon
   - Export static screenshots + interactive 3D demos

3. **Expert evaluation:**
   - Recruit HAI researchers or experienced AI users (n=15-20)
   - Show visualizations in random order (blinded to AI identity)
   - Ask: "Which AI does this represent?" (identification task)
   - Ask: "How would you describe this AI's relational posture?" (free response)

4. **Data analysis:**
   - Confusion matrix: How often is each AI correctly identified?
   - Qualitative comparison: What distinguishes each AI's positioning?
   - Spatial distance metrics: How far apart are AI agents in personality space?

**Hypothesis:** Different AI agents will occupy distinct regions of personality space, and experts will be able to identify them at above-chance rates.

**Sample size:** 15-20 experts + 5-10 AI agents

**Expected outcome:** Personality taxonomy of major AI systems + evidence for discriminability

---

### 2.3 Intervention Study: Personality Tuning for User Satisfaction

**Objective:** Test whether adjusting personality layers improves user satisfaction

#### Study Protocol

1. **Baseline:**
   - Participants interact with AI chatbot (control personality configuration)
   - Measure satisfaction, trust, task completion time

2. **Intervention:**
   - Randomly assign participants to conditions:
     - **Condition A:** Increase Layer 5 warmth (communication tone)
     - **Condition B:** Increase Layer 2 consistency (trait stability)
     - **Condition C:** Increase Layer 6 adaptability (expression variability)
     - **Control:** No change

3. **Post-interaction:**
   - Show Pantheon visualization of the AI they interacted with
   - Ask: "Does this visualization match your experience?"
   - Measure satisfaction, trust, perceived warmth/authority/consistency

4. **Data analysis:**
   - ANOVA: Effect of condition on satisfaction/trust
   - Mediation analysis: Does perceived warmth mediate the effect of Layer 5 manipulation?
   - Alignment check: Do Pantheon visualizations align with subjective experience?

**Hypothesis:** Participants in the "warmth" condition will report higher satisfaction and correctly identify warmth in the visualization.

**Sample size:** 80-100 participants (20-25 per condition, powered for medium effect size)

**Expected outcome:** Evidence for causal relationship between personality layers and user outcomes

---

### 2.4 Longitudinal Study: Personality Drift Over Time

**Objective:** Track how AI personality changes across conversations or training iterations

#### Study Protocol

1. **Temporal sampling:**
   - Extract personality profiles at regular intervals (e.g., every 10 conversations)
   - (Future: Automated extraction with conversation parser)

2. **Visualization sequence:**
   - Create time-series animation showing personality evolution
   - Identify inflection points (when did major shifts occur?)

3. **Participant perception:**
   - Show participants pairs of visualizations (time T vs. time T+1)
   - Ask: "Did this AI's personality change? If so, how?"
   - Measure perceived stability vs. adaptability

4. **Data analysis:**
   - Time-series analysis: Which layers change most/least?
   - Event detection: Correlate shifts with external events (e.g., model updates)
   - Participant agreement: Do users perceive changes researchers observe?

**Hypothesis:** Layer 6 (expression) will show high variability; Layer 2 (traits) will remain stable.

**Sample size:** 20-30 participants + 50-100 temporal snapshots per AI

**Expected outcome:** Characterization of personality stability/adaptation patterns

---

## 3. Data Collection Methods

### 3.1 Self-Report Measures

**Standardized scales:**
- **Interpersonal Circumplex Scales** (ICS): Measure perceived agency and communion
- **Godspeed Questionnaire**: Anthropomorphism, animacy, likeability, intelligence
- **Trust in Automation Scale**: Measure AI trustworthiness
- **Big Five Inventory** (adapted for AI): Openness, conscientiousness, extraversion, agreeableness, neuroticism

**Custom scales for relational dimensions:**
```
Authority Posture (1-7)
□ Submissive ... □ Balanced ... □ Dominant

Identity Coherence (1-7)
□ Fragmented ... □ Somewhat Coherent ... □ Highly Coherent

Affect & Reciprocity (1-7)
□ Cold & Directive ... □ Neutral ... □ Warm & Collaborative

Dependence Dynamics (1-7)
□ Fixed Persona ... □ Context-Sensitive ... □ Highly Adaptive
```

### 3.2 Behavioral Measures

**Interaction traces:**
- Camera orbit patterns (which layers do users examine most?)
- Zoom depth (how close do users look?)
- Time-on-task (how long do they explore?)
- Click/hover events (which elements draw attention?)

**Eye tracking:**
- Fixation duration on central sphere vs. periphery
- Saccade patterns (do users follow hierarchical structure?)
- Heat maps of attention

**Physiological measures:**
- Galvanic skin response (emotional arousal)
- Heart rate variability (stress/engagement)
- Facial expression analysis (positive/negative affect)

### 3.3 Qualitative Data

**Think-aloud protocols:**
- "Tell me what you're noticing as you explore this visualization"
- "What does this geometry make you think of?"
- "If this were an AI assistant, how would you relate to it?"

**Semi-structured interviews:**
- "Describe the personality of this AI in your own words"
- "How does this AI compare to others you've used?"
- "What would you change to make this AI more trustworthy?"

**Diary studies:**
- Daily logs of interactions with AI
- Weekly reflections on perceived personality changes
- Critical incident reports (moments of surprise/frustration)

---

## 4. Analysis Frameworks

### 4.1 Quantitative Analysis

**Correlational analysis:**
- Pearson/Spearman correlations between visual parameters and ratings
- Partial correlations controlling for confounds (e.g., visual complexity)

**Regression models:**
- Predict satisfaction from personality dimensions
- Identify which layers have strongest effects

**Clustering:**
- k-means or hierarchical clustering of personality configurations
- Identify personality archetypes (mentor, peer, expert, etc.)

**Spatial analysis:**
- Euclidean distance between AI agents in personality space
- Multidimensional scaling (MDS) to visualize relationships

**Time-series analysis:**
- Autoregressive models for personality drift
- Change-point detection for identifying shifts

### 4.2 Qualitative Analysis

**Thematic analysis:**
- Inductive coding of interview transcripts
- Identify recurring themes in personality descriptions
- Compare across participants and configurations

**Discourse analysis:**
- Analyze language used to describe AI personalities
- Identify metaphors and framing (e.g., "parent-child" vs. "peer-peer")
- Trace power dynamics in relational descriptions

**Grounded theory:**
- Generate theory from data rather than testing pre-existing hypotheses
- Iterative coding and theory refinement
- Saturate categories until no new insights emerge

### 4.3 Mixed-Methods Integration

**Triangulation:**
- Compare findings from quantitative ratings and qualitative interviews
- Do they converge or diverge? What explains discrepancies?

**Sequential explanatory design:**
1. Quantitative phase: Identify significant effects (e.g., warmth improves satisfaction)
2. Qualitative phase: Explain *why* (interviews with participants)

**Concurrent nested design:**
- Embed qualitative data collection within quantitative study
- Use qualitative insights to interpret quantitative patterns

---

## 5. Ethical Considerations

### 5.1 Informed Consent

**Disclosure requirements:**
- Participants should know they're evaluating AI personality visualizations
- Explain that visualizations are *interpretations*, not ground truth
- Clarify whether they'll interact with AI agents or just view visualizations

**Deception considerations:**
- If studying perception without AI knowledge, justify necessity
- Full debrief required post-study

### 5.2 Participant Wellbeing

**Potential risks:**
- **Cognitive load**: Visualizations may be overwhelming for non-experts
- **Anthropomorphism**: Users may over-attribute human traits to AI
- **Anxiety**: Visualizations might trigger concerns about AI autonomy

**Mitigation strategies:**
- Provide tutorial on spatial grammar before study
- Remind participants that AI lacks consciousness/intentionality
- Offer breaks during lengthy exploration tasks

### 5.3 Data Privacy

**Conversation data:**
- If using real conversation transcripts, obtain informed consent
- Anonymize personally identifiable information (PII)
- Store data securely (encrypted, access-controlled)

**Personality profiles:**
- Clarify who owns AI personality data (user vs. provider)
- Allow participants to opt out of personality profiling
- Avoid sensitive inferences (e.g., mental health status from AI tone)

### 5.4 Representation & Bias

**Potential biases in personality frameworks:**
- Western-centric models (Big Five, Interpersonal Circumplex)
- Neurotypical assumptions (e.g., "measured expression" as ideal)
- Cultural norms around authority and reciprocity

**Mitigation strategies:**
- Recruit diverse participant samples
- Adapt token vocabularies for cross-cultural studies
- Acknowledge limitations in publications

---

## 6. Example Research Questions

### Human Perception Studies

1. "Do spatial metaphors effectively communicate relational dimensions of AI personality?"
2. "Can users reliably distinguish between mentor, peer, and expert AI roles from visualizations alone?"
3. "How do prior beliefs about AI influence interpretation of personality visualizations?"
4. "What individual differences (e.g., visualization literacy) predict accurate personality inference?"

### Comparative AI Studies

5. "How do commercial AI assistants (ChatGPT, Claude, Alexa) differ in relational positioning?"
6. "Are domain-specific AI agents (medical, legal, creative) more specialized in personality space?"
7. "Do open-source and commercial AI models occupy distinct personality regions?"

### Design & Intervention Studies

8. "What personality configuration maximizes user trust in high-stakes domains (medical, financial)?"
9. "Should AI adapt its personality to individual users, or maintain consistency?"
10. "How does personality transparency (showing the visualization) affect user perception?"

### Temporal & Longitudinal Studies

11. "How does AI personality drift after RLHF (reinforcement learning from human feedback)?"
12. "Do users prefer AI that adapts over time or remains stable?"
13. "Can we predict when personality shifts will occur based on training data?"

### Critical & Sociocultural Studies

14. "What ideologies are encoded in 'ideal' AI personality archetypes?"
15. "How do different stakeholder groups (users, developers, policymakers) envision AI roles?"
16. "Do personality visualizations reinforce or challenge power dynamics in human–AI interaction?"

---

## 7. Limitations & Mitigation Strategies

### 7.1 Limitation: Manual Personality Configuration

**Issue:** Current system requires researchers to manually configure personality tokens (no automated conversation parser)

**Mitigation:**
- Develop coding guidelines for reliable manual extraction
- Use multiple raters and calculate inter-rater reliability (Cohen's kappa)
- Prioritize conversation parser implementation (see `CLASSIFIER_IMPLEMENTATION_PLAN.md`)

**Workaround:**
- Focus on comparative studies where manual configuration is feasible (5-10 AI agents)
- Use standardized personality archetypes (mentor, peer, expert) with pre-defined tokens

---

### 7.2 Limitation: Interpretation Variability

**Issue:** Users may interpret the same visualization differently based on prior experience

**Mitigation:**
- Measure and control for confounds (visualization literacy, AI familiarity)
- Provide training on spatial grammar before experimental tasks
- Include manipulation checks ("What does the glowing sphere represent?")

**Workaround:**
- Use within-subjects designs (each participant is their own control)
- Analyze individual trajectories rather than aggregating across participants

---

### 7.3 Limitation: Western-Centric Frameworks

**Issue:** Relational frameworks (Berne, Leary) reflect WEIRD (Western, Educated, Industrialized, Rich, Democratic) cultural norms

**Mitigation:**
- Recruit diverse, international participant samples
- Adapt token vocabularies based on cultural consultation
- Acknowledge cultural specificity in research reports

**Workaround:**
- Focus initial studies on populations where frameworks are validated
- Conduct cross-cultural comparative studies to identify variations

---

### 7.4 Limitation: Static Visualizations

**Issue:** Current system shows personality at a single time point, not temporal evolution

**Mitigation:**
- Export time-series visualizations and create animations
- Implement temporal overlay feature (show personality at T1 vs. T2 simultaneously)

**Workaround:**
- Use longitudinal study designs with repeated measurements
- Manually create comparison visualizations for key time points

---

### 7.5 Limitation: Ecological Validity

**Issue:** Viewing visualizations is different from interacting with AI in naturalistic settings

**Mitigation:**
- Combine visualization studies with live interaction studies
- Show visualizations *after* interaction to test alignment with experience
- Use mixed-methods to capture both perception and lived experience

**Workaround:**
- Frame studies as "exploring *potential* personality configurations" rather than "evaluating specific AI agents"

---

## 8. Publishing & Dissemination

### 8.1 Venue Recommendations

**HCI Conferences:**
- **ACM CHI** (Human Factors in Computing Systems) – Broad HCI audience
- **ACM DIS** (Designing Interactive Systems) – Interactive installations, design research
- **ACM C&C** (Creativity & Cognition) – Creative uses of visualization

**AI/ML Conferences:**
- **ACM FAccT** (Fairness, Accountability, Transparency) – Critical AI studies
- **AAAI HCOMP** (Human Computation) – Human–AI collaboration
- **NeurIPS Workshops** – Alignment, interpretability

**Specialized Journals:**
- *International Journal of Human-Computer Interaction*
- *ACM Transactions on Interactive Intelligent Systems*
- *AI & Society* (critical perspectives)
- *New Media & Society* (sociotechnical analysis)

### 8.2 Publication Types

**Full papers:** Comprehensive empirical studies (8-10 pages CHI format)
**Short papers:** Preliminary findings or focused contributions (4 pages)
**Pictorials:** Visual essays on design process (DIS format)
**Demonstrations:** Interactive system showcases (video + 2-page description)
**Workshops:** Convene community around relational transparency

---

## 9. Resources for Researchers

### Open Datasets (Future)

- **Pantheon Personality Corpus**: Curated set of 50+ personality configurations spanning the design space
- **AI Agent Transcripts**: Anonymized conversations with major AI systems for comparison studies
- **Perceptual Ratings**: Crowd-sourced ratings of visualizations (trust, warmth, authority)

### Research Tools (Future)

- **Personality Sampler**: Generate random personality configurations for stimulus creation
- **Comparison Mode**: Side-by-side visualization of multiple personalities
- **Temporal Animator**: Animate personality drift over time
- **Export Pipeline**: Batch export screenshots/videos for stimulus presentation

---

## Conclusion

Pantheon opens new methodological possibilities for studying human–AI relational dynamics. By providing a **visual grammar** for personality and a **shared vocabulary** for discussing AI social positioning, it enables rigorous, systematic research on questions that were previously difficult to operationalize.

Whether your goal is to **validate the spatial metaphors**, **compare AI agents**, **design better personalities**, or **critique the politics of AI roles**, Pantheon provides a flexible platform for investigation.

The key insight: Understanding AI personality is not just about measuring traits—it's about **exploring relational space**.

---

## Contact & Collaboration

**Research partnerships:** [your email]
**Study pre-registration:** Share your research plans on [Open Science Framework](https://osf.io/)
**Join the discussion:** [GitHub Discussions](https://github.com/[your-repo]/pantheon/discussions)

---

## References

**Research Methods:**
- Creswell, J. W., & Clark, V. L. P. (2017). *Designing and Conducting Mixed Methods Research*. SAGE.
- Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. *Qualitative Research in Psychology, 3*(2), 77-101.

**HAI Research:**
- Amershi, S., et al. (2019). Guidelines for human-AI interaction. *CHI '19*.
- Wang, D., et al. (2021). Human–AI collaboration in data science. *CSCW '21*.

**Ethics:**
- Shneiderman, B. (2020). Human-centered artificial intelligence. *IEEE Computer, 53*(4), 81-84.
- Floridi, L., et al. (2018). AI4People—An ethical framework for a good AI society. *Minds and Machines, 28*(4), 689-707.
