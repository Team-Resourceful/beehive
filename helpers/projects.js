import dayjs from 'dayjs'

/*
  Only use on the complete list of versions for a project, partial lists will generate
  the wrong version slugs
*/
export const computeVersions = (versions) => {
  const visitedVersions = []
  const returnVersions = []

  for (const version of versions.sort(
    (a, b) => dayjs(a.date_published) - dayjs(b.date_published)
  )) {
    if (visitedVersions.includes(version.version_number)) {
      visitedVersions.push(version.version_number)
      version.displayUrlEnding = version.id
    } else {
      visitedVersions.push(version.version_number)
      version.displayUrlEnding = version.version_number
    }
    version.primaryFile = version.files.find((file) => file.primary) ?? version.files[0]

    if (!version.primaryFile) {
      version.primaryFile = {
        hashes: {
          sha1: '',
          sha512: '',
        },
        url: '#',
        filename: 'unknown',
        primary: false,
        size: 0,
        file_type: null,
      }
    }

    returnVersions.push(version)
  }

  return returnVersions
    .reverse()
    .map((version, index) => {
      const nextVersion = returnVersions[index + 1]
      if (nextVersion && version.changelog && nextVersion.changelog === version.changelog) {
        return { duplicate: true, ...version }
      } else {
        return { duplicate: false, ...version }
      }
    })
    .sort((a, b) => dayjs(b.date_published) - dayjs(a.date_published))
}
