export function getTrackedUrl(
  baseUrl: string,
  medium: string,
  campaign: string = 'artist_site'
): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}utm_source=website&utm_medium=${medium}&utm_campaign=${campaign}`;
}

export function getWhatsAppUrl(locale: string): string {
  if (locale === 'ru') {
    return 'https://wa.me/79383163034?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%B1%D1%83%D0%BA%D0%B8%D0%BD%D0%B3%D0%B5%20%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D1%81%D0%B0%20%D0%A6%D0%BE%D0%BF%D0%BE%D0%B7%D0%B8%D0%B4%D0%B8%D1%81%D0%B0%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5.';
  }
  return 'https://wa.me/79383163034?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20booking%20Alexandros%20Tsopozidis%20for%20an%20event.';
}
