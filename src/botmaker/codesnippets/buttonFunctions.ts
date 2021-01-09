import { ButtonType, websiteSettings } from "../../types";

export type allButtonFunctionsType = generatePageButtonType | generateWebsiteButtonType;

export type generatePageButtonType = ({
  button,
  nameOfFunction,
}: {
  button: ButtonType;
  nameOfFunction: string;
}) => string;
export type generateWebsiteButtonType = ({
  button,
  nameOfFunction,
}: {
  button: ButtonType;
  nameOfFunction: string;
}) => string;

export const generatePageButton: generatePageButtonType = ({ button, nameOfFunction }) => {
  const output = `
{ text: \`${button.displayName}\`, callback_data: \`${nameOfFunction}\` }
`;
  return output;
};

export const generateWebsiteButton: generateWebsiteButtonType = ({ button, nameOfFunction }) => {
  const { url } = button.settings as websiteSettings;
  const output = `
{ text: \`${button.displayName}\`, url: \`${url}\` }
`;
  return output;
};
