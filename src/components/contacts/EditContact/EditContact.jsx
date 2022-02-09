import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import { Spinner } from '../../Spinner/Spinner';

export const EditContact = () => {
    let {contactId} = useParams();
    let navigate = useNavigate();

    let [state, setState] = useState({
        loading: false,
        contact : {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups:[],
        errormessage:''
    })

    useEffect(()=>{
        async function getData() {
            try {
                setState({...state, loading: true});
                let responce = await ContactService.getContact(contactId);
                let groupResponce = await ContactService.getAllGroups();
                setState({...state, loading:false, contact:responce.data, groups:groupResponce.data})
            }
            catch(error) {
                setState({...state, loading:false, errormessage: error.message})
            }

        }
        getData();
    },[contactId])
    let getFormData = (e) =>{
        setState(
            {
            ...state,
            contact:{
                ...state.contact,
                [e.target.name] : e.target.value
            }
        });
    }

    let submitForm = async(e) => {
        e.preventDefault();
        try {
            let responce = ContactService.editContact(state.contact, contactId);
            if(responce) {
                navigate(`/contacts/list`, {replace: true})
            }

        }
        catch(error){
            setState({...state, errorMessage: error.message});
            navigate(`/contacts/edit/${contactId}`, {replace: false})
        }
    }

    let {loading, contact, groups, errorMessage} = state;
    return(
        <React.Fragment>
        {
            loading ? <Spinner/> :
            <React.Fragment>
                <section className='add-contact mt-3 animated jello delay-.2s'>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h4 text-success fw-bold">Edit Contact</p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sequi repellat cum. Repellat quasi neque, atque voluptatum porro illo voluptates enim reiciendis ducimus velit quos asperiores magnam maxime optio ipsum.</p>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={contact.photo} alt="Contact" className="contact-image"/>
                            </div>
                            <div className="col-md-6">
                                <form action="" onSubmit= {submitForm}>
                                    <div className="mb-2">
                                        <input type="text"
                                                name = 'name'
                                                value = {contact.name}
                                                onChange = {getFormData}
                                                className="form-control"/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="text"
                                        name = 'photo'
                                        value = {contact.photo}
                                        onChange = {getFormData} className="form-control" placeholder='Photo Url'/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="number"
                                        name = 'mobile'
                                        value = {contact.mobile}
                                        onChange = {getFormData} className="form-control" placeholder='Mobile'/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="text"
                                        name = 'email'
                                        value = {contact.email}
                                        onChange = {getFormData} className="form-control" placeholder='Email'/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="text"
                                        name = 'company'
                                        value = {contact.company}
                                        onChange = {getFormData} className="form-control" placeholder='Company'/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="text"
                                        name = 'title'
                                        value = {contact.title}
                                        onChange = {getFormData} className="form-control" placeholder='Title'/>
                                    </div>
                                    <div className="mb-2">
                                        <select className="form-control"
                                        name = 'groupId'
                                        value = {contact.groupId}
                                        onChange = {getFormData}>
                                            <option value ="">Select a Group</option>
                                            {
                                                groups.length > 0 &&
                                                groups.map(group => {
                                                    return (
                                                        <option value = {group.id} key =  {group.id}> {group.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <input type="submit" className="btn btn-success" value='Update'/>
                                        <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        }
        </React.Fragment>
    )
}
