// white
// до
export const C_ID = 1
export const C_NAME = 'C'
// ре
export const D_ID = 2
export const D_NAME = 'D'
// ми
export const E_ID = 3
export const E_NAME = 'E'
// фа
export const F_ID = 4
export const F_NAME = 'F'
// соль
export const G_ID = 5
export const G_NAME = 'G'
// ля
export const A_ID = 6
export const A_NAME = 'A'
// си
export const B_ID = 7
export const B_NAME = 'B'

export const pureNotesId = [C_ID, D_ID, E_ID, F_ID, G_ID, A_ID, B_ID]

// Diese
export const DIESE_SHIFT_ID = 0.5
export const DIESE_PREFIX_NAME = '#'

// black
export const C_D_ID = C_ID + DIESE_SHIFT_ID
export const C_D_NAME = DIESE_PREFIX_NAME + C_NAME
export const D_D_ID = D_ID + DIESE_SHIFT_ID
export const D_D_NAME = DIESE_PREFIX_NAME + D_NAME
export const F_D_ID = F_ID + DIESE_SHIFT_ID
export const F_D_NAME = DIESE_PREFIX_NAME + F_NAME
export const G_D_ID = G_ID + DIESE_SHIFT_ID
export const G_D_NAME = DIESE_PREFIX_NAME + G_NAME
export const A_D_ID = A_ID + DIESE_SHIFT_ID
export const A_D_NAME = DIESE_PREFIX_NAME + A_NAME
// export const E_D_ID = E_ID + DIESE_SHIFT_ID
// export const E_D_NAME = DIESE_PREFIX_NAME + _NAME
// export const B_D_ID = B_ID + DIESE_SHIFT_ID
// export const B_D_NAME = DIESE_PREFIX_NAME + B_NAME

export const dieseNotesId = [C_D_ID, D_D_ID, F_D_ID, G_D_ID, A_D_ID]

export const notesId = [...pureNotesId, ...dieseNotesId]

export const map = {
  [C_ID]: C_NAME,
  [D_ID]: D_NAME,
  [E_ID]: E_NAME,
  [F_ID]: F_NAME,
  [G_ID]: G_NAME,
  [A_ID]: A_NAME,
  [B_ID]: B_NAME,
  [C_D_ID]: C_D_NAME,
  [D_D_ID]: D_D_NAME,
  [F_D_ID]: F_D_NAME,
  [G_D_ID]: G_D_NAME,
  [A_D_ID]: A_D_NAME
}

export function getOctave () {
  return [
    { id: C_ID },
    { id: C_D_ID },
    { id: D_ID },
    { id: D_D_ID },
    { id: E_ID },
    { id: F_ID },
    { id: F_D_ID },
    { id: G_ID },
    { id: G_D_ID },
    { id: A_ID },
    { id: A_D_ID },
    { id: B_ID }
  ]
}

export const octave = getOctave()

export const OCTAVE_1_ID = 1
export const OCTAVE_1_NAME = 'one'
export const OCTAVE_2_ID = 2
export const OCTAVE_2_NAME = 'two'
export const OCTAVE_3_ID = 3
export const OCTAVE_3_NAME = 'three'
export const OCTAVE_4_ID = 4
export const OCTAVE_4_NAME = 'four'
export const OCTAVE_5_ID = 5
export const OCTAVE_5_NAME = 'five'

export const octavesId = [OCTAVE_1_ID, OCTAVE_2_ID, OCTAVE_3_ID, OCTAVE_4_ID, OCTAVE_5_ID]

export const octavesMap = {
  [OCTAVE_1_ID]: OCTAVE_1_NAME,
  [OCTAVE_2_ID]: OCTAVE_2_NAME,
  [OCTAVE_3_ID]: OCTAVE_3_NAME,
  [OCTAVE_4_ID]: OCTAVE_4_NAME,
  [OCTAVE_5_ID]: OCTAVE_5_NAME
}
