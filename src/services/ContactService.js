import axios from 'axios';

export class ContactService {
    static serviceUrl = `https://reactcontactapphooks.herokuapp.com`;
    static getAllGroups() {
        let dataUrl = `${this.serviceUrl}/groups`;
        return axios.get(dataUrl);
    }
    static getGroup(contact) {
        let dataUrl = `${this.serviceUrl}/groups/${contact.groupId}`;
        return axios.get(dataUrl);
    }

    static getAllContacts() {
        let dataUrl = `${this.serviceUrl}/contacts`;
        return axios.get(dataUrl);
    }

    static getContact(contactId) {
        let dataUrl = `${this.serviceUrl}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    static addContact(contact) {
        let dataUrl = `${this.serviceUrl}/contacts`;
        return axios.post(dataUrl,contact);
    }

    static editContact(contact, contactId) {
        let dataUrl = `${this.serviceUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact)
    }

    static deleteContact(contactId){
         let dataUrl = `${this.serviceUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl)
    }
}
