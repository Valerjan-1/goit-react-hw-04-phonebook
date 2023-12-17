import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import FormContact from './FormContact/FormContact';
import ListContact from './ListContact/ListContact';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const addContact = (newName, newNumber) => {
    if (!newName.trim() || !newNumber.trim()) return;

    const nameCheck = contacts.some(
      contact => contact.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameCheck) {
      alert(`${newName} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name: newName, number: newNumber };
    setContacts(prevContacts => {
      const newContacts = [...prevContacts, newContact];
      localStorage.setItem('contacts', JSON.stringify(newContacts));
      return newContacts;
    });

    setName('');
    setNumber('');
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const removeContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div>
      <h1>Phonebook</h1>
      <FormContact
        name={name}
        number={number}
        onNameChange={e => setName(e.target.value)}
        onNumberChange={e => setNumber(e.target.value)}
        addContact={() => addContact(name, number)}
      />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ListContact
        contacts={filteredContacts()}
        removeContact={removeContact}
      />
    </div>
  );
};

export default App;
