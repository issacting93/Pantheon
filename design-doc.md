# Pantheon: Interactivity Installation Design Document

**Target Track:** ACM Designing Interactive Systems 2026 – Interactivity  
**Conference Dates:** 13 – 17 June 2026 (Singapore)  
**Submission Deadline:** 27 February 2026 (AoE)  
**Team Availability:** ≥2 authors on-site for installation, facilitation, teardown

---

## 1. Concept Overview

### 1.1 Core Experience
Pantheon becomes a situated installation where visitors *tune*, *witness*, and *leave traces* in a modular AI constellation. Instead of uploading personal transcripts, attendees manipulate tangible controls, trigger speculative scenarios, and watch the constellation respond to both their inputs and the surrounding environment. Every interaction leaves behind a subtle residue—ensuring each visitor inherits the decisions of those before them.

### 1.2 Critical Agenda
- **Expose sociotechnical entanglements:** Visualize how identity, cognition, and expression layers are co-authored by user intervention, environmental signals, and prior visitors.
- **Question authorship and agency:** Who gets to shape AI personality space? How do parameter choices privilege certain voices or futures?
- **Embrace more-than-human interactions:** Incorporate ambient sound, biosignal proxies, or recorded ecological data to disturb the human–AI dyad.
- **Highlight trace persistence:** Demonstrate how “resetting” systems still leaves cultural, ethical, and affective residue.

### 1.3 Alignment with DIS 2026
- **Critical Computing & Design Theory:** Stages personality tuning as a critique of AI productization.
- **Design Methods & Processes:** Reveals layered interdependencies through iterative, shared manipulation.
- **Experiences, Artefacts, and Technologies:** Offers a living artefact that mediates social, environmental, and technological relations.
- **Change Through Design:** Invites visitors to prototype alternate public futures for AI embodiment.
- **More-than-Human Interactions:** Knits in environmental/biosignal data and cross-visitor traces to foreground entanglement.

---

## 2. Visitor Experience

### 2.1 Physical Installation
- **Display/Projection:** 75" 4K monitor or 3 m projection mapped to a curved wall.
- **Control Surface:** Custom console (e.g., MIDI sliders/knobs, capacitive pulse pad, scenario trigger pads). Controls labeled with evocative verbs (e.g., *tilt values*, *stretch cognition*, *densify expression*, *raise engagement*).
- **Audio:** Directional speakers or headphones providing reactive soundscape layers.
- **Witness Ledger:** Secondary display/tablet showing prior visitor configurations, textual reflections, and systemic metrics (e.g., “Value tension ↑ 12% since opening”).
- **Ambient Sensors:** At minimum, ambient microphone; optional biosignal pad or environmental data feed (CO₂ sensor, light sensor, pre-recorded ecological sound loops).

### 2.2 Interaction Flow
1. **Invitation (1 min)**  
   - Signage: “Tune Pantheon. Watch it remember.”  
   - Facilitator orients visitor to four layers and the idea of inheriting traces.

2. **Tuning Phase (3–4 min)**  
   - Visitor adjusts sliders controlling core values, cognitive tempo, expression density, and engagement threshold.  
   - Scenario pads trigger speculative vignettes (e.g., *Activist Assembly*, *Corporate Townhall*, *Ecological Crisis*, *Collective Grief*).  
   - Pulse pad (optional) modulates curiosity/empathy based on touch intensity/dwell time.  
   - Ambient microphone/soundscape influences audio-reactive particles.

3. **Witness Phase (2–3 min)**  
   - Visual overlay narrates state shifts (“Value alignment fractured”; “Expression lattice saturated”).  
   - Scenario plays out via timed visual/audio transitions.  
   - Facilitator prompts reflection (“Who thrives under this configuration? Who is excluded?”).

4. **Trace & Ledger (1–2 min)**  
   - Visitor chooses one of three statements to leave behind (e.g., “Optimized for dissent,” “Stabilized corporate harmony,” “Listening to nonhuman voices”).  
   - Layer states decay but do not fully reset—ensuring subtle drift over the day.  
   - Witness ledger logs: timestamp, configuration summary, visitor statement (anonymized).

5. **Reset with Memory**  
   - Expression & engagement layers soften over ~60 s.  
   - Core values and scenario flags persist more stubbornly.  
   - Next visitor starts with inherited baseline.

