<script>
  import { Confirm } from "svelte-confirm";
  import TableComponent from "./tableComponent.svelte";
  import NavigationBar from "./navigationBar.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  export let editUserData;
  export let displayStatus;

  const DateFormat = (date) => {
    var d = new Date(date);
    let dateResult =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return dateResult;
  };

  let userDetailObj = {
    user_fname: "",
    user_mname: "",
    user_lname: "",
    user_email: "",
    user_password: "",
    confirmpassword: "",
    user_gender: "",
    user_date_of_birth: "",
    address: "",
    street: "",
    landmark: "",
    user_state: "",
    city: "",
    pincode: "",
  };

  if (displayStatus === "updateDataForm") {
    userDetailObj = editUserData = {
      user_id: editUserData.user_id,
      user_fname: editUserData.user_fname,
      user_mname: editUserData.user_mname,
      user_lname: editUserData.user_lname,
      user_gender: editUserData.user_gender,
      user_date_of_birth: DateFormat(editUserData.user_date_of_birth),
      user_email: editUserData.user_email,
      user_password: editUserData.user_password,
      confirmpassword: editUserData.user_password,
      address: editUserData.address,
      street: editUserData.street,
      landmark: editUserData.landmark,
      user_state: editUserData.user_state,
      city: editUserData.city,
      pincode: editUserData.pincode,
    };
  } else {
    userDetailObj;
  }

  let errors = {
    user_fname: "",
    user_mname: "",
    user_lname: "",
    user_email: "",
    user_password: "",
    confirmpassword: "",
    user_gender: "",
    user_date_of_birth: "",
    address: "",
    street: "",
    landmark: "",
    user_state: "",
    city: "",
    pincode: "",
  };
  let valid = false;
  const submitButtonACtion = () => {
    valid = true;
    if (
      !userDetailObj.user_fname.match(/^[a-zA-Z]+$/) ||
      userDetailObj.user_fname.trim().length < 1
    ) {
      valid = false;
      errors.user_fname = "First name should have at least 1 character";
    } else {
      // valid = true
      errors.user_fname = "";
    }

    if (
      !userDetailObj.user_lname.match(/^[a-zA-Z]+$/) ||
      userDetailObj.user_lname.trim().length < 1
    ) {
      valid = false;
      errors.user_lname = "Last name should have at least 1 character";
    } else {
      // valid = true
      errors.user_lname = "";
    }

    if (
      !userDetailObj.user_email.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      )
    ) {
      valid = false;
      errors.user_email = "Enter valid user_email address";
    } else {
      // valid = true
      errors.user_email = "";
    }

    if (
      !userDetailObj.user_password.match(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      )
    ) {
      valid = false;
      errors.user_password =
        "password should have at least one capital small and special letter";
    } else {
      // valid = true
      errors.user_password = "";
    }

    if (userDetailObj.user_password !== userDetailObj.confirmpassword) {
      valid = false;
      errors.confirmpassword = "password and confirm-password are not match";
    } else {
      //  valid = true
      errors.confirmpassword = "";
    }

    var option = document.getElementsByName("user_gender");
    if (
      option[0].checked == "" &&
      option[1].checked == "" &&
      option[2].checked == ""
    ) {
      errors.user_gender = "Please Select Your user_gender";
      valid = false;
    } else {
      errors.user_gender = "";
    }

    if (
      userDetailObj.address.match(/[^a-zA-Z0-9]/) ||
      userDetailObj.address.trim().length < 1
    ) {
      valid = false;
      errors.address = "Enter valid apartment no or name";
    } else {
      errors.address = "";
    }

    if (
      userDetailObj.street.trim().length < 1
    ) {
      valid = false;
      errors.street = "Enter valid street name or Locality";
    } else {
      errors.street = "";
    }

    if (userDetailObj.landmark.trim().length < 1) {
      valid = false;
      errors.landmark = "Enter valid landmark";
    } else {
      errors.landmark = "";
    }

    if (userDetailObj.user_state.trim().length < 1) {
      valid = false;
      errors.user_state = "Enter valid user_state";
    } else {
      errors.user_state = "";
    }

    if (
      !userDetailObj.city.match(/^[a-zA-Z]+$/) ||
      userDetailObj.city.trim().length < 1
    ) {
      valid = false;
      errors.city = "Enter valid city name";
    } else {
      errors.city = "";
    }

    if (
      isNaN(userDetailObj.pincode) ||
      userDetailObj.pincode.toString().length !== 6
    ) {
      valid = false;
      errors.pincode = "Enter valid pincode";
      return 0;
    } else {
      errors.pincode = "";
    }

    if (valid) {
      if (displayStatus === "updateDataForm") {
        dispatch("onUpdate", userDetailObj);
      }
      else {
      dispatch("userObject", userDetailObj);
    }
    }else{
    console.log("error in validation");
      
    } 
  };
</script>

<Toaster />

