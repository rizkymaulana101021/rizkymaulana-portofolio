---
title: 'Kopi Senja — a storefront that loads on 3G'
description: 'An online shop for a small-batch coffee roaster. Under 100 KB of JavaScript, sub-second loads on a budget phone, and checkout in three taps.'
kind: web
year: '2024'
role: 'Front-end & performance'
metric: '0.8s'
metricLabel: 'largest contentful paint on mobile'
order: 3
tags: ['React', 'Stripe', 'Image CDN', 'Core Web Vitals']
image: '/img/proj-storefront.png'
imageAlt: 'Tablet on a cafe counter showing a coffee online store, with coffee beans beside it'
---

Most of their customers order from a phone on a patchy connection. So I treated **performance as the feature**: server-rendered pages, images served through a CDN at the exact size needed, and no carousel. Ever.
