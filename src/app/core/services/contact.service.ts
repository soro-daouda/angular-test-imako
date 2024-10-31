import { Injectable, signal } from '@angular/core';
import { contactList } from '../data/contactList.data';
import { Contact } from '../entities/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _contactList = signal<Contact[]>(contactList);

  get contactList() {
    return this._contactList().reverse();
  }

  registerOrUpdate(contact: Contact) {
    const isEmptyId = !contact.id;
    if (isEmptyId) {
      this.registerContact(contact);
      return;
    }
    this.updateContact(contact);
  }

  private registerContact(contact: Contact) {
    const maxId = this._contactList().reduce(
      (max, contact) => Math.max(max, contact.id!),
      0
    );
    contact.id = maxId + 1;
    this._contactList.update(() => [...this._contactList(), contact]);
  }

  private updateContact(contact: Contact) {
    const contactToUpdate = this._contactList().find(
      (contactFound: Contact) => contactFound.id === contact.id
    );

    if (contactToUpdate) {
      contactToUpdate.firstName = contact.firstName;
      contactToUpdate.lastName = contact.lastName;
      contactToUpdate.phone = contact.phone;
      contactToUpdate.profilePhoto = contact.profilePhoto;
    }

    this._contactList.update(() => [...this._contactList()]);
  }

  deleteById(id: number) {
    const newContactList = this._contactList().filter(
      (contact: Contact) => contact.id !== id
    );
    this._contactList.update(() => newContactList);
  }
}
