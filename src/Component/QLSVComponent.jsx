import React, { Component } from 'react'
import FormSVComponent from './FormSVComponent'
import ListSVComponent from './ListSVComponent'

export default class QLSVComponent extends Component {
  render() {
    return (
      <div className='container'>
            <h1>QUAN LY SINH VIEN</h1>
            <FormSVComponent/>
            <ListSVComponent/>

      </div>
    )
  }
}
