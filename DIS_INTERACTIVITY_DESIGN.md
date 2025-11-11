# Pantheon: DIS 2026 Interactivity Design Document

**Target Track:** ACM Designing Interactive Systems 2026 – Interactivity  
**Conference Dates:** 13 – 17 June 2026 (Singapore)  
**Submission Deadline:** 27 February 2026 (AoE)  
**Team Availability:** ≥1 author on-site for install, hosting, teardown  

---

## 1. Concept Overview

### 1.1 Vision
Transform Pantheon from a desktop visualization into a situated, multi-sensory installation that lets DIS attendees tune, witness, and critique the layers of an “AI personality constellation.” The piece foregrounds systemic entanglements—ethical, sociotechnical, and more-than-human—by exposing how identity, cognition, and expression are co-authored by users, environments, and speculative futures.

### 1.2 Guiding Questions
- Who controls the parameter space of AI identity, and whose values become encoded in the inner layers?
- How do environmental signals (soundscape, human presence) reshape outward expression?
- What traces do visitors leave behind, and in what ways do those traces influence subsequent participants?

### 1.3 Key Themes
- **Critical Computing & Design Theory:** Visualization as critique of personality “productization.”
- **Systemic & More-than-Human Interaction:** Incorporate ambient data and shared visitor logs to show entanglements beyond dyadic user/AI relations.
- **Change Through Design:** Encourage participants to reconfigure the constellation, then witness how later visitors inherit or resist those changes.

---

## 2. Experience Design

### 2.1 Visitor Journey
1. **Arrival & Invitation (1 min)**  
   - Ambient projection introduces “Pantheon: modular AI consciousness.”  
   - Facilitator or signage frames three prompts (e.g., “tune for communal care,” “optimize for efficiency,” “resist surveillance”).

2. **Tuning Phase (3–4 min)**  
   - Visitor uses a tangible control surface (MIDI pad / custom sliders) mapped to layers: core values, cognitive tone, expression density, engagement.  
   - Ambient microphones feed the audio-reactive channel; optional biosignal proxy (touchpad measuring skin conductivity) modulates curiosity/engagement layers.

3. **Witness Phase (2–3 min)**  
   - Scene responds in real time; contextual narrative overlays describe the system state (e.g., “Value tension rising; expression lattice saturated”).  
   - Visitor can trigger scripted scenarios (ethical crisis, collective deliberation) to observe systemic behavior.

4. **Trace & Reflection (1–2 min)**  
   - Modifications are logged to a “witness ledger” projected alongside prior sessions.  
   - Prompt invites visitor commentary on who benefits or is marginalized by their configuration.

5. **Reset with Memory**  
   - Core identity decays slowly; expression and engagement reset faster.  
   - Next visitor inherits subtle remnants, emphasizing inter-session entanglement.

### 2.2 Interaction Channels
- **Tangible Controls:**  
  - 4 sliders: Value Tilt, Cognitive Tempo, Expression Density, Engagement Threshold.  
  - 4 toggle pads: Scenario triggers (Activist Assembly / Corporate Townhall / Ecological Crisis / Collective Grief).  
  - Rotary dial: Select archive state to revisit prior constellations.

- **Sensing Inputs:**  
  - Ambient microphone or pre-curated soundscapes.  
  - Optional “pulse pad” (capacitive touch) to approximate user engagement.  

- **Outputs:**  
  - 75’’ 4K display or short-throw projector (~3 m width).  
  - Directional audio speakers providing responsive soundscape layers.  
  - Secondary display/tablet referencing witness logs and textual overlays.

### 2.3 Narrative Overlay
Contextual text surfaces along the outer ring (React UI overlay) to translate visuals into socio-technical insights (e.g., “Cognitive layer prioritizes systematic reasoning; emotional expression suppressed”). Content rotates at ~20 s cadence to avoid crowding.

---

## 3. System Architecture

### 3.1 Software Stack
- **Front-End:** React 18, Vite, TypeScript.  
- **3D & Effects:** Three.js via @react-three/fiber, @react-three/drei, custom GLSL shaders, postprocessing.  
- **Control Interface:** Web MIDI API or OSC bridge; fallback to USB HID.  
- **State Management:** Zustand or React context for rapid state sync across layers.  
- **Logging:** Lightweight Node/Express service or local IndexedDB export for witness ledger; daily reset option.

### 3.2 Hardware Configuration
- High-performance laptop / mini PC with discrete GPU (RTX 3070 equivalent).  
- 75’’ display or projector + screen, plus secondary 24’’ monitor for facilitators.  
- Tangible controller (e.g., Akai APC40 MKII or custom-built slider panel).  
- Microphone or line-in for audio-reactive input.  
- External speakers (stereo) + optional subwoofer.  
- Networking: Local Wi-Fi for remote configuration/log sync (no internet dependency).  

