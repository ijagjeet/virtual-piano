import { get } from 'axios'
import { MUSICAL_TEXTS } from 'constants/paths'

export function loadText (fileName) {
  return get(`${MUSICAL_TEXTS}/${fileName}.txt`)
    .then(response => response.data)
}
