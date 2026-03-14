export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  titleRu?: string;
  year: number;
  featuring?: string;
  views?: string;
}

/** Generate YouTube thumbnail URL from video ID */
export function getYoutubeThumbnail(youtubeId: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault' = 'hqdefault'): string {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

export const videos: Video[] = [
  { id: "brodyaga", youtubeId: "z9ASjQE6Q2Y", title: "Бродяга", titleRu: "Бродяга", year: 2017, featuring: "Elbrus Dzhanmirzoev", views: "22M+" },
  { id: "male-male", youtubeId: "o20LEgccjxY", title: "Male Male", year: 2016, views: "11M+" },
  { id: "kaciyorum", youtubeId: "F9rQSin9PIY", title: "Kaciyorum", year: 2019, featuring: "Faxo" },
  { id: "dai-mne-nomer", youtubeId: "Rxp_-wMKU5k", title: "Дай мне номер телефона", titleRu: "Дай мне номер телефона", year: 2018 },
  { id: "rasskazhi", youtubeId: "Ne_uRfKUUlk", title: "Расскажи", titleRu: "Расскажи", year: 2020 },
];
