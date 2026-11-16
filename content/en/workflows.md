---
title: Workflow Space
description: Automations triggered from outside — your website, store or system — that send WhatsApp templates and call other services.
---

A **workflow** is an automation that starts from **outside** a WhatsApp conversation: an order placed in your store, a form on your website, a status change in your system. It can send WhatsApp templates, call APIs, look things up and branch on the data it receives.

Where bots react to what a customer writes, workflows react to what happens in your business.

## Build a workflow

1. **Workflow Space → New workflow.** Give it a name and a category (marketing, sales, support, ERP or custom).
2. Add nodes on the canvas: conditions, HTTP requests, data mapping, WhatsApp templates and more.
3. **Test run** the draft with sample data. A test run has no real external effect, so nothing is sent to customers.
4. **Publish.** Publishing turns on the workflow's **webhook link**. Your website, store or system calls that link with the data to start a run.

> [!IMPORTANT]
> Keep the webhook link private — anyone who has it can start the workflow.

## Follow the runs

Every run is logged with the trace of each node: what came in, what each step did and what it sent. Open a run to see exactly where something stopped.

## Import and export

Export one or more workflows to a ChatGate workflow file, and import them into another workspace, the same way as bots.
