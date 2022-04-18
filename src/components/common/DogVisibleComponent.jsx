import React, {useState} from 'react'
import DogImg from '@IMG/dog.png';

export default function DogVisibleComponent() {
    const [visible, setVisible] = useState(false);
  return (
      <>
        <button onClick={() => {
            setVisible(!visible);
        }}>
            {visible ? '강아지 닫기' : '강아지 열기'}
        </button>
        {visible && <img src={DogImg} />}
      </>
  )
}
