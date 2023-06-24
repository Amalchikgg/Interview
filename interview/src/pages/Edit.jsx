import React from 'react';
import './Home.scss';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const Edit = () => {
    const token = JSON.parse(localStorage.getItem('customer')); 
    const { id } = useParams();
    const customer = token?.find(item => item?.id === id) || {}
    const [name, setName] = React.useState(customer.name);
    const [lastName, setLastname] = React.useState(customer.lastName);
    const [company, setCompany] = React.useState(customer.company);
    const [email, setEmail] = React.useState(customer.email);
    const [password, setPassword] = React.useState(customer.password);
    const [status, setStatus] = React.useState(customer.status);
    const [activeClass, setActiveClass] = React.useState(0);
    const tabs = ['user', 'administrator'];

    //console.log(customer);

    const updateCustomer = (e) => {
        e.preventDefault();
        customer.name = name;
        customer.lastName = lastName;
        customer.status = status;
        customer.comapny = company;
        customer.email = email;
        localStorage.setItem('customer', JSON.stringify(token));
    }

    const onClickCategory = (index) => {
        setActiveClass(index);
        if(index == 0) {
            setStatus('user')
        } else {
            setStatus('administrator')
        }
    }

  return (
    <div className="main">
        <div className="register_form" style={{marginRight: '100px'}}>
        <h1>Update Customers</h1>
        <form>
            <div className="main__form" style={{display: 'inline-block'}}>
                <label className='main__label' htmlFor="name" style={{display: 'block'}}>First Name</label>
                <input placeholder={customer.name} value={name}  onChange={(e) => setName(e.target.value)} type="text" name='name'/>
            </div>
            <div className="main__form" style={{display: 'inline-block'}}>
                <label htmlFor="surname" className='main__label' style={{display: 'block'}}>Last Name</label>
                <input type="text" placeholder={customer.lastName} value={lastName} onChange={(e) => setLastname(e.target.value)}  name='surname'/>
            </div>
            <div className="main__form">
                <label htmlFor="company" className='main__label' style={{display: 'block'}}>Company Name</label>
                <input type="text" placeholder={customer.company} value={company} onChange={(e) => setCompany(e.target.value)} className='form-input' name='company'/>
            </div>
            <div className="main__form">
                <label htmlFor="surname" className='main__label' style={{display: 'block'}}>Status</label>
                <div className="tabs">
                <ul>
                        {
                            tabs.map((value, i) => (
                                <li onClick={() => onClickCategory(i)} className={activeClass === i ? 'active' : ''}>{value}</li>
                            ))
                        }
                    </ul>  
                </div>
            </div>
            <div className="main__form">
                <label htmlFor="email" className='main__label' style={{display: 'block'}}>Email</label>
                <input type="email" placeholder={customer.email} value={email} onChange={(e) => setEmail(e.target.value)} className='form-input'  name='email'/>
            </div>
            {
                company === '' || name === '' || email === '' || lastName === '' ? 
                <button disabled={true}>Save</button> :
                <button onClick={updateCustomer}><Link style={{textDecoration: 'none', color: 'white'}} to="/">Save</Link></button>
            }
        </form>
        </div>
    </div>
  )
}
