import React from 'react';
import ReactDOM from 'react-dom';
import $, { data } from 'jquery';
import './index.css';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';

class Contacts extends React.Component{
    constructor(){
        super();

        this.updateContact = this.updateContact.bind(this);
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.updateEditContact = this.updateEditContact.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByEmail = this.sortByEmail.bind(this);
        this.sortByNumber = this.sortByNumber.bind(this);

        this.state = {
            data: [],
            currentContact:{
                name: '',
                email: '',
                phone: '',
            },
            order: false
        }

    }

    componentDidMount() {
        fetch("https://simple-contact-crud.herokuapp.com/contact")
        .then(res => res.json())
        .then(
          (data) => {
            this.setState({
              isLoaded: true,
              data: data.data,
              items: data.items,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        //for sorting arrow code below

        $('.sortable').click(function(){
            const sort = $(this).hasClass('asc') ? 'desc' : 'asc';
            $('.sortable').removeClass('asc').removeClass('desc');
            $(this).addClass(sort);

        });

    }

    deleteContact(id){
        fetch('https://simple-contact-crud.herokuapp.com/contact/' + id, {
            method: 'DELETE',
        })
        .then(res => console.log(res))
    }
    addContact(evt){
        evt.preventDefault();
        let contacts = this.state.contacts;
        let currentContact = this.state.currentContact;
        this.state.users.unshift({
            id: this.state.users.length+1,
            firstName: currentContact.firstName,
            lastName: currentContact.lastName,
            age: currentContact.age,
        });

        this.setState({
            contacts: contacts,
            currentContact: {firstName: '', lastName:'', age:''}
        })
    }

    updateContact(e){
        let currentContact = this.state.currentContact
        currentContact[e.target.firstName] = e.target.value
       this.setState({
            currentContact:currentContact,
        })
    }
    updateEditContact(newFirstName, newLastName, age, id){
        fetch('https://simple-contact-crud.herokuapp.com/contact', {
            method: 'POST',
            body: {
             "id": id,
             "firstName": newFirstName,
             "lastName": newLastName,
             "age": age,
            }
        });
        // this.setState({
        //     users
        // })
    }

    sortByName(){
        const userOrder = !this.state.order
        this.setState({ order: userOrder })
        let contacts = this.state.users

        contacts.sort(function (a, b) {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            if(userOrder) {
                if(x < y) return -1
                if(x > y) return 1
                return 0
            } else {
                if(x < y) return 1
                if(x > y) return -1
                return 0
            }
        });

        this.setState({ users: contacts})
    }
    sortByEmail(){
        const userOrder = !this.state.order
        this.setState({ order: userOrder })
        let contacts = this.state.users

        contacts.sort(function (a, b) {
            const x = a.email.toLowerCase();
            const y = b.email.toLowerCase();
            if(userOrder) {
                if(x < y) return -1
                if(x > y) return 1
                return 0
            } else {
                if(x < y) return 1
                if(x > y) return -1
                return 0
            }
        });

        this.setState({ users: contacts})
    }
    sortByNumber(){
        const userOrder = !this.state.order
        this.setState({ order: userOrder })
        let contacts = this.state.users

        contacts.sort(function (a, b) {
            const x = a.phone;
            const y = b.phone;
            if(userOrder) {
                return x-y
            } else {
                return y-x
            }

        });
        this.setState({ users: contacts})
    }


    render(){
        return(
            <div id="container">
                <header className="container">
                    <span><h2>Simple Contact CRUD</h2></span>
                </header>
                <section className="content">
                    <h2>List of Contacts</h2>

                    <div className="table-body">
                        <section>
                            <ContactForm
                                currentContact = {this.state.currentContact}
                                updateContact = {this.updateContact}
                                addContact = {this.addContact}
                            />
                        </section>
                        <table>
                            <thead>
                            <tr>
                                <th className="sortable asc" onClick={this.sortByName}>First Name</th>
                                <th className="sortable" onClick={this.sortByEmail}>Last Name</th>
                                <th className="sortable" onClick={this.sortByNumber}>Age</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                        {
                            this.state.data.map((key,index) => (
                                <ContactDetail
                                    key={key}
                                    index = {index}
                                    detail = {key}
                                    deleteContact = {this.deleteContact}
                                    updateEditContact = {this.updateEditContact}
                                />
                            ))
                        }

                    </div>

                </section>
            </div>
        )
    }


}


ReactDOM.render(<Contacts/>, document.getElementById('root'));
