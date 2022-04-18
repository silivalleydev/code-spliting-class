import React from 'react'
import CustomContainer from '@COMMON/CustomContainer'
import DogVisibleComponent from '@COMMON/DogVisibleComponent';
export default function Banner() {
  return (
    <CustomContainer bgColor="red" height={100}>
        Banner
        <DogVisibleComponent />
    </CustomContainer>
  )
}
