# Support agent: working in this case

A first-line support assistant in the chat of a home internet and TV provider's personal account and app. This case designs it; it does not implement it yet.

## Files of the case

- `customer-requirements.md`: what the company wants: who they are, what worries them, what they expect from the assistant, what matters. Read it first in any session that decides what the assistant does or where the first version ends.
- `company-systems.md`: the company's systems (chat login, billing, network, outages, technician visits, helpdesk, knowledge base, notifications): what each can read and do, and its limits. Read the part you need when a question touches a system, an integration or a failure.
- `processes.md`: scenarios and branches by version, disputed cases, open questions. Read it when a question touches how the assistant behaves in a conversation.
- `conversations.md`: played conversations and what had to be invented.
- `language.md`: what the assistant takes ready-made, its one context, disputed words and the table translating company-system statuses into the assistant's words. Read it before naming anything that comes from a system.
- `modules.md`: the assistant's modules, who owns which data, how modules talk, a walk through the night-outage scenario. Read it before changing or naming a module.
- `contracts.md`: contracts with the eight company systems, failure and repeat rules. Read it when a question touches an integration, a failure or a repeat.
- `docs/adr/`: decisions of this case.
- `functionality.md`: all functionality of the assistant by theme, each item with the version it arrives in. Read it when a question touches what the assistant does.
- `first-version.md`: the first version: the result, what is in, what is later. Read it when deciding what belongs to the first version.
- `GLOSSARY.md`: the case vocabulary. Read it before naming anything.

The company's requirements and systems do not change. Where they are silent, the owner decides, as if the company had trusted the team.