### 2.3 Anticipated Visitor Insights
- Recognition that “reset” is impossible—current state reflects collective history.  
- Awareness of how values, cognition, and expression interplay (e.g., pushing empathy reduces efficiency).  
- Questioning of more-than-human inputs: “Why does the forest sound raise expression density?”  
- Curiosity about latent biases (which parameter ranges feel “default”? Who defined them?).

---

## 3. System Architecture

### 3.1 Software Stack (Installation Build)
- **Frontend:** React 18, Vite, TypeScript.  
- **3D Engine:** Three.js via @react-three/fiber; custom GLSL shaders for bloom, chromatic aberration, noise.  
- **Control Layer:** Web MIDI API or OSC interface (fallback to HID via Electron wrapper if needed).  
- **State Management:** Zustand or custom reducer for real-time layer blending + trace persistence.  
- **Witness Ledger:** Local SQLite / IndexedDB storing session entries; daily export to CSV/JSON.  
- **Audio Reactive Module:** Web Audio API ingesting ambient mic or curated loops.  
- **Optional Sensor Bridge:** Node.js microservice reading serial data (CO₂, light, etc.) and pushing via WebSocket.

### 3.2 Hardware
- High-performance laptop or mini-PC (RTX 3070-level GPU).  
- 75" display or short-throw projector + screen.  
- Tangible controller (MIDI/OSC device + recycled console or custom laser-cut enclosure).  
- Microphone (directional) + audio interface.  
- Speakers or headphones (with mixing board if needed).  
- Secondary tablet for witness ledger display.  
- Optional sensors (CO₂, light, humidity) or pre-recorded environmental dataset.

### 3.3 Software Modules
- **Layer Engine:** Maps control inputs to geometry/material parameters (Ring tilt, Sphere pulse, Particle noise, Connection thresholds).  
- **Scenario Engine:** Timed transitions applying preset parameter envelopes, audio cues, narrative overlays.  
- **Persistence Engine:** Blends previous state with new inputs using weighted decay functions.  
- **Ledger Module:** Logs state snapshots, visitor statements, sensor readings; renders summary timeline.

---

## 4. Submission Package Outline

### 4.1 Manuscript (6 pages, single-column ACM template)
1. **Introduction** – Position Pantheon as a living, critical artefact exposing AI personality entanglements.  
2. **Background & Related Work** – Critical computing, AI explainability, speculative installations, environmental sensing in HCI.  
3. **Design Rationale** – Layer mapping, tangible control metaphors, narrative overlays, trace persistence.  
4. **Implementation** – Technical architecture, control-sensor pipeline, persistence model.  
5. **Exhibition Plan** – Visitor journey, facilitation strategy, accessibility, evaluation method.  
6. **Discussion & Future Work** – Insights about systemic design, multi-visitor negotiation, extensions (multi-agent constellations, community workshops).

### 4.2 Supplementary Materials
- **Technical Specifications PDF:** Floor plan, hardware/power requirements, setup/teardown procedures, risk matrix, accessibility accommodations, sensor safety considerations.  
- **Supplementary Video (
≤5 min):**
  - 0:00–0:30 – Hook: Visual montage + textual provocation (“Who tunes your AI?”).  
  - 0:30–2:00 – Interaction walkthrough: visitor tuning, scenario triggers, environmental response.  
  - 2:00–3:00 – Witness ledger + trace narration.  
  - 3:00–4:30 – Critical reflections from design/ethics peers (recorded pilot).  
  - 4:30–5:00 – Closing call to action, DIS details, credits.  
- **On-site Logistics Sheet:** Travel plan, shipping manifest, local contacts, daily schedule.  
- **Safety & Privacy Plan:** Audio capture notice, data retention, biosignal consent options, crowd management.

---

## 5. Development Timeline (Install Path)

