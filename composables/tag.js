import tags from '~/generated/state.json'

export const useTags = () =>
  useState('tags', () => ({
    gameVersions: tags.gameVersions,
  }))
