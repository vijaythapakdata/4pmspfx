import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from './IFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
const FunctionalForm:React.FC<IFunctionalFormProps>=(props)=>{
  const[formData,setFormData]=React.useState<IFunctionalFormState>({
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
  });
  // create item
  const createItem=async()=>{
try{
  const web=Web(props.siteurl);
  const lists=web.lists.getByTitle(props.ListName);
  const items=await lists.items.add({
    Title:formData.Name,
    EmailAddress:formData.EmailAddress,
    Age:parseInt(formData.Age),
    Salary:parseFloat(formData.Salary),
    Score:formData.Score,
    Address:formData.Address,
    AdminId:formData.AdminId,
    ManagerId:{results:formData.ManagerId},
  });
  Dialog.alert(`Item created successfully with ID: ${items.data.Id}`);
  console.log(items);
  // Reset form data
  setFormData({
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
  })
}
catch(err){
  console.error(err);
  Dialog.alert("Item creation failed");
}
  }

  //get admin
  const _getAdmins=(items:any[])=>{
    if(items.length>0){
      setFormData(prev=>({...prev, Admin:items[0].text, AdminId:items[0].id }));
    }
    else{
      setFormData(prev=>({...prev, Admin:"", AdminId:0 }));
    }
  }
  //get managers
  const _getManagers=(items:any)=>{
const managersName=items.map((item:any)=>item.text);
    const managersNameId=items.map((item:any)=>item.id);
    setFormData(prev=>({...prev, Manager:managersName, ManagerId:managersNameId }));
  }
  const handleChange=(fieldValue: keyof IFunctionalFormState, value: string | number )=>{
    setFormData(prev=>({...prev, [fieldValue]: value }));
  }
  return(
    <>
    <TextField
    label='Name'
    value={formData.Name}
    onChange={(e, newValue)=>handleChange("Name", newValue || "")}
    />
      <TextField
    label='Age'
    value={formData.Age}
    onChange={(e, newValue)=>handleChange("Age", newValue || "")}
    />
      <TextField
    label='Salary'
    value={formData.Salary}
    onChange={(e, newValue)=>handleChange("Salary", newValue || "")}
    />
      <TextField
    label='Email Address'
    value={formData.EmailAddress}
    onChange={(e, newValue)=>handleChange("EmailAddress", newValue || "")}
    />
    <Slider
    min={1}
    max={100}
    onChange={(value)=>handleChange("Score", value)}
    label='Score'
    value={formData.Score}
    />
    <PeoplePicker
     context={props.context as any}
     titleText='Managers'
     personSelectionLimit={3}
     ensureUser={true}
     principalTypes={[PrincipalType.User]}
     defaultSelectedUsers={formData.Manager}
     onChange={_getManagers}
     webAbsoluteUrl={props.siteurl}
     showtooltip
     required={false}
     resolveDelay={1000}
     />
      <PeoplePicker
     context={props.context as any}
     titleText='Admin'
     personSelectionLimit={1}
     ensureUser={true}
     principalTypes={[PrincipalType.User]}
     defaultSelectedUsers={[formData.Admin?formData.Admin:'']}
     onChange={_getAdmins}
     webAbsoluteUrl={props.siteurl}
     showtooltip
     required={false}
     resolveDelay={1000}
     />
        <TextField
    label=' Address'
    value={formData.Address}
    onChange={(e, newValue)=>handleChange("Address", newValue || "")}
    multiline
    rows={5}
    />
     <br/>
     <PrimaryButton text='Save'
      onClick={createItem}
      iconProps={{iconName:'Save'}}
     />
    </>
  )
}
export default FunctionalForm;
