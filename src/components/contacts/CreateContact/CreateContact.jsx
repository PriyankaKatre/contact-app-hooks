import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import { Spinner } from '../../Spinner/Spinner';

export const CreateContact = () => {
    let navigate = useNavigate();
    let [state, setstate] = useState({
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
        groups :[],
        errorMessage: ''
    })

    let [userError , setUserError] = useState({
        nameError : '',
        emailError : '',
        mobileError : '',
        companyError: '',
        titleError: ''
    });
    // let updateInput = (e) => {
    //     setstate(
    //         {
    //         ...state,
    //         contact:{
    //             ...state.contact,
    //             [e.target.name] : e.target.value
    //         }
    //     });
    // }

    let validateUsername = (event) => {
        setstate({...state ,
            contact:{
                ...state.contact,
                name : event.target.value
            }
        });
        let regExp = /^[a-zA-Z0-9, '']{4,20}$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , nameError: 'Enter a proper Name'})
            : setUserError({...userError , nameError: ''});
    }

    // let validateEmail = (event) => {
    //     setstate({...state ,
    //         contact:{
    //             ...state.contact,
    //             email : event.target.value
    //         }
    //     });
    //     let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    //     !regExp.test(event.target.value) ?
    //         setUserError({...userError , emailError: 'Enter a proper Email'})
    //         : setUserError({...userError , emailError: ''});
    // }

    let validateEmail = (event) => {
        setstate({...state ,
            contact:{
                ...state.contact,
                email : event.target.value
            }
        });
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , emailError: 'Enter a proper Email'})
            : setUserError({...userError , emailError: ''});
    }

    useEffect(()=>{
        async function fetchData() {
            try {
                setstate({...state, loading: true});
                let responce = await ContactService.getAllGroups();
                setstate({
                    ...state,
                    loading: false,
                    groups: responce.data,
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
    }, [])

    let submitForm = async(e) => {
        e.preventDefault();
        try {
            let responce = ContactService.addContact(state.contact);
            if(responce) {
                navigate(`/contacts/list`, {replace: true})
            }

        }
        catch(error){
            setstate({...state, errorMessage: error.message});
            navigate(`/contacts/add`, {replace: false})
        }
    }
    let {loading, contact, groups, errorMessage} = state;
    return(
        <React.Fragment>
            {
                loading? <Spinner/> :
                <React.Fragment>
                    <section className='add-contact p-3 animated slideInLeft'>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 text-success fw-bold">Create Contact</p>
                                    <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sequi repellat cum. Repellat quasi neque, atque voluptatum porro illo voluptates enim reiciendis ducimus velit quos asperiores magnam maxime optio ipsum.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <form action="" onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input name="name"
                                                value={contact.name}
                                                onChange={validateUsername}
                                                type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`}
                                                placeholder="Name" required/>
                                            {userError.nameError.length > 0 ? <small className="text-danger">{userError.nameError}</small> : ''}
                                        </div>
                                        <div className="mb-2">
                                            <input type="text"
                                            name='photo'
                                            value={contact.photo}
                                             className="form-control" placeholder='Photo Url' required/>
                                        </div>
                                        <div className="mb-2">
                                            <input type="number"
                                            name='mobile'
                                            value={contact.mobile}
                                            className="form-control" placeholder='Mobile' required/>
                                        </div>
                                        <div className="mb-2">
                                            <input name="email"
                                                    value={contact.email}
                                                    onChange={validateEmail}
                                                    type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`}
                                                    placeholder="Email" required/>
                                                {userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : ''}
                                        </div>
                                        <div className="mb-2">
                                            <input type="text"
                                            name='company'
                                            value={contact.company}
                                             className="form-control" placeholder='Company' required/>
                                        </div>
                                        <div className="mb-2">
                                            <input type="text"
                                            name='title'
                                            value={contact.title}
                                             className="form-control" placeholder='Title' required/>
                                        </div>
                                        <div className="mb-2">
                                            <select className="form-control"
                                            name='groupId'
                                            value={contact.groupId}
                                            required >
                                                <option value ="">Select a Group</option>
                                                {
                                                    groups.length > 0 &&
                                                    groups.map(group =>{
                                                        return(
                                                            <option key={group.id} value={group.id}>{group.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-success" value='Create'/>
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
