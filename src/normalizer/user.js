export function firebase (user) {
  if (!user) return user

  const { uid, email, emailVerified, photoURL, isAnonymous } = user

  return { uid, email, emailVerified, photoURL, isAnonymous }
}
