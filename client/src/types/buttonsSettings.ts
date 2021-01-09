export interface websiteSettings {
  url: string;
}

export interface pageSettings {
  pageId: string;
}

export type allButtonsSettingsType = websiteSettings | pageSettings;
