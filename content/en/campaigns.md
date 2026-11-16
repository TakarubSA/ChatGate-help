---
title: Campaigns
description: Send an approved template to many customers — audience, variables, coupon and offer end, scheduling, approval, test, results and retargeting.
---

A **campaign** (broadcast) sends one approved template to an audience. Each recipient gets their own copy, with the variables filled from their contact data or your sheet.

## Create a campaign

On **Campaigns**, a new campaign walks you through **Define → Configure → Review**.

### 1. Define

Give the campaign a name, choose what it does — **send a template**, or **trigger a bot flow** for the people who reply — and, optionally, its goal.

### 2. Configure

- **Template** — pick an approved template. The preview on the side updates as you go.
- **Variables** — choose where each `{{n}}` comes from: a contact attribute (name, city…), a fixed text, or a column of an uploaded sheet. Every variable needs a source before you can continue.
- **Header media** — for a template with an image, video or document header, upload the file to send (Meta's limits are checked). Leave it empty to send the template's sample.
- **Coupon code** — shown when the template has a *Copy code* button. It starts with the template's sample code; change it for this campaign (up to 15 characters, no spaces).
- **Offer ends** — shown for a limited-time offer with a countdown. Leave it empty to end the offer 7 days after sending.
- **Audience** — one of:

| Audience | What you give |
| --- | --- |
| Manual numbers | Numbers typed or pasted, one per line |
| Upload sheet | A CSV / XLSX file — first row is the column names, one row per recipient; any column can fill a variable |
| Contact list | A saved list |
| Segment | A segment, re-checked at send time so new matching customers are included |
| Contacts | All contacts, or the ones you pick |

Numbers that opted out of promotions or are blocked are skipped automatically.

- **Schedule** — send now, or pick a date, time and time zone. A scheduled campaign can repeat daily, weekly or monthly until an end date.
- **Delivery window** *(optional)* — only send between certain hours; recipients outside the window wait for it.
- **Automatic retry** *(optional)* — resend to recipients who failed, a set number of times, optionally only in business hours.

### 3. Review

Check the summary and the **cost estimate**: how many recipients, what the plan allowance and balance cover, and whether some numbers already got another campaign in the last 7 days.

> [!TIP]
> Use **Test broadcast** to send the message to one number first and see exactly how it looks on WhatsApp.

## Approval

Depending on your role, a campaign may need approval before it goes out. A **Campaign creator** prepares campaigns that always go through approval; a **Campaign manager** or **Owner** can send directly and approve others' campaigns. Campaigns waiting for you show with an approval badge.

## Follow the results

Open a campaign to see, per recipient and in total: sent, delivered, read, replied, clicked (for tracked website buttons) and failed, with the reasons for failures and a daily trend.

- **Pause**, **resume** or **cancel** a running campaign.
- **Retry** failed recipients.
- **Export** recipients to CSV, Excel (separate sheets for delivered, failed and retried) or a PDF report.
- **Retarget** — create a follow-up campaign for people who received the message but didn't engage. It goes through the same checks as any campaign.

## Costs and limits

Each message counts against your plan's monthly allowance first. When it's used up, your plan either stops sending, uses your message credits, or bills the extra — see [Billing](/en/billing/). Meta also limits how many new customers a number can message per day; that limit grows as you send good-quality messages.
