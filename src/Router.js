import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Main from '@C/Main';
import CatPage from '@C/catPage/CatPage';
import { Switch } from 'react-router-dom';
import Navigation from '@C/header/Navigation';
  
export default function Router() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/cat" component={CatPage} />
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  )
}
