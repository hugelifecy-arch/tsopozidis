export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  followers?: string;
}

export const socialLinks: SocialLink[] = [
  { platform: "tiktok", url: "https://www.tiktok.com/@tsopozidis", label: "TikTok" },
  { platform: "youtube", url: "https://www.youtube.com/channel/UC_25lDUqfZLnjvWxzPHGNmg", label: "YouTube" },
  { platform: "instagram", url: "https://instagram.com/alexandros_official", label: "Instagram", followers: "310K" },
  { platform: "facebook", url: "https://facebook.com/alexandros.tsopozidis", label: "Facebook", followers: "10.5K" },
  { platform: "vk", url: "https://vk.com/alexandros_tsopozidis", label: "VKontakte" },
  { platform: "ok", url: "https://ok.ru/alexandros.tsopozidis", label: "Odnoklassniki" },
  { platform: "telegram", url: "https://t.me/tsopozidis", label: "Telegram" },
  { platform: "spotify", url: "https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge", label: "Spotify", followers: "10.4K monthly" },
  { platform: "apple-music", url: "https://music.apple.com/artist/alexandros-tsopozidis/839072119", label: "Apple Music" },
  { platform: "yandex-music", url: "https://music.yandex.ru/artist/3050547", label: "Yandex Music" },
  { platform: "zvuk", url: "https://zvuk.com/artist/196201870", label: "Zvuk" },
  { platform: "deezer", url: "https://deezer.com/en/artist/7144045", label: "Deezer" },
  { platform: "soundcloud", url: "https://soundcloud.com/alexandros-tsopozidis-853060317", label: "SoundCloud" },
  { platform: "amazon-music", url: "https://music.amazon.com/artists/B0749H7D6R/alexandros-tsopozidis", label: "Amazon Music" },
];
