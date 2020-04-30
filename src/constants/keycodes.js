import { pureNotesId } from './notes'

/* eslint-disable */
export const keyCodesFor1Octave = [49/*1*/, 50/*2*/, 51/*3*/, 52/*4*/, 53/*5*/, 54/*6*/, 55/*7*/]
export const keyCodesFor2Octave = [56/*8*/, 57/*9*/, 48/*0*/, 81/*q*/, 87/*w*/, 69/*e*/, 82/*r*/]
export const keyCodesFor3Octave = [84/*t*/, 89/*y*/, 85/*u*/, 73/*i*/, 79/*o*/, 80/*p*/, 65/*a*/]
export const keyCodesFor4Octave = [83/*s*/, 68/*d*/, 70/*f*/, 71/*g*/, 72/*h*/, 74/*j*/, 75/*k*/]
export const keyCodesFor5Octave = [76/*l*/, 90/*z*/, 88/*x*/, 67/*c*/, 86/*v*/, 66/*b*/, 78/*n*/]
export const keyCodesFor6Octave = [77/*m*/]
/* eslint-enable */

export const keyCodesAllOctaves = [
  keyCodesFor1Octave,
  keyCodesFor2Octave,
  keyCodesFor3Octave,
  keyCodesFor4Octave,
  keyCodesFor5Octave,
  keyCodesFor6Octave
]

export const mapKeyCodeToNoteIdOctaveId = keyCodesAllOctavesToMap(keyCodesAllOctaves)

// helpers

function keyCodesAllOctavesToMap (arrayOfArraysKeyCodes) {
  return arrayOfArraysKeyCodes.reduce(
    (map, arrayKeyCodes, i) => ({
      ...map,
      ...keyCodesForOneOctaveToMap(arrayKeyCodes, i + 1)
    }),
    {}
  )
}

function keyCodesForOneOctaveToMap (keyCodes, octaveId) {
  return keyCodes.reduce(
    (map, keyCode, i) => ({
      ...map,
      [keyCode]: {
        noteId: pureNotesId[i],
        octaveId
      }
    }),
    {}
  )
}
