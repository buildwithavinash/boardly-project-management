/* 
    User opens this page
    Sees a form with name, email, password, role(dropdown) field..
    the states are going to be name, email, password, role but instead of making so many state we can use a master object to collect all in one.. 
    then on submit, the whole data is sent as an object to supbase.. 
*/

import { useState } from "react"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin'
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({...formData, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        setFormData({
            name: '',
        email: '',
        password: '',
        role: 'admin'
        })
    }
  return (
    <div className="p-4">
        <div>
            <h2 className="text-3xl font-semibold">Signup</h2>

            <form onSubmit={handleSubmit} className="border border-slate-300 flex flex-col items-center justify-center gap-4 p-8 rounded-md mt-8">

                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border border-slate-300 px-4 py-2 rounded-md" />

                <input type="email" name="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} className="border border-slate-300 px-4 py-2 rounded-md" />

                <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} className="border border-slate-300 px-4 py-2 rounded-md" />

                <div>
                    <label htmlFor="">Signup as : </label>
                    <select name="role" value={formData.role} onChange={handleChange} className="border border-slate-300 rounded-md px-2 py-1">
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>
                </div>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup