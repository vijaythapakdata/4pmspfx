import * as React from 'react';
// import styles from './Sampleform.module.scss';
import type { ISampleformProps } from './ISampleformProps';
import { Checkbox, ChoiceGroup, ComboBox, DefaultButton, Dropdown, IconButton, PrimaryButton, SearchBox, Slider, TextField, Toggle } from '@fluentui/react';


export default class Sampleform extends React.Component<ISampleformProps> {
  public render(): React.ReactElement<ISampleformProps> {
    

    return (
     <>
     <h2>Hello World</h2>
     <form>
      <SearchBox placeholder='search here...' iconProps={{iconName:'search'}}/>
      <br/>
      <br/>
      <TextField
      label='Full Name'
      placeholder='Enter your name..'
      type='text'
      iconProps={{iconName:'people'}}
      />
      <TextField label='Email Address'
      iconProps={{iconName:'mail'}}
      placeholder='Enter your email address'
      type='email'
      />
      <TextField label='Permanent Address'
      multiline
      rows={5}
      iconProps={{iconName:'home'}}
      placeholder='Enter your permananet address'
      />
      <TextField type='password' label='Password'/>
      <TextField label='File' type='file'/>
      <TextField label='Salary' prefix='$' suffix='USD'/>
      <Dropdown
      placeholder='--select--'
      options={[
        {key:'IT',text:'IT'},
        {key:'HR',text:'HR'},
        {key:'CC',text:'CC'}
      ]}
      label='Department'
      />
      <ChoiceGroup
      options={[
        {key:'Male',text:'Male'},
        {key:'Female',text:'Female'}
      ]}
      label='Gender'
      />
       <ComboBox
      placeholder='--select--'
      options={[
        {key:'IT',text:'IT'},
        {key:'HR',text:'HR'},
        {key:'CC',text:'CC'}
      ]}
      label='Department'
      allowFreeform
      autoComplete='on'
      multiSelect
      />
      <Toggle label='Permission'/>
      <Slider min={1}max={100}label='Score'/>
      <Checkbox label='Yes'/>

      <br/>
      <PrimaryButton text='Save' iconProps={{iconName:'save'}}/>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <DefaultButton text='Defualt' iconProps={{iconName:'edit'}}/> &nbsp; &nbsp; &nbsp; &nbsp;
      <IconButton iconProps={{iconName:'delete'}}/>
     </form>
     </>
    );
  }
}
// const Sampleform:React.FC<ISampleformProps>=(props)=>{
//   return(
//     <>
//     <h3>Hello</h3>
//     </>
//   )
// }
// export default Sampleform
