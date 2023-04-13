const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactPath, 'utf8');
    const contacts = JSON.parse(data);
    console.table(contacts.filter(el => el.id === contactId));
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    const filterContacts = JSON.parse(data).filter(el => el.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(filterContacts));
    console.log('Contact successfully deleted!!!');
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const emailExist = contacts.some(el => el.email === email);

    if (!emailExist) {
      contacts.push(newContact);
      await fs.writeFile(contactPath, JSON.stringify(contacts));
      console.log('Contact successfully added!!!');
    } else {
      console.log('Contact with this email already exists');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
