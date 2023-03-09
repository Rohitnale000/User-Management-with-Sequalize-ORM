<script>
  import UserManagement from "./../userManagement.svelte";
  import Form from "./form.svelte";
  import TableComponent from "./tableComponent.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { createEventDispatcher, onMount } from "svelte";
  $: page = 1;
  let totalRecords = "";
  let availableRecordPerPage = "";
  let displayStatus = "default";
  let pageBlockToShow = "";
  let searchStatus="";
  let userData = [];
  let loading=true
  // let searchValue = "";
 
  let newArray = [];
  

  $: pageNumber = (e) => {
    if (e.detail.message === "next" && page < (totalRecords/8)) {
      page++;
      getData();
    } else if (
      e.detail.message === "prev" &&
      page > 1 &&
      page <= totalRecords
    ) {
      page--;
      getData();
      console.log("prev pressed");
    } else if (e.detail > 0 && e.detail <= totalRecords) {
      page = e.detail;
      getData();
    }
  };


  const getSingleData = async (e) => {
    //console.log(e.detail.searchVal);
    let valueTobeSearch = e.detail.searchVal;
    
    if(valueTobeSearch.trim()===""){
      return 0;
    }
    const res = await fetch(
      `http://localhost:3000/api/user/${valueTobeSearch}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
              }
    );
      
    let dataTobeSearch = await res.json();
    console.log(dataTobeSearch)
    newArray=dataTobeSearch
   
    displayStatus="searchbyuser_email"
  };







  const getData = async () => {
    try {const res = await fetch(
      `http://localhost:3000/api/user/page/limit?page=${page}&limit=8`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );

    const dataFromAPI = await res.json();
    console.log(dataFromAPI);
    userData = dataFromAPI.data1;
    totalRecords = dataFromAPI.totalCount;
    availableRecordPerPage = userData.length;
    pageBlockToShow = Math.ceil(totalRecords / 8);
    console.log(pageBlockToShow);
  }catch(e){
    console.log(e);
  }
}
  console.log(userData);

  const addUser = () => {
    displayStatus = "addClicked";
  };

  const navigateToHome = () => {
    displayStatus = "homeClicked";
  };
  
  //post Data
  const doPost = async (e) => {
    console.log(e.detail.user_date_of_birth);
    let userDetailObj = e.detail;

    if (
      e.detail.user_fname.trim() === "" ||
      e.detail.user_lname.trim() === "" ||
      e.detail.user_email.trim() === "" ||
      e.detail.user_password.trim() === "" ||
      e.detail.user_date_of_birth.trim() === "" ||
      e.detail.address.trim() === ""
    ) {
      // toast.error("Please fill input with valid details", {
      //   position: "bottom-center",
      // });
      return;
    } else {
      if (
        !e.detail.user_email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        // toast.error("Please enter valid user_email address", {
        //   position: "bottom-center",
        //   style: "border: 1px solid #713200; padding: 20px;",
        // });
        return;
      } else if (e.detail.user_password !== e.detail.confirmpassword) {
        return;
      } else {
        displayStatus = "formSubmit";
        toast.success(
          userDetailObj.user_fname + " " + "you have Successfully register!"
        );
        userData = userData.concat(userDetailObj);

        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_fname: userDetailObj.user_fname,
            user_mname: userDetailObj.user_mname,
            user_lname: userDetailObj.user_lname,
            user_gender: userDetailObj.user_gender,
            user_date_of_birth: userDetailObj.user_date_of_birth,
            user_email: userDetailObj.user_email,
            user_password: userDetailObj.user_password,
            address: userDetailObj.address,
            street: userDetailObj.street,
            landmark: userDetailObj.landmark,
            user_state: userDetailObj.user_state,
            city: userDetailObj.city,
            user_username:userDetailObj.user_email,
            pincode: userDetailObj.pincode,
          }),
        });
      
         return (await res).text();
      }
    }
  };

  let editUserData;
  const displayForm = (e) => {
    console.log(e.detail);
    displayStatus = "updateDataForm";
    editUserData = e.detail;
    
  };

  const handleUserUpdateDetail = (e) => {
    console.log(e.detail);
    if (
      e.detail.user_fname.trim() === "" ||
      e.detail.user_lname.trim() === "" ||
      e.detail.user_email.trim() === "" ||
      e.detail.user_password.trim() === "" ||
      e.detail.user_date_of_birth.trim() === "" ||
      e.detail.address.trim() === ""
    ) {
      toast.error("Please fill input with valid details", {
        position: "bottom-center",
      });
      return;
    } else {
      if (
        !e.detail.user_email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        toast.error("Please enter valid user_email address", {
          position: "bottom-center",
          style: "border: 1px solid #713200; padding: 20px;",
        });
        return;
      } else if (e.detail.user_password !== e.detail.confirmpassword) {
        return;
      } else if (
        !e.detail.user_password.match(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        )
      ) {
        return;
      } else {
        displayStatus = "updateDataShow";

        toast.success("Data updated successfully...", {
          style: "border: 1px solid #713200; padding: 16px; color: #713200;",
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });

        {
          fetch(`http://localhost:3000/api/user/`+ e.detail.user_id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_fname: e.detail.user_fname,
              user_mname: e.detail.user_mname,
              user_lname: e.detail.user_lname,
              user_gender: e.detail.user_gender,
              user_date_of_birth: e.detail.user_date_of_birth,
              user_email: e.detail.user_email,
              user_password: e.detail.user_password,
              address: e.detail.address,
              street: e.detail.street,
              landmark: e.detail.landmark,
              user_state: e.detail.user_state,
              city: e.detail.city,
              user_username:e.detail.user_email,
              pincode: e.detail.pincode,
            }),
          })
            .then((response) => response.json())
            .then((result) => console.log(result));
        }
      }
    }
  };

  const handleUserDelete = (e) => {
    displayStatus = "formSubmit";
    toast.error("User deleted successfully...");
    console.log(e.detail);

    let index = userData.findIndex((res) => res.user_id === e.detail);
    let user = userData[index];
    userData.splice(index, 1);
    userData = userData;
    fetch(`http://localhost:3000/api/user/` + e.detail, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((result) => console.log(result));
  };



</script>

<Toaster />


<div class="table-title">
  <div class="row">
    <div class="col-sm-5">
      <h2>User <b>Management</b></h2>
    </div>
    <div class="col-sm-7">
      <a href="#" class="btn btn-secondary"
        ><i class="material-icons">&#xE147;</i>
        <span on:click={addUser}>Add New User</span></a
      >
      <a href="#" class="btn btn-secondary"
        ><i class="material-icons">&#xE24D;</i>
        <span on:click={navigateToHome}>Home</span></a
      >
     
      <!-- <button type="submit" on:click={searchFunction}>search</button> -->
    </div>
  </div>
</div>

{#if displayStatus === "addClicked" || displayStatus === "updateDataForm"}
  <!-- <Form  on:userObject={doPost}/>
{:else if displayStatus==="updateDataForm"}/> -->
  <Form
    on:onUpdate={handleUserUpdateDetail}
    on:userObject={doPost}
    {editUserData}
    {displayStatus}
    {userData}
  />
{:else if displayStatus === "formSubmit" || displayStatus === "default" || displayStatus === "updateDataShow" || displayStatus === "homeClicked"}
  <TableComponent
    on:userDelete={handleUserDelete}
    on:userUpdate={displayForm}
    {getData}
    {availableRecordPerPage}
    {userData}
    {totalRecords}
    {pageBlockToShow}
    on:page={pageNumber}
    on:prev={pageNumber}
    on:next={pageNumber}
    on:getSingleData={getSingleData}
    {page}
  />
  {:else if displayStatus==="searchbyuser_email"}
  <TableComponent
  on:userDelete={handleUserDelete}
  on:userUpdate={displayForm}
  getData={getSingleData}
  {availableRecordPerPage}
  userData={newArray}
  {totalRecords}
  {pageBlockToShow}
  on:page={pageNumber}
  on:prev={pageNumber}
  on:next={pageNumber}
 {page}
/>
  

{/if}

<style>
  .table-title {
    background: #299be4;
    color: #fff;
    padding: 16px 30px;
    margin: 0px 0px 0px;
    border-radius: 3px 3px 0 0;
  }
  .table-title h2 {
    margin: 2px 0 0;
    font-size: 24px;
  }
  .table-title .btn {
    color: #566787;
    float: right;
    font-size: 13px;
    background: #fff;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
  }
  .table-title .btn:hover,
  .table-title .btn:focus {
    color: #566787;
    background: #f2f2f2;
  }
  .table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
  }
  .table-title .btn span {
    float: left;
    margin-top: 2px;
  }
 
</style>
