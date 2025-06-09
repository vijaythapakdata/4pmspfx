import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISharePointFormProps {
 ListName:string; //List Name dynamically
 context:WebPartContext;
 siteurl:string;
}
