export interface sendMessageSettings {
  text: string;
}

export interface sendPhotoSettings {
  url: string;
  caption: string;
}

export type allContentSettingsType = sendMessageSettings | sendPhotoSettings;
