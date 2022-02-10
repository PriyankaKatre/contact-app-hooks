import './App.css';
import React from 'react';
import { ContactList}  from './components/contacts/ContactList/ContactList';
import { NavBar } from './components/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CreateContact } from './components/contacts/CreateContact/CreateContact';
import { EditContact } from './components/contacts/EditContact/EditContact';
import { ViewContact } from './components/contacts/ViewContact/ViewContact';

const App = () => {
    const baseUrl = "http://localhost:4000/contacts"
  return (
    <React.Fragment>
       <NavBar/>
       <Routes>
           <Route path = {'/'} element={<Navigate to = {'/contacts/list'}/>}/>
           <Route path = {'/contacts/list'} element = {<ContactList/>}/>
           <Route path = {'/contacts/add'} element = {<CreateContact/>}/>
           <Route path ={'/contacts/edit/:contactId'} element = {<EditContact/>}/>
           <Route path ={'/contacts/view/:contactId'} element = {<ViewContact/>}/>
       </Routes>
    </React.Fragment>
  );
}

export default App;
