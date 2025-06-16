import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFunctionalFormProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  ListName:string;
  siteurl:string;
  context:WebPartContext;
}
