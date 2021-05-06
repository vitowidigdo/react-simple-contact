import React from 'react';

class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age:'',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.target.classList.add('active');
        this.setState({
            [e.target.name]: e.target.value
        });
        this.showInputError(e.target.name);
    }

    handleSubmit(e){
        e.preventDefault();
        if(!this.showFormErrors()){
            return false
        } else {
            this.props.addContact(e);
            this.setState({message: 'contact added'});
            setTimeout(()=>{ this.setState({message: ''}) }, 3000);
        }
    }
    showFormErrors(){
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach(input=>{
            input.classList.add('active');
            const isInputValid = this.showInputError(input.name);
            if(!isInputValid){
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    showInputError(refName){
        var element = document.getElementById(`${refName}Label`)
        if (element) {
            element.textContent = label
        }
        const validity = this.refs[refName].validity;
        //console.log(validity);
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);

        if(!validity.valid){
            if(validity.valueMissing){
                error.textContent = `${label} required`;
            } else if(validity.patternMismatch){
                error.textContent = `${label} 10 digit number required`;
            } else if(validity.typeMismatch){
                error.textContent = `${label} Invalid email address`;
            }

            return false;
        }

        error.textContent = '';
        return true;
    }


    render() {
        return (
            <section>
            <span className="successMessage">{ this.state.message }</span>
                <div className="error" id="nameError" /><div className="error" id="emailError"/><div className="error" id="phoneError"/>
            <form  onSubmit={this.handleSubmit} noValidate>
                <input type="text"
                       name="firstName"
                       pattern="[A-Za-z\s]+"
                       ref="firstName"
                       id="firstNameLabel"
                       required
                       placeholder="First name"
                       value={this.props.currentContact.firstName}
                       onChange={e => this.props.updateContact(e)}/>
                <input type="text"
                       name="lastName"
                       placeholder="Last Name"
                       ref="lastName"
                       id="lastNameLabel"
                       required
                       value={this.props.currentContact.lastName}
                       onChange={e => this.props.updateContact(e)}/>
                <input type="text"
                       name="Age"
                       placeholder="Age"
                       ref="age"
                       id="ageLabel"
                       required
                       value={this.props.currentContact.age}
                       onChange={e => this.props.updateContact(e)}/>
                <button className="add" type="submit">Add New</button>
            </form>
            </section>
        )
    }
}

export default ContactForm;






