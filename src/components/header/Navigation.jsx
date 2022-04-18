import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
      <div style={{ textAlign: 'center' }}>
      <Link to='/'>Home</Link>
      <span>{`     `}</span>
      <Link to='/cat'>Cat</Link>
      </div>
  )
}
