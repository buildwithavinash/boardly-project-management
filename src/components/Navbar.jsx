import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { logout, role } = useAuth()
    const { pathname } = useLocation()

    const navLinks = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/projects', label: 'Projects' },
        ...(role === 'admin' ? [{ to: '/create', label: 'Create Project' }] : [])
    ]

    return (
        <nav className="border-b border-slate-200 bg-white fixed top-0 left-0 right-0">
            <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/dashboard" className="font-bold text-indigo-600 text-xl">
                    Boardly
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-6 items-center">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <Link 
                                to={link.to}
                                className={pathname === link.to 
                                    ? 'text-indigo-600 font-semibold' 
                                    : 'text-slate-600 hover:text-indigo-600 transition-colors'}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button 
                            onClick={logout}
                            className="text-slate-600 hover:text-red-500 transition-colors"
                        >
                            Logout
                        </button>
                    </li>
                </ul>

                {/* Hamburger - Mobile */}
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="md:hidden text-slate-600"
                >
                    <RxHamburgerMenu size={22}/>
                </button>
            </div>

            {/* Backdrop */}
            <div 
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 md:hidden
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Mobile Drawer */}
            <div className={`fixed bg-white z-20 h-screen w-[75%] max-w-xs top-0 right-0 px-4 pt-4 shadow-xl transition-transform duration-300 ease-in-out md:hidden
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-indigo-600 text-xl">Boardly</span>
                    <button onClick={() => setIsOpen(false)} className="text-slate-500">
                        ✕
                    </button>
                </div>

                <ul className="flex flex-col gap-4">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <Link 
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`block py-2 px-3 rounded-md ${pathname === link.to 
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                    : 'text-slate-600'}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button 
                            onClick={logout}
                            className="w-full text-left py-2 px-3 text-red-500 rounded-md hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar