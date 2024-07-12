import type {
  QueryResolvers,
  MutationResolvers,
  PostRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: {
      ...input,
      createdBy: 1, // context.currentUser.id
    },
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: {
      ...input,
      updatedBy: 2, // context.currentUser.id
    },
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post: PostRelationResolvers = {
  title: () => {
    return 'My Custom Title'
  },
  Creator: (obj, { root }) => {
    return { id: root.createdBy, name: 'User One' }
  },
  Updater: (obj, { root }) => {
    if (!root.updatedBy) return null
    else return { id: root.updatedBy, name: 'User Two' }
  },
}
