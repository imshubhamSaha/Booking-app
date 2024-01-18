"use strict";
const $ = (query) => document.querySelector(query);

const form = $("#addForm");
const message = $("#displayAlert");
const userName = $("#username");
const userContact = $("#usercontact");
const userEmail = $("#useremail");
const usersContainer = $("#usersCard");
const formContainer = $("#mainCard");
const usersList = $("#users");
const key = "bookingdata";
const URL = `https://crudcrud.com/api/2b7b9cecdceb4ec08f122292834456a3/${key}`;

/////////////////////////////////////////Functions////////////////////////////////////////////////
///////////////////////////Utility functions//////////////////////////////

const getRequest = () => axios.get("http://localhost:3000/user/get-users");
const postRequest = (load) => axios.post("http://localhost:3000/user/add-user", load);
const deleteRequest = (id) => axios.post(`http://localhost:3000/user/delete-user}`);

//reject a network call
const rejectCall = function () {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request took too long")), 10000);
  });
};

// Message
const MESSAGE = function (msg, clremove, cladd, element = message) {
  element.innerHTML = `${msg}`;
  element.classList.remove(clremove);
  element.classList.add(cladd);
  setTimeout(() => {
    element.classList.add(clremove);
    element.classList.remove(cladd);
  }, 2000);
};

//Check for field errors
const util = async function (formData) {
  if (formData.username === "") {
    throw new Error("Please enter Username");
  } else if (formData.usercontact.toString().length !== 10) {
    throw new Error("Please enter Valid Contact Number");
  } else if (!formData.useremail.includes("@")) {
    throw new Error("Please Enter Valid E-Mail");
  }
};

// default form data
const defaultFormData = function () {
  userName.value = "";
  userContact.value = "";
  userEmail.value = "";
};

//Container Hide/unhide
const displayContainer = function (task, element = usersContainer) {
  if (task === "remove") element.classList.remove("d-none");
  else if (task === "add") element.classList.add("d-none");
};

//ShowonUi
const ShowOnUi = function (userData) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.classList.add("mb-2");
  li.classList.add("border-1");
  li.classList.add("border-dark-subtle");
  li.classList.add("rounded");
  li.id = userData.id;
  const html = `
    <div><strong>User Name : </strong>${userData.username}</div>
    <div><strong>User Contact : </strong>${userData.usercontact}</div>
    <div><strong>User E-Mail : </strong>${userData.useremail}</div>
    <div class="d-grid gap-2 mt-2 d-md-flex justify-content-md-end">
      <form action=/user/delete-product method=Post>
      <input type=hidden value=${userData.id} name=userID>
      <button class="btn btn-outline-danger delete btn-sm" type="button">Delete</button>
      </form>
    </div>
  `;

  li.insertAdjacentHTML("afterbegin", html);
  // Append li to list
  usersList.appendChild(li);
};

/// Initial for every loading
const init = async function (key) {
  try {
    const Msg = "you don't have any Data";
    const dataBase = await Promise.race([getRequest(), rejectCall()]);
    console.log(dataBase)
    if (dataBase?.data.length === 0) {
      throw new Error(Msg);
    } else {
      dataBase.data.allUsers.forEach((item) => ShowOnUi(item));
    }
    displayContainer("remove");

    MESSAGE("Database Data are displayed in UI", "d-none", "alert-success");
  } catch (error) {
    MESSAGE(error.message, "d-none", "alert-danger");
  }
};

////////////////////////////////////////CallBack Functions for event callback function ///////////////////////////
// Adding new data
const addNewData = async function (userData) {
  try {
    await util(userData);
    const response = await Promise.race([postRequest(userData), rejectCall()]);
    console.log(response)
    ShowOnUi(response.data.newUserDetails);
    if (usersContainer.childElementCount === 1) 
      displayContainer("remove");
    defaultFormData();
    MESSAGE("Data succesfully added", "d-none", "alert-success");
  } catch (error) {
    MESSAGE(`${error.message}`, "d-none", "alert-danger");
  }
};

// Removing Existing Data
const removeData = async function (li) {
  if (confirm("Are you Sure?")) {
    try {
      const res =await Promise.race([deleteRequest(li.id), rejectCall()]);
      console.log(res)
      usersList.removeChild(li);
      if (usersList.childElementCount === 0) 
        displayContainer("add");
      MESSAGE("Data succesfully deleted", "d-none", "alert-success");
    } catch (error) {
      MESSAGE(`${error.message}`, "d-none", "alert-danger");
    }
  }
};

////////////////////////////////Event CallBack Function/////////////////////////
// Data adding event Callback
const formSubmit = function (e) {
  try {
    e.preventDefault();
    const userData = {
      username: userName.value,
      usercontact: userContact.value,
      useremail: userEmail.value,
    };
    addNewData(userData);
  } catch (error) {
    console.error(error);
  }
};

//Data removing  event Callback
const delBtn = function (e) {
  const li = e.target.parentElement.parentElement;
  removeData(li);
};

//eventListener
form.addEventListener("submit", formSubmit);
usersList.addEventListener("click", delBtn);
window.addEventListener("DOMContentLoaded", init.bind(null, key));
