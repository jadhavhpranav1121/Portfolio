export const siteUrl = 'https://pranavj.web.app'

export const profile = {
  name: 'Pranav Jadhav',
  initials: 'PJ',
  role: 'Software Engineer',
  company: 'Emerson Export Engineering Center',
  location: 'Pune, India',
  tenure: 'Feb 2023 – Present',
  email: 'pranavhj23@gmail.com',
  github: 'https://github.com/jadhavhpranav1121',
  linkedin: 'https://www.linkedin.com/in/pranavharijadhav/',
  // Carried over from the previous portfolio; swap for a newer link or a local
  // PDF in public/ when the resume is updated.
  resume: 'https://drive.google.com/file/d/1kvAZBWRLi407vCeMW20D7dGJfGwRKLk0/view',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const heroTech = [
  'Java 17',
  'Spring Boot',
  'Kafka',
  'PostgreSQL',
  'Redis',
  'Angular',
  'AWS',
]

export const stats = [
  { value: '3+', unit: 'yrs', label: 'Software Engineering', tag: 'EXPERIENCE' },
  { value: '1st', unit: 'place', label: 'Emerson Global CTF', tag: 'CYBERSECURITY' },
  { value: '478', unit: 'AIR', label: 'TCS CodeVita 2022', tag: 'COMPETITIVE' },
  { value: '1639', unit: 'peak', label: 'LeetCode Rating', tag: 'PROBLEM SOLVING' },
]

export type ImpactGroup = {
  tag: string
  title: string
  items: {
    name: string
    detail: string
    metric?: { before?: string; after?: string; note?: string }
  }[]
}

export const impactGroups: ImpactGroup[] = [
  {
    tag: 'PERFORMANCE',
    title: 'Latency & throughput',
    items: [
      {
        name: 'Meeting Service',
        detail:
          'Moved Chime SDK recording upload off the request path using @Async / CompletableFuture processing.',
        metric: { note: '30–40s ↓ response time' },
      },
      {
        name: 'Bulk Email',
        detail:
          'Rebuilt processing with a bounded ThreadPoolTaskExecutor (10/30) and CallerRunsPolicy backpressure.',
        metric: { before: '8 min', after: '30 sec' },
      },
    ],
  },
  {
    tag: 'EVENT-DRIVEN SYSTEMS',
    title: 'Reliable messaging',
    items: [
      {
        name: 'Campaign Dispatch',
        detail:
          'Kafka with idempotent consumers, transactional outbox and dead-letter reliability patterns to make at-least-once delivery safe.',
        metric: { note: 'Idempotent · Exactly-once effect' },
      },
    ],
  },
  {
    tag: 'PRODUCTION RELIABILITY',
    title: 'Systems under failure',
    items: [
      {
        name: 'Duplicate Send Bug',
        detail:
          'Diagnosed duplicate sends from scheduler/lock interaction after a GC pause; introduced fencing tokens, idempotency guards and outbox monitoring.',
      },
      {
        name: 'Realtime Resilience',
        detail:
          'Graceful WebSocket shutdown/reconnect and bounded tenant-aware fan-out for multi-tenant workloads.',
      },
    ],
  },
  {
    tag: 'PERFORMANCE & DATA',
    title: 'Databases & caching',
    items: [
      {
        name: 'PostgreSQL',
        detail:
          'Query-plan analysis, composite indexes and reporting datasource isolation.',
        metric: { note: '40% faster analytics' },
      },
      {
        name: 'Redis',
        detail: 'Tenant-keyed caching with write invalidation.',
        metric: { note: '70% ↓ DB load' },
      },
    ],
  },
  {
    tag: 'CONCURRENCY',
    title: 'Parallel execution',
    items: [
      {
        name: 'AI Inference',
        detail: 'Parallelized 3 AI calls using CompletableFuture.allOf().',
        metric: { before: '6 sec', after: '2 sec' },
      },
    ],
  },
]

export type CaseStudy = {
  id: string
  title: string
  problem: string
  approach: string
  result?: { before?: string; after?: string; note?: string }
  tech: string[]
  steps?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: '01',
    title: 'Scaling Bulk Email',
    problem: 'A 1,000-email batch required roughly 8 minutes, blocking downstream campaign work.',
    approach:
      'Introduced bounded ThreadPoolTaskExecutor execution with controlled concurrency and CallerRunsPolicy backpressure.',
    result: { before: '8 min', after: '30 sec' },
    tech: ['Java', 'Spring Boot', 'Concurrency'],
  },
  {
    id: '02',
    title: 'Reliable Kafka Delivery',
    problem: 'At-least-once event delivery could produce duplicate customer emails.',
    approach:
      'Made Kafka consumers idempotent using uniquely constrained processed-event records and transactional patterns.',
    result: { note: 'Zero duplicate sends' },
    tech: ['Kafka', 'Spring Boot', 'PostgreSQL', 'Idempotency'],
  },
  {
    id: '03',
    title: 'Transactional Outbox',
    problem: 'Publishing events after a DB commit risked lost messages or dual-write inconsistency.',
    approach:
      'Persisted events to an outbox inside the DB transaction; lease-based publishers drain it to Kafka with oldest-unpublished-age monitoring.',
    steps: ['DB Transaction', 'Outbox', 'Publisher', 'Kafka'],
    tech: ['Spring Boot', 'PostgreSQL', 'Kafka'],
  },
  {
    id: '04',
    title: 'Production Concurrency Bug',
    problem: 'A GC pause let a lock lease expire, so a second scheduler acquired the lock — the original resumed and dispatched twice.',
    approach:
      'Reproduced the race, then added fencing tokens, an idempotency guard and monitoring to make dispatch safe under pauses.',
    steps: [
      'GC Pause',
      'Lock Lease Expires',
      'Another Scheduler Acquires Lock',
      'Original Scheduler Resumes',
      'Duplicate Dispatch',
    ],
    tech: ['Distributed Locking', 'Fencing Token', 'JVM / GC'],
  },
  {
    id: '05',
    title: 'AI Request Parallelization',
    problem: 'Three sequential model calls added up to ~6 seconds of blocking latency per request.',
    approach:
      'Fanned the calls out concurrently and joined them with CompletableFuture.allOf().',
    result: { before: '6 sec', after: '2 sec' },
    tech: ['Java', 'CompletableFuture', 'Concurrency'],
  },
  {
    id: '06',
    title: 'Database Optimization',
    problem: 'Analytics endpoints were slow under reporting load and contended with transactional traffic.',
    approach:
      'Analyzed query plans, added composite indexes and isolated the reporting datasource.',
    result: { note: '40% faster' },
    tech: ['PostgreSQL', 'Indexing', 'Query Plans'],
  },
]

