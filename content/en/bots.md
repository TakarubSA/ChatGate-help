---
title: Bot Builder
description: Build a WhatsApp bot visually — paths, nodes, FAQs, testing, publishing, numbers, hand-off to agents and import/export.
---

A **bot** answers customers automatically: it greets them, asks questions, shows options, looks things up and hands over to your team when needed. You build it by connecting **nodes** on a canvas.

## Bots, paths and drafts

- A bot is made of **paths** (flows). The start path runs when a conversation begins; other paths are reached from buttons, keywords or other nodes.
- You always edit a **draft**. Customers only see what you **publish**, so you can work safely on a live bot.
- **Test** a draft in the built-in WhatsApp-style simulator before publishing.

## Nodes

| Group | Nodes |
| --- | --- |
| Messages | Send a message, buttons/list options, image, video, audio, document, carousel, randomised messages, custom card, a WhatsApp template, a WhatsApp Flow form |
| Ask & remember | Collect input (with validation, NPS 1–5 / 1–10 / 1–3), request an attribute, set an attribute, set the language |
| Logic | Condition, business-hours check, go to another path or bot flow, pause / wait, timers |
| Hand-off | Transfer to an agent, switch to another bot, end the flow |
| Connect | HTTP request / JSON API, webhook, Google Sheets, Salla, send an email, run a script, trigger an event |

> [!TIP]
> A **Wait** sends the messages before it right away, then pauses. Longer waits (over a minute) continue by themselves when the time is up.

**Collect input** re-asks when the answer isn't valid (for example a number or an email). Digits typed in Arabic are accepted.

## FAQs

Add questions and answers with keywords. The bot answers them at any point in the conversation. **Workspace FAQs** (in **Settings → FAQ**) apply to every bot; a bot's own FAQs are checked first.

## Put the bot on a number

On the **Bot Builder** page, turn a WhatsApp number on for a bot. One bot answers per number; a workspace with several numbers can run a different bot on each.

You can also choose which agents see the bot's conversations. Leave nobody selected and the whole team sees them.

## Hand-off to your team

When the bot reaches **Transfer to an agent** (or the customer asks for a person), the conversation shows under **Awaiting agent** in the inbox and the team gets an alert. Outside working hours the customer gets your out-of-hours reply.

## Import and export

- **Export** a bot as a ChatGate bot file to back it up or move it to another workspace.
- **Import** a ChatGate bot file or an export from your previous platform (.zip or its .json files), or paste JSON. Paths, attributes, FAQs and keywords come across; you can also import the workspace settings.
- **Copy a path** to another bot: it arrives as a draft with the attributes it uses.

## Advanced

The **Script** node runs modern JavaScript on the conversation's attributes and returns new values — useful for formatting, calculations or reshaping API answers. Press <kbd>Ctrl</kbd>+<kbd>Space</kbd> in the editor for suggestions.
