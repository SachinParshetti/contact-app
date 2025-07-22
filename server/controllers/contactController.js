import Contact from "../models/contact.js";

// Create a new contact
export const addContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(400).json({ message: "Contact Not Added" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (contacts.length > 0) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ message: "No Contacts Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single contact by ID
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params._id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update contact
export const updateContact = async (req, res) => {
  try {
    const { name, mobile, email, company, title, group, image } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params._id,
      { name, mobile, email, company, title, group, image },
      { new: true }
    );

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params._id);
    if (contact) {
      res.status(200).json({ message: "Contact Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Contact Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
