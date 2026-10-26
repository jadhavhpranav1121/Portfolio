---
nav: Engineering
eyebrow: Case studies
title: Problems I've solved
caseStudies:
  - id: "01"
    title: Scaling Bulk Email
    problem: A 1,000-email batch required roughly 8 minutes, blocking downstream campaign work.
    approach: Introduced bounded ThreadPoolTaskExecutor execution with controlled concurrency and CallerRunsPolicy backpressure.
    result:
      before: 8 min
      after: 30 sec
    tech:
      - Java
      - Spring Boot
      - Concurrency
  - id: "02"
    title: Reliable Kafka Delivery
    problem: At-least-once event delivery could produce duplicate customer emails.
    approach: Made Kafka consumers idempotent using uniquely constrained processed-event records and transactional patterns.
    result:
      note: Zero duplicate sends
    tech:
      - Kafka
      - Spring Boot
      - PostgreSQL
      - Idempotency
  - id: "03"
    title: Transactional Outbox
    problem: Publishing events after a DB commit risked lost messages or dual-write inconsistency.
    approach: Persisted events to an outbox inside the DB transaction; lease-based publishers drain it to Kafka with oldest-unpublished-age monitoring.
    steps:
      - DB Transaction
      - Outbox
      - Publisher
      - Kafka
    tech:
      - Spring Boot
      - PostgreSQL
      - Kafka
  - id: "04"
    title: Production Concurrency Bug
    problem: A GC pause let a lock lease expire, so a second scheduler acquired the lock — the original resumed and dispatched twice.
    approach: Reproduced the race, then added fencing tokens, an idempotency guard and monitoring to make dispatch safe under pauses.
    steps:
      - GC Pause
      - Lock Lease Expires
      - Another Scheduler Acquires Lock
      - Original Scheduler Resumes
      - Duplicate Dispatch
    tech:
      - Distributed Locking
      - Fencing Token
      - JVM / GC
  - id: "05"
    title: AI Request Parallelization
    problem: Three sequential model calls added up to ~6 seconds of blocking latency per request.
    approach: Fanned the calls out concurrently and joined them with CompletableFuture.allOf().
    result:
      before: 6 sec
      after: 2 sec
    tech:
      - Java
      - CompletableFuture
      - Concurrency
  - id: "06"
    title: Database Optimization
    problem: Analytics endpoints were slow under reporting load and contended with transactional traffic.
    approach: Analyzed query plans, added composite indexes and isolated the reporting datasource.
    result:
      note: 40% faster
    tech:
      - PostgreSQL
      - Indexing
      - Query Plans
---

Production issues written up as problem, approach and result.
