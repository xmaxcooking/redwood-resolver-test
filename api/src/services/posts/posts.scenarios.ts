import type { Prisma, Post } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { data: { body: 'String', createdBy: 6556851 } },
    two: { data: { body: 'String', createdBy: 5019188 } },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
