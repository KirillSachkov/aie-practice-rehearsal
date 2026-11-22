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
- `modules.md`: the assistant's modules, who owns which data, contracts, polling of outages, failures and repeats. Read it before any question about data, integration or what happens when a system does not answer.
- `quality.md`: the three main qualities as scenarios with a check (own contract only, predictable model cost, a repeat makes no second action). Read it before changing anything those scenarios cover.
- `stages.md`: the three stages of the first version, each with the conversation that accepts it. Stage 1 has a spec (Issue #37) and tickets #38–#42; specs of stages 2 and 3 are written before their implementation. Read it before any question about what is built first.
- `docs/adr/`: decisions of the case (one context, translation at the border; queue, tickets and notices stay in company systems; one module per company system; outages are polled per address; one application of modules with one database).
- Map of open questions: GitHub Issue #14 (label `wayfinder:map`); its children are the questions. #15 «Ветки разговора по сценариям первой версии» and #16 «Слова помощника и слова систем», #17 «Как клиент узнаёт, что аварию устранили», #18 «Модули, данные и интеграция», #19 «Главные качества помощника» and #20 «Этапы первой версии и первая задача» are closed; the map is closed. Start implementation from ticket #38 (spec #37), using `implement`.

The company's requirements and systems do not change. Where they are silent, the owner decides, as if the company had trusted the team.