<h3>Registration</h3>
<div class="container col-8" id="mainContainer">
  <div class="form-row ">
    <div class="form-group col-md-6 font-weight-bold">
      <label for="" class="allFormLebeal">First Name <span>*</span></label>
      <input
        bind:value={userDetailObj.user_fname}
        type="text"
        placeholder="Enter First Name"
        class="form-control"
      />
      <span class="error">{errors.user_fname}</span>
    </div>

    <div class="form-group col-md-6 font-weight-bold">
      <label for="" class="allFormLebeal">Middle Name</label>
      <input
        bind:value={userDetailObj.user_mname}
        class="form-control"
        type="text"
        placeholder="Enter Middle Name"
      />
    </div>
  </div>

  <div class="form-row ">
    <div class="form-group col-md-6 font-weight-bold">
      <label for="" class="allFormLebeal">Last Name <span>*</span></label>
      <input
        bind:value={userDetailObj.user_lname}
        class="form-control"
        type="text"
        placeholder="Enter Last Name"
      />
      <span class="error">{errors.user_lname}</span>
    </div>
    <div class="form-group col-md-6 font-weight-bold">
      <label for="" class="allFormLebeal">Email<span>*</span></label>
      <input
        bind:value={userDetailObj.user_email}
        type="user_email"
        class="form-control"
        id="exampleInputuser_email1"
        aria-describedby="user_emailHelp"
        placeholder="Enter user_email"
      />
      <span class="error">{errors.user_email}</span>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6 font-weight-bold">
      <label for="" class="allFormLebeal">password <span>*</span></label>
      <input
        bind:value={userDetailObj.user_password}
        type="password"
        class="form-control"
        id="exampleInputpassword1"
        placeholder="password"
      />
      <span class="error">{errors.user_password}</span>
    </div>
    <div class="form-group col-md-6 font-weight-bold">
      <label for="" class="allFormLebeal">Confirm-password <span>*</span></label
      >
      <input
        bind:value={userDetailObj.confirmpassword}
        type="password"
        class="form-control"
        id="examldldldj"
        placeholder="Confirm-password"
      />
      <span class="error">{errors.confirmpassword}</span>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6 font-weight-bold">
      <label for="user_gender">Gender<span class="req">*</span></label>

      <input
        type="radio"
        value="Male"
        name="user_gender"
        bind:group={userDetailObj.user_gender}
        on:blur={submitButtonACtion}
        id="check"
      />
      Male
      <input
        type="radio"
        value="Female"
        name="user_gender"
        bind:group={userDetailObj.user_gender}
        on:blur={submitButtonACtion}
        id="check1"
      />
      Female
      <input
        type="radio"
        value="Other"
        name="user_gender"
        bind:group={userDetailObj.user_gender}
        on:blur={submitButtonACtion}
        id="check3"
      />
      Other <br />
      <span class="error">{errors.user_gender}</span>
    </div>

    <div class="form-group col-md-6 font-weight-bold">
      <label for="user_date_of_birth" class="allFormLebeal"
        >Date of Birth <span>*</span></label
      >
      <input
        type="text"
        class="form-control"
        name="user_date_of_birth"
        id="user_date_of_birth"
        placeholder="Select Date"
        onfocus="(this.type='date')"
        min="1990-01-01"
        max="2005-12-31"
        bind:value={userDetailObj.user_date_of_birth}
      />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">Address <span>*</span></label>
      <input
        bind:value={userDetailObj.address}
        class="form-control"
        type="text"
        placeholder="Enter Apartment Name/NO"
      />
      <span class="error">{errors.address}</span>
    </div>
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal"
        >Street Name or Locality <span>*</span></label
      >
      <input
        bind:value={userDetailObj.street}
        class="form-control"
        type="text"
        placeholder="Enter street name or locality"
      />
      <span class="error">{errors.street}</span>
    </div>
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">Landmark <span>*</span></label>
      <input
        bind:value={userDetailObj.landmark}
        class="form-control"
        type="text"
        placeholder="Enter Landmark"
      />
      <span class="error">{errors.landmark}</span>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">State <span>*</span></label>

      <select
        type="text"
        class="form-control"
        id="user_state"
        placeholder="Mumabai Maharashtra"
        bind:value={userDetailObj.user_state}
      >
        <option value="" disabled selected>Select your State</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Andaman and Nicobar Islands"
          >Andaman and Nicobar Islands</option
        >
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
        <option value="Daman and Diu">Daman and Diu</option>
        <option value="Delhi">Delhi</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Puducherry">Puducherry</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
      </select>
      <span class="error">{errors.user_state}</span>
    </div>
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">City <span>*</span></label>
      <input
        type="text"
        class="form-control"
        id="user_state"
        placeholder="Mumabai Maharashtra"
        bind:value={userDetailObj.city}
      />
      <span class="error">{errors.city}</span>
    </div>
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">pincode <span>*</span></label>
      <input
        bind:value={userDetailObj.pincode}
        class="form-control"
        type="text"
        placeholder="Enter pin code"
      />
      <span class="error">{errors.pincode}</span>
    </div>
  </div>

  <button
    type="submit"
    class="btn btn-primary btn-lg"
    on:click={submitButtonACtion}>Submit</button
  >
</div>

<style>
  .allFormLebeal {
    font-weight: bold;
    font-size: 15px;
  }

  h3 {
    text-align: center;
    margin: 15px;
  }
  span {
    color: red;
  }
</style>
