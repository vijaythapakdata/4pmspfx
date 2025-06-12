import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'SharePointFormWebPartStrings';
import SharePointForm from './components/SharePointForm';
import { ISharePointFormProps } from './components/ISharePointFormProps';

export interface ISharePointFormWebPartProps {
 ListName: string;
 cityOptions:string
}

export default class SharePointFormWebPart extends BaseClientSideWebPart<ISharePointFormWebPartProps> {



  public async render(): Promise<void> {
    const cityOpt=await this._getLookupValues();
    const element: React.ReactElement<ISharePointFormProps> = React.createElement(
      SharePointForm,
      {
        ListName:this.properties.ListName,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl,
        genderOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,'Gender',this.properties.ListName),
        departmentOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,'Department',this.properties.ListName),
        skillsOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,'Skills',this.properties.ListName),
        cityOptions:cityOpt
       
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  //Get Choice
  private async _getChoiceValues(siteurl:string,fieldValue:string,ListName:string):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName}')/fields?$filter=EntityPropertyName eq '${fieldValue}'`,{
  method:'GET',
  headers:{
    'Accept':'application/json;odata=nometadata'
  }
});
if (!response.ok) {
  throw new Error(`Error fetching choice values: ${response.status}`);
}
const data=await response.json();
const choices=data.value[0].Choices;
return choices.map((choice:any)=>({
  key:choice,
  text:choice
}));
    }
    catch(err){
console.error(err)
return[];
    }
  }
  //Lookup\
  private async _getLookupValues():Promise<any[]>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,{
  method:'GET',
  headers:{
    'Accept':'application/json;odata=nometadata'
  }
});
if (!response.ok) {
  throw new Error(`Error fetching choice values: ${response.status}`);
}
const data=await response.json();
return data.value.map((city:{ID:string,Title:string})=>({
  key:city.ID,
  text:city.Title
}));
    }
    catch(err){
console.error(err);
return[];
    }
  }
}
