import React, {useState} from 'react'
import DogImg from '@IMG/dog.png';

export default function DogVisibleComponent() {
  return (
      <div>
        <img src={DogImg} />
      </div>
  )
}
