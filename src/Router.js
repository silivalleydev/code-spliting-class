import React, { lazy, Suspense } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Main from '@C/Main';
const Cat = lazy(() => import(/* webpackChunkName: "cat" */ '@C/cat/Cat'));
import { Switch } from 'react-router-dom';
import Navigation from '@C/header/Navigation';
  
export default function Router() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
      <Suspense fallback={<div></div>}>
        <Route exact path="/" component={Main} />
        <Route path="/cat" component={Cat} />
      </Suspense>
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  )
}
