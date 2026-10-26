---
nav: Architecture
eyebrow: Architecture
title: The system I work in
architecture:
  - nodes:
      - title: Angular Client
        sub: TypeScript · RxJS
        icon: globe
  - connector: HTTPS · WebSocket
    nodes:
      - title: Spring Cloud Gateway
        sub: Routing · JWT auth
        icon: server
  - connector: REST · JWT
    group: Spring Boot services
    nodes:
      - title: Campaign
      - title: Meeting
      - title: Notification
      - title: AI
  - connector: Events · Cache · Persistence
    nodes:
      - title: Kafka
        sub: Events
        icon: layers
      - title: Redis
        sub: Cache
        icon: zap
      - title: PostgreSQL
        sub: Persistence
        icon: database
  - nodes:
      - title: AWS
        sub: S3 · EC2 · EKS · Chime SDK
        icon: cloud
---

A simplified view of the multi-tenant, event-driven platform — from the Angular client down to storage and AWS.
