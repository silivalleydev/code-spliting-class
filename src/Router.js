import React, { lazy, Suspense } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Main from '@C/Main';
const CatPage = lazy(() => import(/* webpackChunkName: "catPage" */ '@C/catPage/CatPage'));
import { Switch } from 'react-router-dom';
import Navigation from '@C/header/Navigation';
  
export default function Router() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Main} />
        <Suspense fallback={<div></div>}>
          <Route path="/cat" component={CatPage} />
        </Suspense>
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  )
}