### 3.3 Installation Footprint
- Floor area: ~3 m × 3 m booth or corner.  
- Power: 2 × 13 A circuits (computer + AV + lighting).  
- Lighting: Controlled ambient for projection clarity; low glare for display.  
- Accessibility: Clear 1.5 m approach, controller reachable from standing or seated position.

---

## 4. Submission Assets (DIS 2026 Requirements)

| Asset | Description | Owner | Status |
| ----- | ----------- | ----- | ------ |
| **6-page PDF (ACM template)** | Manuscript covering concept, related work, design process, evaluation framing, critical stance | Lead author | Draft by Jan 2026 |
| **Technical Spec PDF** | Floor plan, hardware list, setup steps, risk & accessibility assessment, staffing plan | Tech lead | Draft by Jan 2026 |
| **Supplementary Video** | ≤5 min walkthrough (voiceover + visitor POV) demonstrating interaction & critical framing | Media designer | Shoot/edit Feb 2026 |
| **On-site Logistics Sheet** | Shipping, arrival date/time, storage, teardown, local contacts | Production manager | Feb 2026 |
| **Safety & Privacy Plan** | Audio capture notice, biosignal opt-in/out, data retention policy | Ethics liaison | Jan 2026 |

Manuscript must use ACM Primary Article Template (`\documentclass[manuscript, review]{acmart}`) and follow TAPS workflow if accepted. Submissions are **not** anonymized.

---

## 5. Development Timeline

| Phase | Dates (2025–2026) | Milestones |
| ----- | ----------------- | ---------- |
| Concept Refinement | Nov–Dec 2025 | Narrative framing, scenario design, hardware selection |
| Prototype Sprint 1 | Dec 2025 | Tangible control integration, extended sensing pipeline |
| Prototype Sprint 2 | Jan 2026 | Witness ledger logging, narrative overlay, environmental data hook |
| User/Expert Feedback | Late Jan 2026 | Run test sessions with design/AI ethics peers, capture quotes |
| Submission Prep | Feb 2026 (Weeks 1–3) | Manuscript draft, video shoot, technical appendix, risk plan |
| Submission | 27 Feb 2026 | Upload via PCS |
| Post-Acceptance | Apr–Jun 2026 | TAPS camera-ready, shipping arrangements, on-site staffing |

---

## 6. Risk & Mitigation

| Risk | Impact | Likelihood | Mitigation |
| ---- | ------ | ---------- | ---------- |
| Hardware failure / latency | Demo disruption | Medium | Redundant GPU laptop, offline build, stress test; bring spare controller |
| Audio capture consent | Privacy concerns | Medium | Display signage, offer “audio off” mode, store logs locally only |
| Accessibility barriers | Exclusion of some attendees | Medium | Provide seated control option, captioned overlays, descriptive audio |
| Crowd congestion | Reduced interaction quality | Medium | 1 facilitator per session; timed slots; queue signage |
| Travel restrictions | Team unable to install | Low | Identify backup presenter in Singapore; share install manual ahead of time |

---

## 7. Staffing Plan

| Role | Responsibilities | On-site? |
| ---- | ---------------- | -------- |
| Creative Lead | Narrative, facilitation script, on-site host | Yes (primary) |
| Technical Lead | Hardware setup, software support, log maintenance | Yes |
| Documentation Lead | Capture visitor feedback, maintain witness ledger summaries | Optional / shared |
| Remote Support | Handle code hotfixes, monitor repo | Remote |

Minimum coverage: 2 people on site throughout Interactivity session plus setup/teardown days.

---

## 8. Budget Snapshot (Preliminary)

| Item | Estimate (USD) |
| ---- | -------------- |
| Travel & lodging (2 people, 7 nights) | $5,000 |
| Shipping / extra luggage | $800 |
| Tangible controller & sensors | $600 |
| AV rental (if not provided) | $1,200 |
| Contingency (10%) | $760 |
| **Total** | **$8,360** |

Seek institutional travel grants or art/tech funding to offset costs.

---

## 9. Evaluation & Reflection

During the exhibition, capture:
- Visitor configurations (time-stamped, anonymized).  
- Short written reflections (“What tension did you notice?”).  
- Facilitator field notes on emergent conversations (agency, ethics, systemic critique).  

Post-event, synthesize into a reflective case study for potential DIS Companion paper or future publication.

---

## 10. Next Actions
1. Finalize control hardware choice and begin enclosure design (Nov 2025).  
2. Extend Pantheon codebase with witness ledger and environmental sensing (Dec 2025).  
3. Draft submission manuscript outline; assign section owners (Dec 2025).  
4. Schedule prototype evaluation sessions with interdisciplinary peers (Jan 2026).  
5. Produce submission assets and wrap logistics (Feb 2026).  

Pantheon’s layered visualization is well-positioned to meet DIS 2026’s call for ambitious, reflective interactivities. This document establishes the roadmap to translate the current demo into a critical, experiential installation ready for the Singapore exhibition.


