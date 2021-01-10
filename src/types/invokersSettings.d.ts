export interface commandSettings {
  command: string;
}

export interface textSettings {
  text: string;
}

export type allInvokersSettingsType = commandSettings | textSettings;