export type SkillGroup = { tag: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    tag: 'BACKEND',
    items: ['Java 17', 'Spring Boot 3', 'Spring Security', 'Spring Cloud Gateway', 'JPA / Hibernate'],
  },
  {
    tag: 'DISTRIBUTED SYSTEMS',
    items: ['Apache Kafka', 'Transactional Outbox', 'Idempotent Consumers', 'DLQ', 'Distributed Locking', 'WebSocket / STOMP'],
  },
  {
    tag: 'DATABASE & SEARCH',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch', 'Flyway'],
  },
  {
    tag: 'FRONTEND',
    items: ['Angular', 'TypeScript', 'RxJS'],
  },
  {
    tag: 'TESTING',
    items: ['JUnit 5', 'Mockito', 'Testcontainers', 'WireMock', 'Jasmine / Karma', 'Contract Testing'],
  },
  {
    tag: 'CLOUD & DEVOPS',
    items: ['AWS (S3 · EC2 · EKS · Chime)', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'],
  },
  {
    tag: 'ENGINEERING',
    items: ['Concurrency', 'JVM / GC Analysis', 'Distributed Tracing', 'Multi-Tenant Architecture', 'Performance Optimization'],
  },
]

export type Project = {
  name: string
  description: string
  focus: string
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    name: 'Pizza Hunter',
    description: 'A pizza discovery and ordering web app with a browsing and cart flow.',
    focus: 'Full-stack web application',
    tech: ['JavaScript', 'Web'],
    github: 'https://github.com/jadhavhpranav1121',
    featured: false,
  },
  {
    name: 'Multiplayer Tic Tac Toe',
    description: 'Real-time two-player Tic Tac Toe with live game state synchronization.',
    focus: 'Realtime / WebSockets',
    tech: ['WebSockets', 'JavaScript'],
    github: 'https://github.com/jadhavhpranav1121',
    featured: false,
  },
  {
    name: 'SocialTalk',
    description: 'A social messaging application exploring chat and user interaction patterns.',
    focus: 'Realtime messaging',
    tech: ['Web', 'Realtime'],
    github: 'https://github.com/jadhavhpranav1121',
    featured: false,
  },
]

export const achievements = [
  {
    value: '1st',
    title: 'Emerson Global CTF',
    subtitle: 'Winner',
    detail: 'Cybersecurity competition — Web Security, Reverse Engineering & Forensics.',
    tag: 'CTF.RANK',
  },
  {
    value: '478',
    title: 'TCS CodeVita 2022',
    subtitle: 'All India Rank',
    detail: 'Global competitive programming contest across two coding rounds.',
    tag: 'CODEVITA.AIR',
  },
  {
    value: '1639',
    title: 'LeetCode',
    subtitle: 'Peak Rating',
    detail: 'Sustained competitive problem solving across contests.',
    tag: 'LEETCODE.PEAK',
  },
]

export const timeline = [
  { year: '2019', title: 'Started BE Computer Science', detail: 'AISSMS Engineering College · CGPA 9.16' },
  { year: '2022', title: 'TCS CodeVita — AIR 478', detail: 'Global competitive programming rank' },
  { year: '2023', title: 'Joined Emerson as Intern', detail: 'Emerson Export Engineering Center, Pune' },
  { year: 'Jul 2023', title: 'Promoted to Software Engineer', detail: 'Full-stack — Java, Spring Boot, Angular' },
  { year: '2025', title: '1st Place — Emerson Global CTF', detail: 'Web security, reversing & forensics' },
  { year: '2026', title: 'Deepening distributed systems', detail: 'Backend reliability & scalability focus' },
]

export const terminalLines = [
  { cmd: 'whoami', out: 'Pranav Jadhav' },
  { cmd: 'role', out: 'Software Engineer' },
  { cmd: 'stack', out: 'Java · Spring Boot · Kafka · PostgreSQL · Angular' },
  { cmd: 'focus', out: 'Distributed Systems' },
]
