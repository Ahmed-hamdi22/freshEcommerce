
// import { Fragment } from 'react'
import logo  from "../../assets/freshcart-logo.svg"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../Helpers/Helpers'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { cartCounContext } from "../../Context/CartCountContext"
import { WishContext } from "../../Context/WishContext"

 

const navigation = [
  { name: 'Home', href: '', current: true },
  { name: 'Products', href: 'products', current: false },
  { name: 'categories', href: 'categories', current: false },
  { name: 'brands', href: 'brands', current: false },
]



export default function Navbar() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
  const {cartCount}=useContext(cartCounContext)
  const {wishCount}=useContext(WishContext)
  const navigate =useNavigate()
  function logOut(){
    setIsUserLoggedIn(false)
    localStorage.removeItem("token")
    navigate("/login")
    console.log("hi");
  }
    return <>
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              {/* <div className="flex flex-1 items-center  md:justify-between ms-10 sm:items-stretch sm:justify-start"> */}
                <div className="flex flex-shrink-0 items-center  ms-10 ">
                  <img
                    className="h-6 w-auto text-center "
                    src={logo}
                    alt="Your Company"
                  />
                {/* </div> */}
              </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    { isUserLoggedIn && navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          'text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
            {isUserLoggedIn ||<NavLink
                        
                        to={"login"}
                        className={classNames(
                          'text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page'}
                      >
                        Login
                      </NavLink>}
                {isUserLoggedIn ||<NavLink
                        
                        to={"register"}
                        className={classNames(
                          'text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page'}
                      >
                        Register
                      </NavLink>}
                {isUserLoggedIn &&<Link
                        
                        to={"cart"}
                        className={classNames(
                          ' rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page'}
                      >
                        <i className="fa-solid fa-cart-shopping text-[#0fc80f]"><span className=" text-[8px] relative bottom-2">{cartCount}</span></i>
                      </Link>}
                {isUserLoggedIn &&<Link
                        
                        to={"wishlist"}
                        className={classNames(
                          ' rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={ 'page'}
                      >
                        <i className="fa-solid fa-heart text-red-400"><span className=" text-[8px] relative bottom-2">{wishCount}</span></i>
                      </Link>}
              
                {isUserLoggedIn &&<Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                          <Link
                            to="cart"
                            className= 'focus:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                          >
                            Cart <span className="ms-3 border rounded px-2 border-[#0fc80f]" >{cartCount}</span>
                          </Link>
                      
                      </MenuItem>
                      <MenuItem>
                          <Link
                            to="wishlist"
                            className= 'focus:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                          >
                            Wish List <span className="ms-3 border rounded px-2 border-red-500" >{wishCount}</span>
                          </Link>
                      
                      </MenuItem>
                      <MenuItem>
                          <Link
                            to="allorders"
                            className= 'focus:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                          >
                          Orders 
                          </Link>
                      
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                          onClick={logOut}
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-start')}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>}
                
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  as="a"
                  to={item.href}
                  className={classNames(
                    'text-gray-500 ','hover:text-gray-900',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
    </>

}
