import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contact } from "./contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];
  contact: Contact;
  maxId!: number;
  contactsUpdated = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http.get<{ message: string, posts: Contact[]}>
    ('http://localhost:3000/contacts')
      .subscribe(
        (contactsData) => {
          this.contacts = contactsData.posts;
          console.log(this.contacts);
          this.contactsUpdated.next([...this.contacts]);
          this.maxId = this.getMaxId();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContactUpdateListener() {
    return this.contactsUpdated.asObservable();
  }

  getProject(id: string): Contact | null {
    return this.contacts.find((contact) => contact.id === id);
  }

  getMaxId(): number {
    return this.contacts.length;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/contacts',
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

     // delete from database
     this.http.delete('http://localhost:3000/contacts/' + contact.id)
     .subscribe(
       (response: Response) => {
         this.contacts.splice(pos, 1);
       }
     );
  }
}
