export const QUERY_KEYS = {
   THREADS: {
      all: ["threads"] as const,
      list: (projectId: string) =>
         [...QUERY_KEYS.THREADS.all, "list", projectId] as const,
      detail: (threadId: string) =>
         [...QUERY_KEYS.THREADS.all, "detail", threadId] as const,
   },

   PROJECTS: {
      all: ["projects"] as const,
      list: () => [...QUERY_KEYS.PROJECTS.all, "list"] as const,
      detail: (projectId: string) =>
         [...QUERY_KEYS.PROJECTS.all, "detail", projectId] as const,
   },

   USERS: {
      all: ["users"] as const,
      current: () => [...QUERY_KEYS.USERS.all, "current"] as const,
      verify: (userId?: string, sessionId?: string) =>
         [...QUERY_KEYS.USERS.all, "verify", userId, sessionId] as const,
   },

   CONVERSATIONS: {
      all: ["conversations"] as const,
      detail: (conversationId: string) =>
         [...QUERY_KEYS.CONVERSATIONS.all, "detail", conversationId] as const,
   },

   DOCS: {
      all: ["docs"] as const,
      list: (projectId: string) =>
         [...QUERY_KEYS.DOCS.all, "list", projectId] as const,
      detail: (fileId: string) =>
         [...QUERY_KEYS.DOCS.all, "detail", fileId] as const,
      relevant: (fileId: string) =>
         [...QUERY_KEYS.DOCS.all, "relevant", fileId] as const,
      relevantWithTags: (tags: string[]) =>
         [...QUERY_KEYS.DOCS.all, "relevant", ...tags] as const,
   },

   FILES: {
      all: ["files"] as const,
      list: (projectId: string) =>
         [...QUERY_KEYS.FILES.all, "list", projectId] as const,
   },
} as const;
