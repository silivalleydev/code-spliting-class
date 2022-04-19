import React, { lazy, Suspense, useState } from 'react'
import CustomContainer from '@COMMON/CustomContainer';
import Top from './top/Top'
import Middle from './middle/Middle'
const DogVisibleComponent = lazy(() => import('@COMMON/DogVisibleComponent'));

export default function Body() {
  const [visible, setVisible] = useState(false);

  return (
    <CustomContainer bgColor="blue" height={500}>
        <Top/>
        <Middle/>
        <button onClick={() => {
          setVisible(!visible);
        }}>
            {visible ? '강아지 닫기' : '강아지 열기'}
        </button>
        <Suspense fallback={<div></div>}>
          {visible && <DogVisibleComponent />}
        </Suspense>

    </CustomContainer>
  )
}
