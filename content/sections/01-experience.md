---
nav: Experience
eyebrow: Experience
title: Where I work
experienceRole: Software Engineer, Full Stack · promoted from intern, Jul 2023
impactGroups:
  - tag: Performance
    title: Latency & throughput
    items:
      - name: Meeting Service
        detail: Moved Chime SDK recording upload off the request path using @Async / CompletableFuture processing.
        metric:
          note: 30–40s ↓ response time
      - name: Bulk Email
        detail: Rebuilt processing with a bounded ThreadPoolTaskExecutor (10/30) and CallerRunsPolicy backpressure.
        metric:
          before: 8 min
          after: 30 sec
  - tag: Event-driven systems
    title: Reliable messaging
    items:
      - name: Campaign Dispatch
        detail: Kafka with idempotent consumers, transactional outbox and dead-letter reliability patterns to make at-least-once delivery safe.
        metric:
          note: Idempotent · Exactly-once effect
  - tag: Production reliability
    title: Systems under failure
    items:
      - name: Duplicate Send Bug
        detail: Diagnosed duplicate sends from scheduler/lock interaction after a GC pause; introduced fencing tokens, idempotency guards and outbox monitoring.
      - name: Realtime Resilience
        detail: Graceful WebSocket shutdown/reconnect and bounded tenant-aware fan-out for multi-tenant workloads.
  - tag: Performance & data
    title: Databases & caching
    items:
      - name: PostgreSQL
        detail: Query-plan analysis, composite indexes and reporting datasource isolation.
        metric:
          note: 40% faster analytics
      - name: Redis
        detail: Tenant-keyed caching with write invalidation.
        metric:
          note: 70% ↓ DB load
  - tag: Concurrency
    title: Parallel execution
    items:
      - name: AI Inference
        detail: Parallelized 3 AI calls using CompletableFuture.allOf().
        metric:
          before: 6 sec
          after: 2 sec
---

One role, worked on in depth. Rather than a list of resume bullets, here is the work grouped by the problem it solved.
