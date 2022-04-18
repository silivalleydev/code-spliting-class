import React from 'react'
import CustomContainer from '@COMMON/CustomContainer'
import Top from './top/Top'
import Middle from './middle/Middle'
import DogVisibleComponent from '@COMMON/DogVisibleComponent';

export default function Body() {
  return (
    <CustomContainer bgColor="blue" height={500}>
        <Top/>
        <Middle/>
        <DogVisibleComponent />

    </CustomContainer>
  )
}
