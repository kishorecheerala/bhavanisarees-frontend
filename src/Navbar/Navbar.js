import React from 'react';
import './Navbar.css';
import Logo from './bootstrap-logo-shadow.png';

export default function Navbar () {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <div className='container-fluid fw-bold'>
        <a className='navbar-brand' href='/'>
        <img src={Logo} alt="Logo" width="40" height="35" className="d-inline-block align-text-center"></img>
        &nbsp;Bhavani Sarees
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mx-auto mb-lg-0 gap-3'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='/'>
                Home
              </a>
            </li>

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='/'
                id='navbarDropdown'
                data-bs-toggle='dropdown'
              >
                Customer Details
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <a className='dropdown-item' href='/customers'>
                    Customers List
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/newcustomer'>
                    Add a New Customer
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider'></hr>{' '}
                </li>
                <li>
                  <a className='dropdown-item' href='/'>
                    Something else here
                  </a>
                </li>
              </ul>
            </li>

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='/'
                id='navbarDropdown'
                data-bs-toggle='dropdown'
              >
                Seller Details
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <a className='dropdown-item' href='/sellers'>
                    List Sellers
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/newseller'>
                    Add a New Seller
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider'></hr>{' '}
                </li>
                <li>
                  <a className='dropdown-item' href='/'>
                    Something else here
                  </a>
                </li>
              </ul>
            </li>

            {/* Reports Tab */}

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='/'
                id='navbarDropdown'
                data-bs-toggle='dropdown'
              >
                Reports
              </a>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <a className='dropdown-item' href='/customers'>
                    Customers List
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/newseller'>
                    Seller Returns
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider'></hr>{' '}
                </li>
                <li>
                  <a className='dropdown-item' href='/'>
                    Daily Reports
                  </a>
                </li>
              </ul>
            </li>

          </ul>
          <form className='d-flex'>
            <input
              className='form-control me-2'
              style={{ width: '180px' }}
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
