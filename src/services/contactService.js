import axios from "axios"
export class ContactServices{
   static  ServerUrl = 'http://localhost:4000'
   static getAllContacts()
   {
      let dataUrl = `${this.ServerUrl}/contacts`
      return axios.get(dataUrl);
   }
   static getContact(contactId)
   {
      let dataUrl = `${this.ServerUrl}/contacts/${contactId}`
      return axios.get(dataUrl)
   }

   static getAllGroups()
   {
      let dataUrl = `${this.ServerUrl}/groups`
      return axios.get(dataUrl)
   }
   static getGroups(contact)
   {
      let groupId = contact.group
      let dataUrl = `${this.ServerUrl}/groups/${groupId}`
      return axios.get(dataUrl)
   }
   static AddContact(contact)
   {
      let dataUrl = `${this.ServerUrl}/contacts`
      return axios.post(dataUrl,contact)
   }

   static deleteContact(contactId)
{
   let dataUrl = `${this.ServerUrl}/contacts/${contactId}`
   return axios.delete(dataUrl)
}
  static updateContact(contact,contactId)
  {
   let dataUrl = `${this.ServerUrl}/contacts/${contactId}`
   return axios.put(dataUrl,contact)
  }
}