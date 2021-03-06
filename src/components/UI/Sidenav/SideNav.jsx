import React,{useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useCompanyDetails } from '../../../Hooks/Company';


const SideNav = () => {

    const [company, setCompany] = useState(null)
    const [hrAccount, sethrAccount] = useState(null)
    const { data } = useCompanyDetails(company?.company._id)
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        setCompany(JSON.parse(localStorage.getItem('company')))
        sethrAccount(JSON.parse(localStorage.getItem('hrData')))
    }, [])

    const logout = async() => {
        sethrAccount(null)
        setCompany(null)
        await localStorage.removeItem('company')
        await localStorage.removeItem('hrData')
        console.log("wow" , company);
        history.push('/')
    }
    

    return (
        <div>
            <div className="h-screen w-64 bg-white border-r-2 flex flex-col justify-between items-center sticky top-0">
            <Link to="/" className="font-semibold text-xl mt-4">JobsWay.</Link>

            <div className="flex items-start justify-start h-auto flex-col mx-16 ">
                <Link to="/" href="" className="nav-items flex my-3 items-center justify-start">
                    <Icon icon="akar-icons:home" className="mr-3 text-xl" />
                    <p className="text-lg font-light">Dashboard</p>
                </Link>
                <Link to={company ? `/company/jobs` : `/jobs`} href="" className="nav-items flex my-3 items-center justify-start">
                    <Icon className="mr-3 text-xl" icon="akar-icons:credit-card" />
                    <p className="text-lg font-light">Jobs</p>
                </Link>
                {!company && <><Link to="/applications" href="" className="nav-items flex my-3 items-center justify-start">
                    <Icon className="mr-3 text-xl" icon="simple-line-icons:doc" />
                    <p className="text-lg font-light">Applications</p>
                </Link>
                <Link to="/shortlist" href="" className="nav-items flex my-3 items-center justify-start">
                    <Icon className="mr-3 text-xl" icon="carbon:list-boxes" />
                    <p className="text-lg font-light">Shortlist</p>
                </Link></>}
                { company && <><Link to="/hr-management" href="" className="nav-items flex my-3 items-center justify-start">
                    <Icon className="mr-3 text-xl" icon="la:users-cog" />
                    <p className="text-lg font-light">Hr Manage</p>
                </Link></> }
                {company && <Link to="/profile" href="" className="nav-items flex my-3 items-center justify-start">
                    <Icon className="mr-3 text-xl" icon="iconoir:profile-circled" />
                    <p className="text-lg font-light">Profile</p>
                </Link>}
                <Link to="/" href="" className="nav-items flex my-3 items-center justify-start" onClick={logout}>
                    <Icon className="mr-3 text-xl" icon="simple-line-icons:logout" />
                    <p className="text-lg font-light">Logout</p>
                </Link>
            </div>
            <div className="flex items-center flex-col">
            <div className="w-20 h-20 rounded-md">
                <img src={data?.data.company.imgUrl} alt="" className="rounded-md"/>
            </div>
            <h4 className="mb-6 mt-4 font-semibold">{data?.data.company.companyName}</h4>
            </div>
        </div>
        </div>
    )
}

export default SideNav
