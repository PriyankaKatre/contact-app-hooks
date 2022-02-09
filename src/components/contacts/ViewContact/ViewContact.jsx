import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import { Spinner } from '../../Spinner/Spinner';

export const ViewContact = () => {
    const {contactId} = useParams();
    const [state, setstate] = useState({
        loading: false,
        contact: {},
        group: {},
        errorMessage:''
    })
    useEffect(()=>{
        async function fetchData() {
            try {
                setstate({...state, loading: true});
                let responce = await ContactService.getContact(contactId);
                let groupResponce = await ContactService.getGroup(responce.data);
                setstate({
                    ...state,
                    loading: false,
                    contact: responce.data,
                    group: groupResponce.data
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
    }, [contactId])

    let { loading, contact, group, errorMessage } = state;
    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
                <React.Fragment>
                   {
                       Object.keys(contact).length>0 && Object.keys(group).length>0 &&
                        <section className='view-contact-info p-3 animated pulse delay-.2s'>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h4 text-success fw-bold">View Contact</p>
                                        <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sequi repellat cum. Repellat quasi neque, atque voluptatum porro illo voluptates enim reiciendis ducimus velit quos asperiores magnam maxime optio ipsum.</p>
                                    </div>
                                </div>
                                <div className="row align-items-center mt-3">
                                    <div className="col-md-4 text-center">
                                        <img src={contact.photo} alt="Contact" className="contact-image"/>
                                    </div>
                                    <div className="col-md-8">
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
                                            <li className="list-group-item list-group-item-action">
                                                Company : <span className="fw-bold">{contact.company}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Title : <span className="fw-bold">{contact.title}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Group : <span className="fw-bold">{group.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Link to ={'/contacts/list'} className='btn btn-warning'>Close</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                   }
                </React.Fragment>
            }

        </React.Fragment>
    )
}
