import tags from '~/generated/state.json'

export const useTags = () =>
  useState('tags', () => ({
    categories: tags.categories,
    loaders: tags.loaders,
    gameVersions: tags.gameVersions,
  }))
