import React, { useEffect, useState } from "react";
import { useCompanyDetails } from "../../Hooks/Company";
import { useAppliedUsers } from "../../Hooks/user";
import PageHeader from "../UI/Items/PageHeader";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import SideNav from "../UI/Sidenav/SideNav";
import AppCardWithButtons from "./AppCardWithButtons";


const Applications = () => {

    const [hr, setHrAccount] = useState(
        JSON.parse(localStorage.getItem("hrData"))
      );

      const [loading, setLoading] = useState(false)
      
      const { data : appliedUsers  , isLoading , error  } = useAppliedUsers(hr?.hrDetails?._id) 


      console.log(appliedUsers?.data);

    return (
        <div>
            <div className="flex">
        <SideNav />
        <div className="w-full">
          <PageHeader
            name={hr?.hrDetails?.name}
            desc="Welcome Back!"
          />
          <div className="mt-12 px-8 container w-full">
              <h5 className="text-xl font-semibold text-dark mb-8 text-primary">
                Applications :
              </h5>
              {
                !loading ? <> { !appliedUsers?.data.length == 0 ? <>
                
                {
                  appliedUsers?.data.map((user) => (
                    <AppCardWithButtons user={user}/>
                  ))
                }
                
                </> : <p className="texxt-danger">No Applied Users Found</p> } </> : <LoadingSpinner />
              }
          </div>
        </div>
      </div>
        </div>
    )
}

export default Applications
