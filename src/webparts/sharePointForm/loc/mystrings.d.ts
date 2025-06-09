declare interface ISharePointFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel:string;
}

declare module 'SharePointFormWebPartStrings' {
  const strings: ISharePointFormWebPartStrings;
  export = strings;
}
