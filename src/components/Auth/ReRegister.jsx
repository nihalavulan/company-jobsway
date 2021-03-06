import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import noImage from "../../assets/images/noImage.jpg";
import Axios from "axios";
import { RegisterCompany, ReRegisterCompany } from "../../Hooks/Auth";
import toast from "react-hot-toast";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Logo from "../UI/Logo/Logo";
import ImageInput from "../UI/ImageInput/ImageInput";

const initialState = {
  companyName: "",
  industry: "",
  email: "",
  location: "",
  phone: "",
  bio: "",
  website: "",
  linkedIn: "",
  facebook: "",
  twitter: "",
  instagram: "",
  password: "",
  confirmPassword: "",
};

const ReRegister = () => {
    const [company, setCompany] = useState(JSON.parse(localStorage.getItem('company')))
    const [loading, setLoading] = useState(false)
    const [formData, setformData] = useState(initialState);
    const [formErr, setFormErr] = useState(null);
    const {mutate:reregisterCompany , isLoading } = ReRegisterCompany()
    const history = useHistory();
    const [image, setImage] = useState(null);

  useEffect(() => {
    if (company) setformData(company.company)
},[])

  const handleChange = (e) => {
    e.preventDefault();
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormErr("");
  }, [formData]);

  if (isLoading || loading) {
    return (
      <LoadingSpinner />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) return setFormErr("Phone number invalid.");

    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_NAME);

    setLoading(true)
    Axios.post(
      `${process.env.REACT_APP_CLOUDINARY_BASE_URL}/image/upload`,
      imageData
    )
      .then(({ data }) => {
        setLoading(false)
        formData.imgUrl = data.url;
        var id = company.company._id
        reregisterCompany({formData,id});
      })
      .catch((err) => {
        setLoading(false)
        console.log("Image upload Err :", err);
      });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <Logo />
      <div className="flex flex-col items-center py-8">
        <div className="container max-w-screen-md px-5 w-full">
          <h3 className="text-3xl font-semibold mt-8 text-center">
            Register Your <span className="text-primary">Company</span>
          </h3>
          <form
            action=""
            className="flex flex-col items-start"
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <h6 className="mt-4 font-normal">Basic Details :</h6>
            <p className="font-light text-secondary text-sm">
              Enter the details of company
            </p>
            <div className="mt-3 flex justify-between w-full ">
              <input
                required
                onChange={handleChange}
                value={formData.companyName}
                name="companyName"
                type="text"
                placeholder="Company Name"
                className="mr-0.5 text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
              />
              <input
                required
                onChange={handleChange}
                value={formData.industry}
                name="industry"
                type="text"
                placeholder="Indutsry"
                className="ml-0.5  text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
              />
            </div>
            <input
              required
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email"
              className="mt-3 ml-0.5 text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
            />
            <div className="mt-3 flex justify-between w-full ">
              <input
                required
                onChange={handleChange}
              value={formData.location}
                name="location"
                type="text"
                placeholder="Location"
                className="mr-0.5 text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
              />
              <input
                required
                onChange={handleChange}
              value={formData.phone}
                name="phone"
                type="text"
                placeholder="Phone"
                className="ml-0.5 text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
              />
            </div>
            <textarea
              onChange={handleChange}
              value={formData.bio}
              name="bio"
              placeholder="About your Company"
              className="text-sm font-light bg-secondary w-full mt-3 rounded-md h-40 border-none outline-none p-3 "
            />
            <div className="w-full h-40 flex items-center flex-col">

              <div className="w-full h-40 flex items-center flex-col mt-8">

              <img src={image ? image : formData.logoUrl} alt="no image" className="w-40 h-40 rounded-md"/>

              <ImageInput setImage={setImage}/>
              </div>
              </div>
            <h6 className="mt-28 font-normal">Connect Social Media : </h6>
            <p className="font-light text-secondary text-sm">
              Input the links your accounts
            </p>
            <div className="mt-3 flex justify-between w-full ">
              <div className="mt-1 flex rounded-md shadow-sm w-full mr-1">
                <span class="inline-flex items-center px-3 rounded-l-md bg-dark  border-r-0 border-0 text-white text-sm w-44">
                  Website link
                </span>
                <input
                  onChange={handleChange}
                  name="website"
              value={formData.website}
                  type="text"
                  placeholder="Link to Your Website"
                  className="text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-between w-full ">
              <div className="mt-1 flex rounded-md shadow-sm w-full mr-1">
                <span class="inline-flex items-center px-3 rounded-l-md bg-dark  border-r-0 border-0 text-white text-sm">
                  linkedin.com/
                </span>
                <input
                  onChange={handleChange}
                  value={formData.linkedIn}
                  name="linkedIn"
                  type="text"
                  placeholder="Username"
                  className="text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
                />
              </div>
              <div className="mt-1 flex rounded-md shadow-sm w-full ml-1">
                <span class="inline-flex items-center px-3 rounded-l-md bg-dark  border-r-0 border-0 text-white text-sm">
                  twitter.com/
                </span>
                <input
                  onChange={handleChange}
              value={formData.twitter}

                  name="twitter"
                  type="text"
                  placeholder="Username"
                  className="ml-0.5 text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-between w-full ">
              <div className="mt-1 flex rounded-md shadow-sm w-full mr-1">
                <span class="inline-flex items-center px-3 rounded-l-md bg-dark  border-r-0 border-0 text-white text-sm">
                  facebook.com/
                </span>
                <input
                  onChange={handleChange}
              value={formData.facebook}
                  
                  name="facebook"
                  type="text"
                  placeholder="Username"
                  className="text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
                />
              </div>
              <div className="mt-1 flex rounded-md shadow-sm w-full ml-1">
                <span class="inline-flex items-center px-3 rounded-l-md bg-dark  border-r-0 border-0 text-white text-sm">
                  instagram.com/
                </span>
                <input
                  onChange={handleChange}
                  value={formData.instagram}
                  name="instagram"
                  type="text"
                  placeholder="Username"
                  className="ml-0.5 text-sm w-full h-14 rounded-md font-light border-none outline-none p-3 bg-secondary"
                />
              </div>
            </div>
            {formErr && (
              <p className="font-md mt-1" style={{ color: "red" }}>
                {formErr}
              </p>
            )}

            <div className="flex items-center justify-center w-full h-full">
              <button
                className="w-1/2 rounded-md my-5 bg-primary p-1 h-10"
                type="submit"
                style={{ color: "#fff" }}
              >
                Register Your Company
              </button>
            </div>
            <div className="text-center w-full">
              <p className="my-2 text-sm font-light ">
                Already on JobsWay?
                <Link
                  to="/login"
                  style={{ color: "#008FAE" }}
                  className="underline "
                >
                  Log in now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReRegister;
