import React from 'react';


class ContactDetail extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        }

        this.renderForm = this.renderForm.bind(this);
        this.renderEditingItem = this.renderEditingItem.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.updateEditedContact = this.updateEditedContact.bind(this);
    }
    toggleState(){
        const {isEditing} = this.state;
        this.setState({
            isEditing:!isEditing
        })
    }
    updateEditedContact(e){
        e.preventDefault();
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const age = this.age.value;
        this.props.updateEditContact(this.props.index, firstName, lastName, age);
        this.toggleState();
    }
    cancelEdit(){
        this.setState({
            isEditing: false
        });
    }
    renderEditingItem(){
        return(
            <form onSubmit={this.updateEditedContact}>
                <input type="text" name="firstName" ref={(ref) => {this.firstName = ref}} defaultValue={this.props.detail.firstName}/>
                <input type="text" name="lastName" ref={(ref) => {this.lastName = ref}} defaultValue={this.props.detail.lastName}/>
                <input type="text" name="age" ref={(ref) => {this.age = ref}} defaultValue={this.props.detail.age}/>
                <button type="submit" className="save">Save</button>
                <button type="button" className="cancel" onClick={this.cancelEdit.bind(this)}>Cancel</button>
            </form>
        )
    }
    renderForm(){
        return(
            <table>
                <tbody>
                <tr>
                    <td>{this.props.detail.firstName}</td>
                    <td>{this.props.detail.lastName}</td>
                    <td>{this.props.detail.age}</td>
                    <td><span><i className="fa fa-pencil" aria-hidden="true" onClick={()=>{this.toggleState()}}></i>
                         <i className="fa fa-trash" aria-hidden="true" onClick={()=>{
                             this.props.deleteContact(this.props.detail.id)
                         }}></i></span></td>
                </tr>
                </tbody>
            </table>
        )
    }


    render(){
        const {isEditing} = this.state;
        return(
            <section>
                {
                    isEditing ? this.renderEditingItem () : this.renderForm()
                }


            </section>
        )
    }

}


export default ContactDetail;