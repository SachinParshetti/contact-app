import { getAllContacts, getContact, addContact, updateContact, deleteContact } from "../controllers/contactController.js";
import express from "express";

const contactrouter = express.Router();

contactrouter.get("/", getAllContacts);
contactrouter.get("/:_id", getContact);
contactrouter.post("/", addContact);
contactrouter.put("/:_id", updateContact);
contactrouter.delete("/:_id", deleteContact);

export default contactrouter;
