export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  titleRu?: string;
  year: number;
  featuring?: string;
  views?: string;
}

export const videos: Video[] = [
  // TODO: Replace placeholder YouTube IDs with actual video IDs
  { id: "brodyaga", youtubeId: "TODO_brodyaga_id", title: "Бродяга", titleRu: "Бродяга", year: 2017, featuring: "Elbrus Dzhanmirzoev", views: "22M+" },
  { id: "male-male", youtubeId: "TODO_male_male_id", title: "Male Male", year: 2016, views: "11M+" },
  { id: "kavkaz", youtubeId: "TODO_kavkaz_id", title: "Kavkaz", titleRu: "Кавказ", year: 2023, featuring: "Vasiliadis" },
  { id: "kaciyorum", youtubeId: "TODO_kaciyorum_id", title: "Kaciyorum", year: 2019 },
  { id: "dai-mne-nomer", youtubeId: "TODO_dai_mne_id", title: "Дай мне номер телефона", titleRu: "Дай мне номер телефона", year: 2018 },
  { id: "mozhet-ty", youtubeId: "TODO_mozhet_ty_id", title: "Может ты вернёшься", titleRu: "Может ты вернёшься", year: 2015, featuring: "Eldar Dalgatov" },
  { id: "mia-kardia", youtubeId: "TODO_mia_kardia_id", title: "Mia Kardia", year: 2025 },
  { id: "ya-grek", youtubeId: "TODO_ya_grek_id", title: "Я грек", titleRu: "Я грек", year: 2022 },
  { id: "kapkan", youtubeId: "TODO_kapkan_id", title: "Капкан", titleRu: "Капкан", year: 2021 },
  { id: "rasskazhi", youtubeId: "TODO_rasskazhi_id", title: "Расскажи", titleRu: "Расскажи", year: 2020 },
];
