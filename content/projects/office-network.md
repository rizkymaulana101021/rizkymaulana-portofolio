---
title: 'Office network rebuild, zero downtime'
description: 'Ripped out a decade of daisy-chained consumer switches and rebuilt a 3-floor office network over two weekends — Monday morning, nobody noticed.'
kind: infra
year: '2024'
role: 'Planning, cabling & config'
metric: '0 min'
metricLabel: 'business-hours downtime'
order: 2
tags: ['VLANs', 'UniFi', 'pfSense', 'Structured cabling']
image: '/img/proj-network.png'
imageAlt: 'Wall-mounted network cabinet with a new switch and firewall and neatly dressed cables'
---

- Audited every port, labelled every cable, documented it in a diagram the next person can read.
- Split guests, staff, printers and cameras into their own VLANs.
- Swapped the ISP router for a proper firewall with failover to a 4G backup line.

Good infrastructure is invisible. The best feedback I got was silence.
