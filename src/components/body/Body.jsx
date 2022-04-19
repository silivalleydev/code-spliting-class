import React, { lazy, Suspense, useState } from 'react'
import CustomContainer from '@COMMON/CustomContainer';
import Top from './top/Top'
import Middle from './middle/Middle'
const DogVisibleComponent = lazy(() => import(/* webpackChunkName: "dogVisibleComponent" */  '@COMMON/DogVisibleComponent'));

export default function Body() {
  const [visible, setVisible] = useState(false);

  return (
    <CustomContainer bgColor="blue" height={500}>
        <Top/>
        <Middle/>
        <button onClick={() => {
          import (/* webpackChunkName: "alert" */ '@FUNC/alert')
          .then((alert) => alert.dog())
          .catch(() => console.log('fail'));
        }}>
          멍멍이 경고창
        </button>
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
