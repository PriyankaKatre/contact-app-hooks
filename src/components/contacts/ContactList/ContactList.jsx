import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import {Spinner} from "../../Spinner/Spinner";

export const ContactList = () => {
    let [query, setquery] = useState({
        text: ''
    });

    let [state, setstate] = useState({
        loading: false,
        contacts: [],
        filteredContact: [],
        errorMessage: ''
    });

    useEffect( () => {
        async function fetchData() {
            try {
                setstate({...state, loading: true});
                let responce = await ContactService.getAllContacts();
                setstate({
                    ...state,
                    loading:false,
                    contacts: responce.data,
                    filteredContact: responce.data
                });
            }
            catch(error) {
                setstate({
                    ...state,
                    loading:false,
                    errorMessage:error.message
                })
            }
        }
        fetchData();

    }, []);

    let clickDelete = async(contactId) => {
        try {
          let responce = await ContactService.deleteContact(contactId);
          if(responce) {
            setstate({...state, loading: true});
              let responce = await ContactService.getAllContacts();
              setstate({
                ...state,
                loading:false,
                contacts: responce.data,
                filteredContact: responce.data
              });
            }
        }

        catch(error) {
            setstate({
                ...state,
                loading:false,
                errorMessage:error.message
            })
        }
    }

    let onChangeSearchData = (e) =>{
        setquery({
            ...query,
            text : e.target.value,
        })
        let theContact = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            ...state,
            filteredContact: theContact
        })
    }

    let {loading, contacts, filteredContact, errorMessage} = state;
    return (
        <React.Fragment>
            <section className="contact-search animated slideInLeft p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col p-0">
                                <p className="h5">Contact Manager
                                <Link to= {'/contacts/add'} className='btn btn-success ms-2'>
                                    <i className="fa fa-plus-circle p-1"/>New
                                </Link></p>
                                <p className="fst-italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quod maxime debitis amet! Modi magnam asperiores, blanditiis voluptatibus fugiat hic provident itaque perspiciatis, inventore ut vel deserunt officia veritatis quas.</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <form action="" className="row d-flex align-items-center">
                                            <div className="col-8">
                                                <div className="mb-2">
                                                    <input type="text"
                                                     name ='text'
                                                     value = {query.text}
                                                     onChange = {onChangeSearchData}
                                                     className="form-control" placeholder= "search Names"/>
                                                </div>
                                            </div>
                                            <div className="col-4 p-0">
                                                <div className="mb-2">
                                                    <input type="submit" className="btn btn-outline-dark" value="search"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                <React.Fragment>
                    <section className="contact-list animated slideInRight delay-.5s">
                        <div className="container mt-3">
                            <div className="grid">
                                <div className="row">
                                    {
                                        filteredContact.length>0 &&
                                        filteredContact.map(contact => {
                                            return (
                                                <div className ="col-md-6 mb-4" key={contact.id}>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row d-flex justify-content-center align-items-center">
                                                                <div className="col-lg-4 text-center">
                                                                    <img src={contact.photo} alt="" className="contact-image"/>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <ul className="list-group">
                                                                        <li className="list-group-item list-group-item-action">
                                                                            Name : <span className="fw-bold">{contact.name}</span>
                                                                        </li>
                                                                        <li className="list-group-item list-group-item-action">
                                                                            Mobile : <span className="fw-bold">{contact.mobile}</span>
                                                                        </li>
                                                                        <li className="list-group-item list-group-item-action">
                                                                            Email : <span className="fw-bold">{contact.email}</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col d-flex justify-content-center align-items-center mt-3">
                                                                    <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning mt-1">
                                                                        <i className="fa fa-eye"/>
                                                                    </Link>
                                                                    <Link to = {`/contacts/edit/${contact.id}`} className="btn btn-primary mt-1" >
                                                                        <i className="fa fa-pen"></i>
                                                                    </Link>
                                                                    <button className="btn btn-danger mt-1" onClick={()=>clickDelete(contact.id)}>
                                                                      <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>

    )
}
