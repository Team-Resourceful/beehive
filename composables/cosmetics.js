export const useCosmetics = () =>
  useState('cosmetics', () => {
    const cosmetics = useCookie('cosmetics', {
      maxAge: 60 * 60 * 24 * 365 * 10,
      sameSite: 'lax',
      secure: true,
      httpOnly: false,
      path: '/',
    })

    if (!cosmetics.value) {
      cosmetics.value = {
        advancedRendering: true,
        externalLinksNewTab: true,
        developerMode: false,
        mavenInfo: false,
        preferredDarkTheme: 'dark',
        displayMode: 'list',
      }
    }

    return cosmetics.value
  })

export const saveCosmetics = () => {
  const cosmetics = useCosmetics()

  const cosmeticsCookie = useCookie('cosmetics', {
    maxAge: 60 * 60 * 24 * 365 * 10,
    sameSite: 'lax',
    secure: true,
    httpOnly: false,
    path: '/',
  })

  cosmeticsCookie.value = cosmetics.value
}

export const external = () => {
  const cosmeticsStore = useCosmetics().value

  return cosmeticsStore.externalLinksNewTab ? '_blank' : ''
}
