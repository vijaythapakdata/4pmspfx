import * as React from 'react';
// import styles from './SharePointForm.module.scss';
import type { ISharePointFormProps } from './ISharePointFormProps';
import { ISharePointFormState } from './ISharePointFormState';
import { spfi,SPFx } from '@pnp/sp/presets/all';
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { Dialog } from '@microsoft/sp-dialog';
import { ChoiceGroup, DefaultButton, Dropdown, PrimaryButton, Slider, TextField } from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { __metadata } from 'tslib';

export default class SharePointForm extends React.Component<ISharePointFormProps,ISharePointFormState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      Age:"",
      EmailAddress:"",
      Score:"",
      Salary:"",
      Address:"",
      Manager:[],
      ManagerId:[],
      AdminId:0,
      Admin:"",
      Gender:"",
      Department:"",
      City:"",
      Skills:[]
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
  Address:this.state.Address,
  AdminId:this.state.AdminId,
  // ManagerId:{results:this.state.ManagerId},
  ManagerId:{
    __metadata:{
      type:"Collection(Edm.Int32)"
    },
    results:this.state.ManagerId
  },
  Gender:this.state.Gender,
  // Skills:{results:this.state.Skills},
  Department:this.state.Department,
  CityId:this.state.City
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
      Address:"",
      ManagerId:[],
      Manager:[],
      Admin:"",
      AdminId:0
});
  }
  ///form event
  private handleChange=(field:keyof ISharePointFormState,value:string|boolean|number):void=>{
    this.setState({[field]:value}as unknown as Pick<ISharePointFormState,keyof ISharePointFormState>);
  }
  //skills change
  // private onSkillsChange=(event:React.FormEvent<HTMLInputElement>,options:IDropdownOption):void=>{
  //   const selectedKey=options.selected?[...this.state.Skills,options.key as string]:this.state.Skills.filter((key:any)=>key!==options.key);
  //   this.setState({Skills:selectedKey})
  // }

  //Managers
  private _getManagers=(items:any):void=>{
    const managersName=items.map((item:any)=>item.text);
    const managersNameId=items.map((item:any)=>item.id);
    this.setState({Manager:managersName,ManagerId:managersNameId});
  }
  //Admin
  private _getAdmins=(items:any[]):void=>{
    if(items.length>0){
      this.setState({
        Admin:items[0].text,
        AdminId:items[0].id
      });
    }
    else{
      this.setState({
        Admin:"",
        AdminId:0
      });
    }
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
 <PeoplePicker
 context={this.props.context as any}
 titleText='Managers'
 personSelectionLimit={3}
 ensureUser={true}
 principalTypes={[PrincipalType.User]}
 defaultSelectedUsers={this.state.Manager}
 onChange={this._getManagers}
 webAbsoluteUrl={this.props.siteurl}
 showtooltip
 required={false}
 resolveDelay={1000}
 />
  <PeoplePicker
 context={this.props.context as any}
 titleText='Admin'
 personSelectionLimit={1}
 ensureUser={true}
 principalTypes={[PrincipalType.User]}
 defaultSelectedUsers={[this.state.Admin?this.state.Admin:'']}
 onChange={this._getAdmins}
 webAbsoluteUrl={this.props.siteurl}
 showtooltip
 required={false}
 resolveDelay={1000}
 />
 <ChoiceGroup
 options={this.props.genderOptions}
 selectedKey={this.state.Gender}
 onChange={(_,options)=>this.handleChange("Gender",options?.key as string )}
 label='Gender'
 />
 <Dropdown
 options={this.props.departmentOptions}
selectedKey={this.state.Department}
 onChange={(_,options)=>this.handleChange("Department",options?.key as string )}
 label='Department'
 placeholder='--select--'
 />
 <Dropdown
 options={this.props.cityOptions}
 selectedKey={this.state.City}
 onChange={(_,options)=>this.handleChange("City",options?.key as string )}
 label='City'
 />
  {/* <Dropdown
 options={this.props.skillsOptions}
 defaultSelectedKeys={this.state.Skills}
//  onChange={(_,options)=>this.handleChange("City",options?.key as string )}
onChange={this.onSkillsChange}
 label='Skills'
 placeholder='--select skills--'
 multiSelect
 /> */}
 <br/>
 <PrimaryButton text='Save' onClick={()=>this.createItem()} iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;
  <DefaultButton text='Reset' onClick={()=>this.resetForm()} iconProps={{iconName:'reset'}}/>
 </>
    );
  }
}
