---
title: Templates
description: Create WhatsApp message templates that Meta approves — categories, formats, variables, media, buttons, drafts, test sends and Meta's rules.
---

A **template** is a message Meta has approved in advance. You need one to start a conversation, to write after the 24-hour window has closed, and for every campaign. Templates are sent to Meta for review when you create them; approval usually takes minutes and can take up to 24 hours.

## Create a template

On **Templates**, creating a new template opens the builder in three steps: **Define → Content → Review**. The preview on the side shows the message as the customer will see it, with your workspace's name as the chat title.

1. **Define** — the name (lowercase English letters, digits and `_`), the language, the **category** and the **format**.
2. **Content** — header, body, footer, buttons, and a sample for each variable.
3. **Review** — the checklist, then **Send template**. Meta's reply appears right there if something is refused.

> [!TIP]
> Not ready yet? **Save as draft** keeps everything. Drafts show in the list with **Continue** and **Delete**, and are only sent to Meta when you press **Send template**.

## Categories and formats

| Category | Use it for | Formats |
| --- | --- | --- |
| **Marketing** | Offers, news, reminders that promote | Standard, Carousel, Limited-time offer |
| **Utility** | Order updates, bookings, account notices | Standard |
| **Authentication** | One-time passwords | Verification code |

- **Standard** — text with an optional header (text, image, video or document), footer and buttons.
- **Carousel** *(Marketing)* — a message followed by 2–10 swipeable cards. Every card has an image *or* every card has a video, a short text (up to 160 characters, no variables) and 1–2 buttons — the same buttons in the same order on every card.
- **Limited-time offer** *(Marketing)* — a short offer headline (up to 16 characters), an optional image or video, a body up to 600 characters, a **coupon-code button first** and one website button. No footer. You can show an expiry countdown.
- **Verification code** *(Authentication)* — Meta writes the message itself; you choose the security sentence, the expiry (1–90 minutes) and the copy button's label. No media, links or emoji.

> [!IMPORTANT]
> Meta checks the category. A promotional message sent as *Utility* is usually moved to *Marketing* or rejected.

## Variables

Write `{{1}}`, `{{2}}`… where a value changes per customer. What fills each variable is chosen **per campaign**, not in the template.

- The **body** numbers its own variables from `{{1}}` with no gaps.
- A **text header** can have one variable, and it's always `{{1}}` (it shows the same value as `{{1}}` in the body).
- A variable can't start or end the message, and two can't sit side by side — put words around them.
- The **footer** and **website links** can't contain variables. For a personal link per customer, turn on click tracking on the website button.
- Every variable needs a realistic **sample** (one line, no line breaks). Meta reviews the message with the samples.

## Media header

Upload a file or paste a public **https** link and press **Save**. The builder checks Meta's limits before upload:

| Type | Formats | Max size |
| --- | --- | --- |
| Image | JPG, PNG | 5 MB |
| Video | MP4, 3GP | 16 MB |
| Document | PDF | 100 MB |

A template with a **coupon-code button** takes a text header or none — no image, video or document.

## Buttons

| Button | Limit | Notes |
| --- | --- | --- |
| Quick reply | up to 10 | Up to 25 characters each |
| Website | 2 | A full link, up to 2000 characters. Click tracking makes it a personal link per customer |
| Call | 1 | Number up to 20 characters, in international format |
| Coupon code (copy) | 1 | Marketing only. Meta sets the label; you give a sample code (up to 15 characters) |
| Stop promotions / Accept promotions | 1 each | Marketing only. A tap opts the customer out (or back in) |

- At most 10 buttons in total, each with its own label.
- Quick replies and the other buttons are kept in separate groups (Meta's rule). The builder orders them for you: coupon first, then website and call, then quick replies, and *Stop promotions* last.

> [!TIP]
> Marketing templates should let people opt out. Add **Stop promotions**, or say in the footer how to stop.

## Statuses

| Status | Meaning |
| --- | --- |
| Draft | Saved in ChatGate only |
| Pending | Sent to Meta, under review |
| Approved | Ready for campaigns and chats |
| Rejected | Meta refused it — the reason is shown under the name |

The list updates by itself. **Refresh from Meta** imports templates created elsewhere (for example in WhatsApp Manager).

## Send a test

From an approved template, **Send test** sends it to up to 5 numbers. Fill a value for each variable, a header file if the template has a media header, and the coupon code if it has one. Each number shows its own result; if Meta refuses, the reason and what to do appear under it.

> [!NOTE]
> A template's content can't be edited after it's sent to Meta. To change it, duplicate it, edit and send the copy.

## Common refusals

| Message | What to do |
| --- | --- |
| *COPY_CODE is required at index 0 when Limited Time Offer is present* | A limited-time offer needs the coupon button first — the builder now adds it for you |
| *Invalid parameter* + a reason | Read the reason under it; it names the part to fix |
| *Template name already exists* | Use another name, or press **Refresh from Meta** if it was created earlier |
| The provider didn't answer in time | The template may still be created — wait a minute and press **Refresh from Meta** before trying again |

More in [Troubleshooting](/en/troubleshooting/).
