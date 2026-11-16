---
title: Connect WhatsApp
description: Link your WhatsApp Business number through Meta or a partner (BSP), register it, and send a first test.
---

Everything in ChatGate runs through your WhatsApp Business number, so this is the first thing to set up. Go to **Settings → WhatsApp connection**.

## Choose how to connect

| Option | When to use it |
| --- | --- |
| **Meta (directly)** | You manage your WhatsApp Business account in Meta Business Suite. Connect with Facebook, or paste a System User token for a number that's already active. |
| **Partner (BSP)** | Your number is with a WhatsApp partner. Paste the API key from your partner account — the sending number comes with the key and the webhook is set up for you. |

> [!TIP]
> Use a **permanent** System User token rather than a temporary one. A temporary token expires and sending stops until you reconnect.

## Register the number with Meta

After connecting through Meta, the number must be **registered** for sending. Until then, WhatsApp Manager shows it as *Pending* and every send fails with error **133010 — Account not registered**.

1. In **Settings → WhatsApp connection → Numbers**, press **Register number**.
2. If the number already has a two-step verification PIN, enter it. If you don't know it, reset it in WhatsApp Manager → Phone numbers → Two-step verification.
3. Press **Check status** and confirm the number now shows as registered and live.

> [!WARNING]
> Meta allows 10 registration attempts per 72 hours, and a wrong PIN counts as an attempt. Don't press Register repeatedly.

If Meta asks you to verify the number first (SMS or a call), finish that in WhatsApp Manager, then register.

## More than one number

A workspace can have several numbers. Each number answers with its own bot (chosen on the **Bot Builder** page), and replies always go out from the number the customer wrote to. A customer who writes to two of your numbers still has one conversation.

## Just testing?

Meta gives every developer account a free test number. From **Numbers**, use **Send test** to send Meta's ready-made *hello_world* template. A test number can only send to phones on its **allowed list** (Meta for Developers → WhatsApp → API Setup); other numbers fail with error 131030.

## Website chat widget

Under **Settings → Deployment & widget** you'll find the snippet for the chat widget on your website. Website chats arrive in the same inbox as WhatsApp.
