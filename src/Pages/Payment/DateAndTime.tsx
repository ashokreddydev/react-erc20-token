import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateAndTime({value, setValue}:any) {

  const handleChange = (newValue:any) => {
    setValue(newValue);
  };

  return (
    <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker value={value} onChange={handleChange} label="Date and Time" slotProps={{ textField: { size: 'small' } }} />
    </DemoContainer>
  );
}
