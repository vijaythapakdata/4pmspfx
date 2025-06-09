import * as React from 'react';
// import styles from './SharePointForm.module.scss';
import type { ISharePointFormProps } from './ISharePointFormProps';
import { ISharePointFormState } from './ISharePointFormState';
import { spfi,SPFx } from '@pnp/sp/presets/all';
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { Dialog } from '@microsoft/sp-dialog';
import { DefaultButton, PrimaryButton, Slider, TextField } from '@fluentui/react';

export default class SharePointForm extends React.Component<ISharePointFormProps,ISharePointFormState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      Age:"",
      EmailAddress:"",
      Score:"",
      Salary:"",
      Address:""
    }
  }
  //create item
  private async createItem(){
    try{
const sp=spfi(this.props.siteurl).using(SPFx(this.props.context));
const list=sp.web.lists.getByTitle(this.props.ListName);
const item=await list.items.add({
  Title:this.state.Name,
  EmailAddress:this.state.EmailAddress,
  Age:parseInt(this.state.Age),
  Salary:parseFloat(this.state.Salary),
  Score:this.state.Score,
  Address:this.state.Address
})
Dialog.alert("Item created successfully");
console.log(item);
// this.setState({
//    Name:"",
//       Age:"",
//       EmailAddress:"",
//       Score:"",
//       Salary:"",
//       Address:""
// });
this.resetForm();
 
    }
    catch(err){
console.log(err);
Dialog.alert("Item failed successfully");
    }
  }
  //reset form
  private resetForm(){
    this.setState({
   Name:"",
      Age:"",
      EmailAddress:"",
      Score:"",
      Salary:"",
      Address:""
});
  }
  ///form event
  private handleChange=(field:keyof ISharePointFormState,value:string|boolean|number):void=>{
    this.setState({[field]:value}as unknown as Pick<ISharePointFormState,keyof ISharePointFormState>);
  }
  public render(): React.ReactElement<ISharePointFormProps> {
    

    return (
 <>
 <TextField
 value={this.state.Name}
 label='Name' iconProps={{iconName:'user'}}
 onChange={(_,event)=>this.handleChange("Name",event||'')}
 />
  <TextField
 value={this.state.EmailAddress}
 label='Email Addrees' iconProps={{iconName:'mail'}}
 onChange={(_,event)=>this.handleChange("EmailAddress",event||'')}
 />
  <TextField
 value={this.state.Age}
 label='Age' 
//  iconProps={{iconName:'mail'}}
 onChange={(_,event)=>this.handleChange("Age",event||'')}
 />
  <TextField
 value={this.state.Salary}
 label='Salary' 
//  iconProps={{iconName:'mail'}}
 onChange={(_,event)=>this.handleChange("Salary",event||'')}
 prefix='$' suffix='USD'
 />
  <TextField
 value={this.state.Address}
 label='Full Addrees' iconProps={{iconName:'home'}}
 onChange={(_,event)=>this.handleChange("Address",event||'')}
 multiline
 rows={5}
 />
 <Slider min={1}max={100} step={1} value={this.state.Score}
 label='Score'
  onChange={(event)=>this.handleChange("Score",event||'')}
 />
 <br/>
 <PrimaryButton text='Save' onClick={()=>this.createItem()} iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;
  <DefaultButton text='Reset' onClick={()=>this.resetForm()} iconProps={{iconName:'reset'}}/>
 </>
    );
  }
}
