# Support agent: working in this case

A first-line support assistant in the chat of a home internet and TV provider's personal account and app. This case designs it; it does not implement it yet.

## Files of the case

- `customer-requirements.md`: what the company wants: who they are, what worries them, what they expect from the assistant, what matters. Read it first in any session that decides what the assistant does or where the first version ends.
- `company-systems.md`: the company's systems (chat login, billing, network, outages, technician visits, helpdesk, knowledge base, notifications): what each can read and do, and its limits. Read the part you need when a question touches a system, an integration or a failure.
- `first-version.md`: the boundary of the first version: what the assistant finishes itself, when it hands the conversation to an operator, what it does at night, what is postponed. Read it before any question about what the assistant does.
- `GLOSSARY.md`: the case terms (in Russian). Use these words.
- `processes.md`: how the assistant conducts each scenario of the first version step by step: events, handoff rules, disputed cases with examples, open questions. Read it before any question about what the assistant says or does in a conversation.
- `conversations.md`: conversations played by the owner against `processes.md`. Use them as examples of the expected tone and outcome.
- `system-words.md`: how the words of the company's systems become the assistant's words, where the translation happens. Read it before writing what the assistant says about a contract status, an outage or a helpdesk ticket.
- `docs/adr/`: decisions of the case (one context, translation at the border; queue, tickets and notices stay in company systems).
- Map of open questions: GitHub Issue #14 (label `wayfinder:map`); its children are the questions. #15 «Ветки разговора по сценариям первой версии» and #16 «Слова помощника и слова систем» are closed; the unblocked one is #17. Use `wayfinder` to work the map, one ticket per session.

The company's requirements and systems do not change. Where they are silent, the owner decides, as if the company had trusted the team.
