import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact!: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact('1', value.name, value.email, value.country, value.phone, value.message);
    this.contactService.addContact(newContact);
    form.resetForm();
  }

}
