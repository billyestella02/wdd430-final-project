var express = require('express');
const contact = require('../models/contact');
var router = express.Router();

const Contact = require('../models/contact');

var contactsMaxId;

router.get('/', (req, res, next) => {
  Contact.find()
    .then(contacts => {
      contactsMaxId = contacts.length;
      res.status(200).json({
        message: "Fetched successfully",
        posts: contacts
      });
    });
});

router.post('/', (req, res, next) => {
  contactsMaxId++;
  const contact = new Contact({
    id: contactsMaxId,
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    phone: req.body.phone,
    message: req.body.message
  });
  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contactId: createdContact._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error in adding new contact',
        error: error
      });
    });
  });

module.exports = router;

