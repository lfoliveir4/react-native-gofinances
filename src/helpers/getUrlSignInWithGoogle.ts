export function getUrlSignInWithGoogle(
  clientId: string,
  redirectUri: string,
  responseType: string,
  scope: string
): string {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`
}