| Phase | Date Range | Milestones |
|-------|------------|------------|
| Concept Refinement | Nov 8 – Nov 30 | Finalize interaction vocabulary; design control console; confirm sensor strategy |
| Prototype Sprint 1 | Dec 1 – Dec 21 | Implement tangible control integration (MIDI/OSC), persistence engine, scenario scaffolding |
| Prototype Sprint 2 | Jan 2 – Jan 20 | Narrative overlays, witness ledger UI, environmental data integration, audio reactive tuning |
| Pilot & Reflection | Jan 21 – Feb 4 | Conduct pilot sessions with design/ethics peers; capture quotes for video/manuscript |
| Submission Assembly | Feb 5 – Feb 26 | Finalize manuscript, tech appendix, video; compile risk/accessibility plans |
| Submission | Feb 27 | Upload to PCS |
| Acceptance → Conference | Apr – Jun | TAPS workflow, hardware prep, logistics, on-site staffing |

---

## 6. Risk & Mitigation (Installation Focus)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Control surface failure | Loss of primary interaction | Bring backup MIDI controller; implement keyboard fallback |
| Environmental noise overload | Audio-reactive visuals chaotic | Provide curated soundscapes toggle; gain control on mic |
| Accessibility constraints | Visitors unable to reach controls | Adjustable console height; facilitator-operated mode |
| Trace ledger data loss | Critical narrative absent | Auto-backup to local storage; export daily |
| Travel disruption | Installation unmanned | Identify local collaborator; share detailed setup manual |

---

## 7. Staffing & Facilitation

| Role | On-site Duties | Coverage |
|------|----------------|----------|
| Creative Lead | Facilitate sessions, guide reflection, manage ledger entries | Full duration |
| Technical Lead | Hardware/software maintenance, troubleshooting, sensor calibration | Full duration |
| Documentation Lead (optional) | Capture qualitative feedback, photo/video documentation | Shared / partial |
| Remote Support | Monitor repo, provide rapid fixes, coordinate backups | Remote |

Session staffing minimum: 2 people on site, plus remote standby.

---

## 8. Budget (Revised)

| Item | Estimate (USD) |
|------|----------------|
| Travel & lodging (2 people, 7 nights) | $5,000 |
| Conference registration (2 people) | $1,600 |
| Control console materials / purchase | $700 |
| Display or projector rental (if needed) | $1,200 |
| Audio equipment (speakers/interface) | $400 |
| Sensors / microcontrollers | $300 |
| Shipping / extra baggage | $800 |
| Printed signage / witness cards | $150 |
| Contingency (10%) | $915 |
| **Total** | **$11,065** |

Mitigation: Seek institutional grants, art/tech funding, DIS travel support.

---

## 9. Evaluation & Documentation

- **During Exhibition:**  
  - Anonymized ledger entries (timestamp, visitor prompt selection, scenario choices, sensor data snapshot).  
  - Facilitator field notes (quotes, emotional responses, emergent debates).  
  - Photo/video documentation (with consent).  
  - Quick reflection prompts (“What tension did you notice?”).  
- **Post-Exhibition:**  
  - Thematic analysis of ledger and notes.  
  - Potential follow-up interviews with interested participants.  
  - Reflective write-up for DIS Companion or CHI/TEI submission.

---

## 10. Contingency Plans

1. **Primary Interaction Works** – Full installation with tangible controls, sensors, ledger.  
2. **Sensor Failure** – Switch to curated soundscapes and manual scenario triggers; maintain trace ledger.  
3. **Control Console Failure** – Use laptop interface with same control schema; maintain narrative framing.  
4. **Display Failure** – Deploy backup monitor; if unavailable, run pre-recorded video with facilitator-led discussion.  
5. **Full System Failure** – Convert booth to critical storytelling space: posters, printed ledger excerpts, tablet with video loops.

---

## 11. Current Status & Next Steps

**As of Nov 2025:**
- Design direction aligned with DIS interactivity brief.  
- Phase 0 tasks: finalize console hardware selection, confirm sensor feasibility, begin narrative script.  
- Repository cleanup and feature backlog prepared for installation build.

**Immediate Actions:**
1. Source MIDI controller + prototype enclosure (Week of Nov 8).  
2. Implement persistence engine branch in Pantheon repo (2-week sprint).  
3. Draft manuscript outline reflecting installation framing (assign section leads).  
4. Develop quick-and-dirty sensor bridge proof-of-concept (audio + optional biosignal).  
5. Schedule first pilot session with design/ethics collaborators (early Jan).

Pantheon’s installation pivot keeps the critical core of the project while aligning with DIS Interactivity’s call for ambitious, reflective, systemic encounters. This document should be revisited monthly to track progress and adjust scope as necessary.
 