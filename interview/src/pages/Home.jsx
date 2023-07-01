import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Edit from '../img/Edit.svg';
import Trash from '../img/Trash.svg';
import avatar1 from '../img/1.svg';
import avatar2 from '../img/2.svg';
import avatar3 from '../img/3.svg';
import avatar4 from '../img/4.svg';
import avatar5 from '../img/5.svg';
import avatar6 from '../img/6.svg';
import avatar7 from '../img/7.svg';

export const Home = () => {
    const [token, setToken] = React.useState(JSON.parse(localStorage.getItem('customer')) || '')
    const [customers, setCustomers] = React.useState(token || []);
    const [name, setName] = React.useState('');
    const [lastName, setLastname] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [status, setStatus] = React.useState('user');
    const [showPassword, setShowPassword] = React.useState(false);
    const [activeClass, setActiveClass] = React.useState(0);
    const tabs = ['user', 'administrator'];
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7]

    React.useEffect(() => {
        localStorage.setItem('customer', JSON.stringify(customers));
    }, [customers])

    const getAvatars = Math.floor(Math.random() * (avatars.length - 1))

    const addCustomer = (e) => {
        e.preventDefault()
        setCustomers([
            ...customers,
            {
                id: new Date().toISOString(),
                name,
                company,
                lastName,
                email,
                password,
                status,
                avatar: avatars[getAvatars]
            }
        ]);
        setName('');
        setCompany('');
        setEmail('');
        setLastname('');
        setPassword('');
        setStatus('');
    }

    const removeCustomer = (id) => {
        setCustomers(customers.filter(todo => todo.id !== id))
    }   

    const showOrHidePassword = () => {
        if(showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }
 
    const onClickCategory = (index) => {
        setActiveClass(index);
        if(index == 0) {
            setStatus('user')
        } else {
            setStatus('administrator')
        }
    }

    console.log(customers);

  return (
    <div className='main'>
        <div className="register_form" style={{marginRight: '100px'}}>
        <h1>Add Customers</h1>
        <form>
            <div className="main__form" style={{display: 'inline-block'}}>
                <label className='main__label' htmlFor="name" style={{display: 'block'}}>First Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name='name'/>
            </div>
            <div className="main__form" style={{display: 'inline-block'}}>
                <label htmlFor="surname" className='main__label' style={{display: 'block'}}>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} name='surname'/>
            </div>
            <div className="main__form">
                <label htmlFor="company" className='main__label' style={{display: 'block'}}>Company Name</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className='form-input' name='company'/>
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
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-input'  name='email'/>
            </div>
            <div className="main__form">
                <label htmlFor="password" className='main__label' style={{display: 'block'}}>Password</label>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='form-input password'  name='password' minLength={8} maxLength={16}/>
                <p className='password-span'>Show Password</p>
                <input type="checkbox" onClick={showOrHidePassword} />
                <p>minim 8 characters</p>
            </div>
            {
                company === '' || name === '' || email === '' || lastName === '' || password === '' || password.length < 8 ? 
                <button disabled={true} onClick={addCustomer}>Save</button> :
                <button onClick={addCustomer}>Save</button>
            }
        </form>
        </div>
        <div className="customers" style={{display: 'inline-block'}}>
            <h1>Customers</h1>
            <div className="about">
            <ul className='customers-ul'>
                <li className='name'>Name</li>
                <li className='name'>Company</li>
                <li className='name'>Email</li>
                <li className='action'>Admin</li>
                <li className='action'>Actions</li>
                {
                    customers?.map((customer) => 
                        <li className='li' key={customer.id}>
                            <span><img style={{width: 20, height: 20}} src={customer.avatar} alt="" /> {customer.name}</span>
                            <span>{customer.company}</span>
                            <span className='email'>{customer.email}</span>
                            {customer.status == 'user' ? <span style={{width: 80}} className='user'></span> : <span style={{width: 80}} className='administrator'></span>}
                            <span className=''><Link to={`/edit/${customer.id}`}><img src={Edit} alt="" /></Link> <img onClick={() => removeCustomer(customer.id)} src={Trash}/></span>
                        </li>
                    )
                }
            </ul>
            </div>
        </div>
    </div>
  )
}
