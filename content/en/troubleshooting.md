---
title: Troubleshooting
description: What common WhatsApp and ChatGate messages mean, and what to do about each one.
---

When WhatsApp (Meta) refuses something, ChatGate shows Meta's reason and its code. Find the code below.

## Sending messages

| Code / message | What it means | What to do |
| --- | --- | --- |
| **133010** Account not registered | **Your** sending number isn't registered with Meta yet (it shows *Pending* in WhatsApp Manager). The recipient's number is fine. | **Settings → WhatsApp connection → Register number** — see [Connect WhatsApp](/en/connect-whatsapp/#register-the-number-with-meta) |
| **131030** Recipient not in allowed list | You're sending from Meta's test number to a phone that isn't on its allowed list | Add the phone in Meta for Developers → WhatsApp → API Setup, or send from your real number |
| **131026** Message undeliverable | The number isn't on WhatsApp, uses an old version, or hasn't accepted WhatsApp's latest terms | Nothing to fix on your side; try another channel |
| **131047** Re-engagement message | More than 24 hours since the customer's last message | Send an approved template |
| **132001** Template does not exist | Meta can't find the template in that language — still in review, or deleted at Meta | Wait for approval, or press **Refresh from Meta** on Templates |
| **132000** Parameter count mismatch | The values don't match the template's variables | Give every variable a value (campaigns: a source for each one) |
| **132012** Parameter format mismatch | A value doesn't fit the template, for example a header file of the wrong type | Send the same media type the template was made with |
| **131009** / **131008** Invalid or missing parameter | A value can't be used, or a required one is missing (header image, button link…) | Use public https links; fill every required value |
| **131031** Account locked | Meta restricted the WhatsApp account | Check Business Support Home in Meta Business Suite |
| **131042** Payment issue | The WhatsApp account at Meta has a payment problem | Fix the payment method in WhatsApp Manager |
| **131048** / **131056** / **130429** Rate limits | Too many messages, reports or blocks in a short time | Wait, then send to fewer people at a time |
| **190** Token expired | The connection to Meta has expired | Reconnect in **Settings → WhatsApp connection** |

> [!TIP]
> In the template test window and the campaign test, a failed send shows the meaning and the fix right under the number.

## Creating templates

| Message | What to do |
| --- | --- |
| *Invalid parameter* followed by a reason | The reason names the part Meta refused — fix that part and send again |
| *COPY_CODE is required at index 0 when Limited Time Offer is present* | A limited-time offer needs the coupon-code button first; the builder adds it |
| *Template name already exists* | Choose another name, or press **Refresh from Meta** if you created it earlier |
| The WhatsApp provider didn't answer in time | It may still have been created. Wait a minute and press **Refresh from Meta** before trying again |
| Continue doesn't move to the next step | The reasons are listed above the buttons; fix the highlighted fields |
| A carousel isn't offered | Carousel is for **Marketing** templates only |

See [Templates](/en/templates/) for all of Meta's rules.

## Campaigns

- **"Not approved yet"** — only approved templates can be used. Authentication (verification code) templates can't be used for campaigns.
- **Recipients skipped** — numbers that opted out of promotions or are blocked are skipped on purpose.
- **Sending stopped** — the plan's monthly allowance may be used up; see [Billing](/en/billing/).
- **Some messages failed** — open the campaign to see each failure's reason, then **Retry** failed recipients.

## Account and access

- **"This feature isn't in your plan"** — the page explains which plans include it; request a change in **Billing**.
- **A page is missing from the menu** — your role doesn't include it; ask the workspace owner.
- **Digits look wrong in a field** — Arabic digits (٠١٢…) are turned into 0-9 automatically as you type or paste.
