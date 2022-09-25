import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  get,
  getDatabase,
  ref,
  set,
  child,
  remove,
  update,
  push,
  DataSnapshot,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Switch from "@mui/material/Switch";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faPlus,
  faNoteSticky,
  faXmark,
  faClipboard,
  faMinus,
  faNotesMedical,
  faEdit,
  faCheckSquare,
  faArrowTrendUp,
  faGear,
  faBars,
  faArrowTrendDown,
  faMoneyBillTrendUp,
  faRightFromBracket,
  faArrowsRotate,

} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import {
  faSquare,
  faSquareCheck,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import id from "date-fns/esm/locale/id/index.js";
import { isToday } from "date-fns";
import { Avatar, Checkbox } from "@mui/material";
import { icon } from "@fortawesome/fontawesome-svg-core";
const firebaseConfig = {
  apiKey: "AIzaSyDHYfTyCjQctCJqg3qH2OzWTaa4ebmMGm8",
  authDomain: "workflow-test-d418a.firebaseapp.com",
  projectId: "workflow-test-d418a",
  storageBucket: "workflow-test-d418a.appspot.com",
  messagingSenderId: "664572215219",
  appId: "1:664572215219:web:93445f5accc430cef8d5c6",
  measurementId: "G-ZPFR4LM339",
  databaseURL:
    "https://workflow-test-d418a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const provider = new GoogleAuthProvider();

function App() {
  const [notesid, setNotesid] = useState();
  const [notesname, setNotesname] = useState();
  const [notescontent, setNotescontent] = useState();
  const [todoname, setTodoname] = useState();
  const [eventname, setEventname] = useState();
  const [eventid, setEventid] = useState();
  const [remindname, setRemindname] = useState();
  const [remindid, setRemindid] = useState();
  const [todoid, setTodoid] = useState();
  const [notifytime, setNotifytime] = useState();
  const [editeventtime, setEditeventtime] = useState(false);
  let text = Date().toString().slice(16, 24);
  const [eventtime, setEventtime] = useState(text);
  const [remindtime, setRemindtime] = useState(text);
  const [editremindtime, setEditremindtime] = useState(false);
  const [value, setValue] = useState(Date().toString().slice(0, 15));
  const [time, setTime] = useState(Date());
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [disable,setDisable]=useState(false);


  useEffect(() => {
    if (localStorage.id !== undefined) {
      setUser({
        userid: localStorage.id,
        name: localStorage.username,
        email: localStorage.Email,
        pic: localStorage.pic,
      });
      //console.log(user.userid);
      SelectMoney();
    }
  }, []);

  function SelectData(value) {
    var shower = document.getElementById("shower");
    shower.innerText = " ";
    const dbref = ref(db);
    get(child(dbref, "users/" + user.userid + "/" + value))
      .then((snapshot) => {
        if (snapshot.val().todo) {
          var length = Object.keys(snapshot.val().todo).length;
          //console.log(length);

          for (let i = 0; i < length; i++) {
            var path = Object.keys(snapshot.val().todo)[i];
            //console.log(path);
            const dbref = ref(db);
            get(
              child(
                dbref,
                "users/" + user.userid + "/" + value + "/todo/" + path
              )
            )
              .then((snapshot) => {
                const h1 = document.createElement("div");
                const p=document.createElement('p')
                const text = document.createElement("h1");
                const butt = document.createElement("button");
                const icons = document.createElement("p");
                const editicon = document.createElement("p");
                const deleteicon = document.createElement("p");
                
                deleteicon.onclick = () => {
                  setTodoname(snapshot.val().name);
                  setTodoid(snapshot.key);
                  let delete_todo = document.getElementById("delete-todo");
                  if (delete_todo.style.display === "block") {
                    delete_todo.style.display = "none";
                  } else {
                    //console.log("showing edit menu");
                    delete_todo.style.display = "block";
                  }
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                };

                editicon.onclick = () => {
                  setTodoname(snapshot.val().name);
                  setTodoid(snapshot.key);
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                  let edit_todo = document.getElementById("edit-todo");
                  if (edit_todo.style.display === "block") {
                    edit_todo.style.display = "none";
                  } else {
                    //console.log("showing edit menu");
                    edit_todo.style.display = "block";
                  }
                };
                icons.classList = "text-left w-auto flex";

                deleteicon.innerHTML = `<svg aria-labelledby="svg-inline--fa-title-NHFNik9Cbe12" data-prefix="far" data-icon="trash-can" class="svg-inline--fa fa-trash-can  float-right  ml-2 mt-1 cursor-pointer text-[15px] text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><title id="svg-inline--fa-title-NHFNik9Cbe12">Delete the note</title><path fill="currentColor" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path></svg>`;
                editicon.innerHTML = `<svg aria-labelledby="svg-inline--fa-title-to2SiwDZasXN" data-prefix="far" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square mr-1 ml-[18px] cursor-pointer role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="plus-notes "><title id="svg-inline--fa-title-to2SiwDZasXN">Edit name of the note</title><path fill="currentColor" d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"></path></svg>`;
                icons.appendChild(editicon);
                icons.appendChild(deleteicon);

                butt.title = snapshot.key;
                butt.innerText = "edit";
                butt.classList = "butt";
                butt.onclick = () => {
                  EditData(butt.title);
                  SelectData(value);
                };

                h1.classList =
                  "h1 border-b-2  border-white text-left p-2 mt-1 w-full flex";

                h1.title = snapshot.key;
                // h1.innerHTML='
                text.classList = "w-[80%]";
                if (snapshot.val().finished === "no") {
                  text.innerHTML =
                    `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="square" class="svg-inline--fa fa-square mr-2 text-gray-200 hover:text-gray-200 cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><path fill="currentColor" d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"></path></svg>` +
                    `${snapshot.val().name}`;
                }
                if (snapshot.val().finished === "yes") {
                  text.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="square-check" class="svg-inline--fa fa-square-check mr-2 text-gray-200 hover:text-gray-200 cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><path fill="currentColor" d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"></path></svg>' +
                    `<del>${snapshot.val().name}</del>`;
                }

                // h1.innerText = snapshot.val().name;
                // h1.onclick = () => {
                // DeleteData(h1.title);
                // SelectData(value);
                // };
                h1.appendChild(text);
                h1.appendChild(icons);
                shower.appendChild(h1);

                text.onclick = () => {
                  if (
                    text.innerHTML ==
                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="square-check" class="svg-inline--fa fa-square-check mr-2 text-gray-200 hover:text-gray-200 cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><path fill="currentColor" d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"></path></svg>' +
                      `<del>${snapshot.val().name}</del>`
                  ) {
                    text.innerHTML =
                      `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="square" class="svg-inline--fa fa-square mr-2 text-gray-200 hover:text-gray-200 cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><path fill="currentColor" d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"></path></svg>` +
                      `${snapshot.val().name}`;
                    update(
                      ref(
                        db,
                        "users/" +
                          user.userid +
                          "/" +
                          value +
                          "/todo/" +
                          snapshot.key +
                          "/"
                      ),
                      {
                        finished: "no",
                      }
                    ).then(() => {
                      //console.log("updated successfully");
                    });
                  } else {
                    text.innerHTML =
                      '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="square-check" class="svg-inline--fa fa-square-check mr-2 text-gray-200 hover:text-gray-200 cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><path fill="currentColor" d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"></path></svg>' +
                      `<del>${snapshot.val().name}</del>`;
                    update(
                      ref(
                        db,
                        "users/" +
                          user.userid +
                          "/" +
                          value +
                          "/todo/" +
                          snapshot.key +
                          "/"
                      ),
                      {
                        finished: "yes",
                      }
                    ).then(() => {
                      //console.log("updated successfully");
                    });
                  }
                };

                //console.log(snapshot.val().name);
                // const buttons = document.querySelectorAll('.butt');

                // buttons.forEach((button) => {
                //   button.addEventListener('click', function handleClick(event) {
                //     //console.log('edit button clicked', event);
                //     //console.log("edit button title",button.title)
                //     EditData(button.title);
                //     SelectData();

                //   });
                // });
                // const boxes = document.querySelectorAll('.h1');
                // //console.log('box')
                // boxes.forEach((box) => {
                //   box.addEventListener('click', function handleClick(event) {
                //     //console.log('box clicked', event);
                //     //console.log("box title",box.title);
                //     DeleteData(box.title);
                //     SelectData();

                //   });
                // });
              })
              .catch((error) => {
                //console.log(error);
              });
          }
        } else {
          document.getElementById("shower").innerText = "No Todos found";
        }
      })
      .catch((error) => {
        document.getElementById("shower").innerText = "No Todos found";
      });
  }
  function EditData(title) {
    var input = document.getElementById("edit-todo-name").value;
    //console.log(title);
    update(
      ref(db, "users/" + user.userid + "/" + value + "/todo/" + title + "/"),
      {
        name: input,
      }
    ).then(() => {
      //console.log("updated successfully");
    });
    var shower = document.getElementById("shower");
    shower.innerText = " ";
    // SelectData()
  }
  function DeleteData(title) {
    //console.log(title);
    remove(
      ref(db, "users/" + user.userid + "/" + value + "/todo/" + title + "/")
    ).then(() => {
      //console.log("data removed");
      // SelectData()
    });
  }
  const signin = () => {
    var shower = document.getElementById("shower");
    const auth = getAuth();

    var google_privider = new GoogleAuthProvider();

    signInWithPopup(auth, google_privider).then((re) => {
      //console.log(re);
      //console.log(re.user.uid);

      localStorage.setItem("username", re.user.displayName);
      localStorage.setItem("Email", re.user.email);
      localStorage.setItem("id", re.user.uid);
      localStorage.setItem("pic", re.user.photoURL);
      setUser({
        userid: re.user.uid,
        name: re.user.displayName,
        email: re.user.email,
        pic: re.user.photoURL,
      });
      update(ref(db, "users/" + re.user.uid), {
        userid: re.user.uid,
        name: re.user.displayName,
        email: re.user.email,
      })
        .then(() => {
          //console.log("logged in");
        })
        .catch((err) => {
          //console.log(err);
        });
      // const user=result.user
    });
  };
  // to insert new todo
  function insert() {
    const dbref = ref(db);

    var input = document.getElementById("new-todo-name").value;
    const postListRef = ref(db, "posts");

    push(ref(db, "users/" + user.userid + "/" + value + "/todo"), {
      name: input,
      finished: "no",
      tododate: value,
    })
      .then(() => {
       toast.success("Todo added successfully")
      })
      .catch((error) => {
       toast.error(error);
      });
  }
  function insert_event() {
    const dbref = ref(db);

    var input = document.getElementById("new-event-name").value;
    const postListRef = ref(db, "posts");

    push(ref(db, "users/" + user.userid + "/" + value + "/events"), {
      name: input,
      eventtime: eventtime,

      eventdate: value,
    })
      .then((snapshot) => {
      
        update(ref(db, "/notifications/" + value + "/events/" + snapshot.key), {
          userid: user.userid,
          email: user.email,
          username: user.name,
          name: input,

          eventtime: eventtime,
          eventdate: value,
          eventid: snapshot.key,
        })
          .then(() => {
           toast.success("Event added successfully")
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  }
  function EditEvent(title) {
    var input = document.getElementById("edit-event-name").value;
    var time = document.getElementById("edit-event-name").value;
    //console.log(title);
    if (editeventtime === true) {
      update(
        ref(
          db,
          "users/" + user.userid + "/" + value + "/events/" + title + "/"
        ),
        {
          name: input,
          eventtime: eventtime,
        }
      ).then(() => {
        update(ref(db, "/notifications/" + value + "/events/" + title + "/"), {
          name: input,
          eventtime: eventtime,
        }).then(() => {});
      });
      setEditeventtime(false);
    } else {
      update(
        ref(
          db,
          "users/" + user.userid + "/" + value + "/events/" + title + "/"
        ),
        {
          name: input,
        }
      ).then(() => {
        toast.success("Event edited successfully")
        update(ref(db, "/notifications/" + value + "/events/" + title + "/"), {
          name: input,
        }).then(() => {
         
        });
      });
    }

    var shower = document.getElementById("event-shower");
    shower.innerText = " ";
    // SelectData()
  }
  // to signout
  function signout() {
    localStorage.clear();
    window.location.reload("Refresh");
    toast.success("User has been signed out")
  }
  // to show notes content section
  function notesMain() {
    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    var main = document.getElementById("notes-main");
    if (main.style.display == "block") {
      main.style.display = "none";
    } else {
      main.style.display = "block";
    }
  }
  // to show the contents of the note selected
  function fetchNotes(title) {
    setNotesid(title);
    const dbref = ref(db);
    get(child(dbref, "users/" + user.userid + "/notes/" + title + "/")).then(
      (snapshot) => {
        if (snapshot.val().name) {
          //console.log(snapshot.val().name);
          setNotesname(snapshot.val().name);
          if (snapshot.val().text) {
            setNotescontent(snapshot.val().text);
            //console.log(snapshot.val().text);
            if (snapshot.val().text == " ") {
              //console.log("New file no content was previously written");

              setNotescontent(snapshot.val().text);
            } else {
              document.getElementById("note-content").value = " ";
              document.getElementById("note-content").value =
                snapshot.val().text;
            }
          }
        } else {
          //console.log("not working");
        }
      }
    );
  }
  
  function update_notes_content(title) {
    let content = document.getElementById("note-content").value;
    update(ref(db, "users/" + user.userid + "/notes/" + title + "/"), {
      text: content,
    }).then(() => {
      toast.success("updated successfully");
    });
  }
  // to show the edit menu for notes
  function editNotes() {
    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    var editnotes = document.getElementById("edit-notes");
    var notesmain = document.getElementById("notes-main");
    if (editnotes.style.display === "block") {
      editnotes.style.display = "none";
      notesmain.style.display = "block";
    } else {
      editnotes.style.display = "block";
      notesmain.style.display = "none";
    }
  }
  // to close the edit menu for notes
  function closeEditNotes() {
    var editnotes = document.getElementById("edit-notes");
    var notesmain = document.getElementById("notes-main");
    if (editnotes.style.display === "block") {
      editnotes.style.display = "none";
      notesmain.style.display = "block";
      document.getElementById("edit-notes-name").value = "";
    }
  }
  // to save the edited notes name
  function editNotesName(title) {
    let editedName = document.getElementById("edit-notes-name").value;
    update(ref(db, "users/" + user.userid + "/notes/" + title + "/"), {
      name: editedName,
    }).then(() => {
      toast.success("updated successfully");
      setNotesname(editedName);
    });
  }
  // to show the delete notes mmenu
  function openDeleteNotes() {
    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    let deletenotes = document.getElementById("delete-notes");
    var notesmain = document.getElementById("notes-main");
    if (deletenotes.style.display === "block") {
      deletenotes.style.display = "none";
      notesmain.style.display = "block";
    } else {
      deletenotes.style.display = "block";
      notesmain.style.display = "none";
    }
  }

  // to close the delete notes menu:
  function closeDeleteNotes() {
    let deletenotes = document.getElementById("delete-notes");

    var notesmain = document.getElementById("notes-main");
    if (deletenotes.style.display === "block") {
      deletenotes.style.display = "none";
      notesmain.style.display = "block";
    } else {
      deletenotes.style.display = "block";
      notesmain.style.display = "none";
    }
  }
  // to delete the notes:
  function deleteNotes(title) {
    remove(ref(db, "users/" + user.userid + "/notes/" + title + "/")).then(
      () => {
       toast.success("note removed");
      }
    );
  }
  // to close the notes view section
  function closeMainNotes() {
    let notesmain = document.getElementById("notes-main");
    if (notesmain.style.display === "block") {
      notesmain.style.display = "none";
      document.getElementById("note-content").value = "";
    } else {
      notesmain.style.display = "block";
    }
  }
  // landing menu
  function getstarted() {
    document.getElementById("login-holder").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById('main-sec').style.height='auto';
    SelectData(value);
    SelectEvent(value);
    SelectRemind(value);
    SelectMoney();
  }
  const darkTheme = createTheme({
    palette: {
      textColor: "secondary",
      mode: "dark",
    },
  });
  // to add new notes to the database
  function new_notes() {
    const dbref = ref(db);

    var input = document.getElementById("new-notes-name").value;
    const postListRef = ref(db, "posts");

    push(ref(db, "users/" + user.userid + "/notes"), {
      name: input,
      text: " ",
      time: "now",
    })
      .then(() => {
        toast.success("New Notes created successfully");
      })
      .catch((error) => {
        alert(error);
      });
  }
  // to show the notes section
  function shownotes() {
    let notesection = document.getElementById("notes-section");
    if (notesection.style.display === "none") {
      notesection.style.display = "block";
    } else {
      notesection.style.display = "none";
    }
  }
  // to close the new notes popup
  function closeNewNotes() {
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('reminders').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    document.getElementById("new-notes").style.display = "none";
  }
  // to show the new notes popup
  function ShowNewNotes() {
    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    var currentWidth = window.innerWidth
 if (currentWidth <= 1280) {
  
   document.getElementById('side-bar').style.height="80%"
   document.getElementById('side-bar').style.overflow="hidden"

   
  }
    document.getElementById("new-notes").style.display = "block";
  }
  // to fetch notes from database
  function SelectNotes() {
    var shower = document.getElementById("notes-section");
    shower.innerText = " ";
    const dbref = ref(db);
    get(child(dbref, "users/" + user.userid))
      .then((snapshot) => {
        if (snapshot.val().notes) {
          var length = Object.keys(snapshot.val().notes).length;
          //console.log(length);

          for (let i = 0; i < length; i++) {
            var path = Object.keys(snapshot.val().notes)[i];
            //console.log(path);
            const dbref = ref(db);
            get(child(dbref, "users/" + user.userid + "/notes/" + path))
              .then((snapshot) => {
                const icon = document.createElement("FontAwesomeIcon");
                icon.setAttribute("icon", faClipboard);
                const h1 = document.createElement("h1");

                h1.classList =
                  " border-b-2  border-gray-600 hover:border-white";

                h1.title = snapshot.key;
                h1.onclick = () => {
                  notesMain();
                  fetchNotes(snapshot.key);
                };

                h1.innerHTML =
                  '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="note-sticky" class="svg-inline--fa fa-note-sticky mr-[5px] hover:text-gray-200 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32h-352C21.49 32 0 53.49 0 80v352C0 458.5 21.49 480 48 480h245.5c16.97 0 33.25-6.744 45.26-18.75l90.51-90.51C441.3 358.7 448 342.5 448 325.5V80C448 53.49 426.5 32 400 32zM64 96h320l-.001 224H320c-17.67 0-32 14.33-32 32v64H64V96z"></path></svg>' +
                  snapshot.val().name +
                  '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square mr-[5px] hover:text-white float-right text-gray-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"></path></svg>';
                shower.appendChild(icon);
                shower.appendChild(h1);

                //console.log(snapshot.val().name);
              })
              .catch((error) => {
                //console.log(error);
              });
          }
        } else {
          document.getElementById("notes-section").innerText = "No Notes found";
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  // close add todo section
  function closeNewTodo() {
    let newTodo = document.getElementById("new-todo");
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('todos').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    if (newTodo.style.display === "block") {
      newTodo.style.display = "none";
    } else {
      newTodo.style.display = "block";
    }
  }
  // open add todo section
  function openNewTodo() {
    let newTodo = document.getElementById("new-todo");
    document.getElementById('logo').scrollIntoView()
    
    document.getElementById('main-sec').style.height="80%"
    document.getElementById('todos').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    if (newTodo.style.display === "block") {
      newTodo.style.display = "none";
    } else {
      newTodo.style.display = "block";
      
    }
  }
  //  close edit todo section
  function closeEditTodos() {
    let edit_todo = document.getElementById("edit-todo");
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('todos').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    if (edit_todo.style.display === "block") {
      //console.log("closing edit menu");
      edit_todo.style.display = "none";
    } else {
      edit_todo.style.display = "block";
    }
  }
  // close delete todo section
  function closeDeleteTodo() {
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('todos').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    let delete_todo = document.getElementById("delete-todo");
    if (delete_todo.style.display === "block") {
      delete_todo.style.display = "none";
    } else {
      delete_todo.style.display = "block";
    }
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('todos').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  }
  // close new event section
  function closeNewevent() {
    let newevent = document.getElementById("new-event");
    if (newevent.style.display === "block") {
      newevent.style.display = "none";
    } else {
      newevent.style.display = "block";
    }
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('events').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  }
  function openNewEvent() {
    let newevent = document.getElementById("new-event");
   
    if (newevent.style.display === "block") {
      newevent.style.display = "none";
    } else {
      newevent.style.display = "block";
    }
    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    var currentWidth = window.innerWidth
 if (currentWidth <= 1280) {
   document.getElementById('main-sec').style.height="80%"


   
  }
}
  function SelectEvent(value) {
    var shower = document.getElementById("event-shower");
    shower.innerText = " ";
    const dbref = ref(db);
    get(child(dbref, "users/" + user.userid + "/" + value))
      .then((snapshot) => {
        if (snapshot.val().events) {
          var length = Object.keys(snapshot.val().events).length;
          

          for (let i = 0; i < length; i++) {
            var path = Object.keys(snapshot.val().events)[i];
           
            const dbref = ref(db);
            get(
              child(
                dbref,
                "users/" + user.userid + "/" + value + "/events/" + path
              )
            )
              .then((snapshot) => {
                const h1 = document.createElement("div");
                const text = document.createElement("h1");
                const butt = document.createElement("button");
                const icons = document.createElement("p");
                const editicon = document.createElement("p");
                const count_holder = document.createElement("p");
                const deleteicon = document.createElement("p");
                const date = snapshot.val().eventdate.slice(4);

                const time = snapshot.val().eventtime;
                
                deleteicon.onclick = () => {
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                  setEventname(snapshot.val().name);
                  setEventid(snapshot.key);
                  let delete_todo = document.getElementById("delete-event");
                  if (delete_todo.style.display === "block") {
                    delete_todo.style.display = "none";
                  } else {
                   
                    delete_todo.style.display = "block";
                  }
                };

                editicon.onclick = () => {
                  setEventname(snapshot.val().name);
                  let text =
                    value +
                    " " +
                    snapshot.val().eventtime +
                    " GMT+0530 (India Standard Time)";
                  setTime(text);
                  
                  setEventid(snapshot.key);
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                  let edit_todo = document.getElementById("edit-event");
                  if (edit_todo.style.display === "block") {
                    edit_todo.style.display = "none";
                  } else {
                  
                    edit_todo.style.display = "block";
                  }
                };
                icons.classList = "text-left w-auto flex";
                count_holder.title = "event time";

                // countdown
                // countdown
                var countDownDate = new Date(date + " " + time).getTime();

                // Update the count down every 1 second
                var x = setInterval(function () {
                  // Get today's date and time
                  var now = new Date().getTime();

                  // Find the distance between now and the count down date
                  var distance = countDownDate - now;

                  // Time calculations for days, hours, minutes and seconds
                  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                  var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  );
                  var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                  // Display the result in the element with id="demo"
                  count_holder.innerHTML =
                    days +
                    "d " +
                    hours +
                    "h " +
                    minutes +
                    "m " +
                    seconds +
                    "s ";

                  // If the count down is finished, write some text
                  if (distance < 0) {
                    count_holder.classList =
                      " relative ml-[-70px] bg-green-500 pl-2 pr-2 h-[25px] rounded-full";
                    clearInterval(x);
                    count_holder.innerHTML = "EXPIRED";
                  } else {
                    count_holder.classList =
                      "float-left relative w-[120px] ml-[-110px] bg-green-500 pl-2 pr-2 rounded-full h-[25px]";
                  }
                }, 1000);

                deleteicon.innerHTML = `<svg aria-labelledby="svg-inline--fa-title-NHFNik9Cbe12" data-prefix="far" data-icon="trash-can" class="svg-inline--fa fa-trash-can  float-right  ml-2 mt-1 cursor-pointer text-[15px] text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><title id="svg-inline--fa-title-NHFNik9Cbe12">Delete the note</title><path fill="currentColor" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path></svg>`;
                editicon.innerHTML = `<svg aria-labelledby="svg-inline--fa-title-to2SiwDZasXN" data-prefix="far" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square mr-1 ml-[18px] cursor-pointer role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="plus-notes "><title id="svg-inline--fa-title-to2SiwDZasXN">Edit name of the note</title><path fill="currentColor" d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"></path></svg>`;

                icons.appendChild(count_holder);
                icons.appendChild(editicon);
                icons.appendChild(deleteicon);

                h1.classList =
                  "h1 border-b-2  border-white text-left p-2 mt-1 w-full flex";

                h1.title = snapshot.key;
             
                text.classList = "w-[80%]";

                h1.innerText = snapshot.val().name;
                
                h1.appendChild(text);
                h1.appendChild(icons);
                shower.appendChild(h1);

                
                
              })
              .catch((error) => {
                //console.log(error);
              });
          }
        } else {
          document.getElementById("event-shower").innerText = "No Events found";
        }
      })
      .catch((error) => {
        document.getElementById("event-shower").innerText = "No Events found";
      });
  }
  // close edit event

  function closeEditEvents() {
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('events').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    let edit_todo = document.getElementById("edit-event");
    if (edit_todo.style.display === "block") {
      edit_todo.style.display = "none";
    } else {
     
      edit_todo.style.display = "block";
    }
  }
  // close delete event
  function closeDeleteEvent() {
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('events').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    let edit_todo = document.getElementById("delete-event");
    if (edit_todo.style.display === "block") {
      edit_todo.style.display = "none";
    } else {
     
      edit_todo.style.display = "block";
    }
  }

  // deleteevents
  function deleteEvents(title) {
    remove(
      ref(db, "users/" + user.userid + "/" + value + "/events/" + title)
    ).then(() => {
      toast.success("Event removed");
      remove(ref(db, "/notifications/" + value + "/events/" + title)).then(
        () => {
          //console.log("Event removed");
        }
      );
    });
  }
  // close new reminder menu
  function closeNewRemind() {
    let newevent = document.getElementById("new-reminder");
  
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('reminders').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    if (newevent.style.display === "block") {
      newevent.style.display = "none";
    } else {
      newevent.style.display = "block";
    }
  }

  // open new reminder menu

  function openNewRemind() {
    let newevent = document.getElementById("new-reminder");
    if (newevent.style.display === "block") {
      newevent.style.display = "none";
    } else {
      newevent.style.display = "block";
    }
    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    var currentWidth = window.innerWidth
 if (currentWidth <= 1280) {
  
   document.getElementById('main-sec').style.height="80%"


   
  }
  }
  function insert_reminder() {
    const dbref = ref(db);

    var input = document.getElementById("new-reminder-name").value;
    const postListRef = ref(db, "posts");

    push(ref(db, "users/" + user.userid + "/" + value + "/reminders"), {
      name: input,
      remindertime: remindtime,
      reminderdate: value,
    })
      .then((snapshot) => {
        //console.log(snapshot.key);
        update(
          ref(db, "/notifications/" + value + "/reminders/" + snapshot.key),
          {
            userid: user.userid,
            email: user.email,
            username: user.name,
            name: input,
            remindertime: remindtime,
            reminderdate: value,
            reminderid: snapshot.key,
          }
        )
          .then(() => {
           toast.success("Reminder added successfully")
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  }
  // select reminder
  function SelectRemind(value) {
    var shower = document.getElementById("remind-shower");
    shower.innerText = " ";
    const dbref = ref(db);
    get(child(dbref, "users/" + user.userid + "/" + value))
      .then((snapshot) => {
        if (snapshot.val().reminders) {
          var length = Object.keys(snapshot.val().reminders).length;
          //console.log(length);

          for (let i = 0; i < length; i++) {
            var path = Object.keys(snapshot.val().reminders)[i];
            //console.log(path);
            const dbref = ref(db);
            get(
              child(
                dbref,
                "users/" + user.userid + "/" + value + "/reminders/" + path
              )
            )
              .then((snapshot) => {
                const h1 = document.createElement("div");
                const text = document.createElement("h1");
                const butt = document.createElement("button");
                const icons = document.createElement("p");
                const name = document.createElement("p");
                const editicon = document.createElement("p");
                const count_holder = document.createElement("p");
                const deleteicon = document.createElement("p");
                const word = document.createElement("p");
                let date = snapshot.val().reminderdate;

                const time = snapshot.val().remindertime;
                //console.log(date);
                //console.log(time);
                deleteicon.onclick = () => {
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                  setRemindname(snapshot.val().name);
                  setRemindid(snapshot.key);
                  let delete_todo = document.getElementById("delete-remind");
                  if (delete_todo.style.display === "block") {
                    delete_todo.style.display = "none";
                  } else {
                    //console.log("showing edit menu");
                    delete_todo.style.display = "block";
                  }
                };

                editicon.onclick = () => {
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                  setRemindname(snapshot.val().name);
                  let text =
                    value +
                    " " +
                    snapshot.val().remindertime +
                    " GMT+0530 (India Standard Time)";
                  setTime(text);
                  //console.log(snapshot.val().remindertime);
                  setRemindid(snapshot.key);
                  let edit_todo = document.getElementById("edit-remind");
                  document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                  var currentWidth = window.innerWidth
               if (currentWidth <= 1280) {
                
                 document.getElementById('main-sec').style.height="80%"
              
              
                 
                }
                  if (edit_todo.style.display === "block") {
                    edit_todo.style.display = "none";
                  } else {
                    //console.log("showing edit menu");
                    edit_todo.style.display = "block";
                  }
                };
                icons.classList = "text-left w-auto flex";
                count_holder.title = "remind time";
                count_holder.classList =
                  "float-left relative w-[120px] ml-[-110px] bg-blue-500 pl-2 pr-2 rounded-full ";

                // countdown
                var countDownDate = new Date(date + " " + time).getTime();
                var x = setInterval(function () {
                  var now = new Date().getTime();
                  var distance = countDownDate - now;
                  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                  var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  );
                  var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                  count_holder.innerHTML =
                    days +
                    "d " +
                    hours +
                    "h " +
                    minutes +
                    "m " +
                    seconds +
                    "s ";
                  if (distance < 0) {
                    count_holder.classList =
                      " relative ml-[-70px] bg-blue-500 pl-2 pr-2 rounded-full";
                    clearInterval(x);
                    count_holder.innerHTML = "EXPIRED";
                  }
                }, 1000);

                deleteicon.innerHTML = `<svg aria-labelledby="svg-inline--fa-title-NHFNik9Cbe12" data-prefix="far" data-icon="trash-can" class="svg-inline--fa fa-trash-can  float-right  ml-2 mt-1 cursor-pointer text-[15px] text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="plus-notes "><title id="svg-inline--fa-title-NHFNik9Cbe12">Delete the note</title><path fill="currentColor" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path></svg>`;
                editicon.innerHTML = `<svg aria-labelledby="svg-inline--fa-title-to2SiwDZasXN" data-prefix="far" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square mr-1 ml-[18px] cursor-pointer role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="plus-notes "><title id="svg-inline--fa-title-to2SiwDZasXN">Edit name of the note</title><path fill="currentColor" d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"></path></svg>`;

                icons.appendChild(count_holder);
                icons.appendChild(editicon);
                icons.appendChild(deleteicon);

                h1.classList =
                  "h1 border-b-2  border-white text-left p-2 mt-1 w-full flex ";

                h1.title = snapshot.key;
                // h1.innerHTML='
                text.classList = "w-[80%]";

                name.innerText = snapshot.val().name;
                name.classList = "w-[30%] break-words";
                // h1.onclick = () => {
                // DeleteData(h1.title);
                // SelectData(value);
                // };
                h1.appendChild(name);
                h1.appendChild(text);
                h1.appendChild(icons);
                shower.appendChild(h1);

                //console.log(snapshot.val().name);
              })
              .catch((error) => {
                //console.log(error);
              });
          }
        } else {
          document.getElementById("remind-shower").innerText =
            "No Reminders found";
        }
      })
      .catch((error) => {
        document.getElementById("remind-shower").innerText =
          "No Reminders found";
      });
  }
  // edit Reminder
  function EditRemind(title) {
    var input = document.getElementById("edit-remind-name").value;
    var time = document.getElementById("edit-remind-name").value;
  
    if (editremindtime === true) {
      update(
        ref(
          db,
          "users/" + user.userid + "/" + value + "/reminders/" + title + "/"
        ),
        {
          name: input,
          remindertime: remindtime,
        }
      ).then(() => {
        update(
          ref(db, "/notifications/" + value + "/reminders/" + title + "/"),
          {
            name: input,
            remindertime: remindtime,
          }
        ).then(() => {});
      });
      setEditremindtime(false);
    } else {
      update(
        ref(
          db,
          "users/" + user.userid + "/" + value + "/reminders/" + title + "/"
        ),
        {
          name: input,
        }
      ).then(() => {
        toast.success("Updated successfully")
        update(
          ref(db, "/notifications/" + value + "/reminders/" + title + "/"),
          {
            name: input,
          }
        ).then(() => {
        
        });
      });
    }
  }
  // close edit remind
  function closeEditRemind() {
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('reminders').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    let edit_todo = document.getElementById("edit-remind");
    if (edit_todo.style.display === "block") {
      //console.log("closing edit menu");
      edit_todo.style.display = "none";
    } else {
      edit_todo.style.display = "block";
    }

  }
  // close delete remind

  function closeDeleteRemind() {
    document.getElementById('main-sec').style.height="auto"
    document.getElementById('reminders').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    let edit_todo = document.getElementById("delete-remind");
    if (edit_todo.style.display === "block") {
      edit_todo.style.display = "none";
    } else {
      //console.log("showing edit menu");
      edit_todo.style.display = "block";
    }
  }
  // Delete Reminder
  function deleteRemind(title) {
    remove(
      ref(db, "users/" + user.userid + "/" + value + "/reminders/" + title)
    ).then(() => {
      //console.log("reminder removed");
      remove(ref(db, "/notifications/" + value + "/reminders/" + title)).then(
        () => {
          //console.log("reminder removed");
        }
      );
    });
  }
  // insert money
  function insert_money_add() {
    const dbref = ref(db);

    var input = document.getElementById("new-expense-name").value;
    var amt = document.getElementById("increment-amount").value;
    const postListRef = ref(db, "posts");
    let value = Date().toString().slice(0, 15);
    push(ref(db, "users/" + user.userid + "/money/" + value), {
      name: input,
      type: "increment",

      amount: amt,
    })
      .then(() => {
        toast.success("amt added successfully");
      })
      .catch((error) => {
        alert(error);
      });
  }
  // remove money
  function insert_money_remove() {
    const dbref = ref(db);

    var input = document.getElementById("new-decrement-name").value;
    var amt = document.getElementById("decrement-amount").value;
    const postListRef = ref(db, "posts");
    let value = Date().toString().slice(0, 15);
    push(ref(db, "users/" + user.userid + "/money/" + value), {
      name: input,
      type: "decrement",

      amount: amt,
    })
      .then(() => {
        toast.success("amt removed successfully");
      })
      .catch((error) => {
        alert(error);
      });
  }
  function check(value){
    let current=  new Date() .toString()
    let current_year=current.slice(11, 15)
    let current_month=current.slice(4, 7)
    let current_date=current.slice(8,10)
    let valuer=value
    let selected_year=valuer.slice(11, 15)
    let selected_month=valuer.slice(4, 7)
    let selected_date=valuer.slice(8, 10)
    current_year=parseInt(current_year)
    current_date=parseInt(current_date)
    selected_year=parseInt(selected_year)
    selected_date=parseInt(selected_date)
    if (current_month==="Jan"){
      current_month=1
    }
    else if (current_month==="Feb"){
      current_month=2
    }
    else if (current_month==="Mar"){
      current_month=3
    }
    else if (current_month==="Apr"){
      current_month=4
    }
    else if (current_month==="May"){
      current_month=5
    }
    else if (current_month==="Jun"){
      current_month=6
    }
    else if (current_month==="Jul"){
      current_month=7
    }
    else if (current_month==="Aug"){
      current_month=8
    }
    else if (current_month==="Sep"){
      current_month=9
    }
    else if (current_month==="Oct"){
      current_month=10
    }
    else if (current_month==="Nov"){
      current_month=11
    }
    else if (current_month==="Dec"){
      current_month=12
    }


    if (selected_month==="Jan"){
      selected_month=1
    }
    else if (selected_month==="Feb"){
      selected_month=2
    }
    else if (selected_month==="Mar"){
      selected_month=3
    }
    else if (selected_month==="Apr"){
      selected_month=4
    }
    else if (selected_month==="May"){
      selected_month=5
    }
    else if (selected_month==="Jun"){
      selected_month=6
    }
    else if (selected_month==="Jul"){
      selected_month=7
    }
    else if (selected_month==="Aug"){
      selected_month=8
    }
    else if (selected_month==="Sep"){
      selected_month=9
    }
    else if (selected_month==="Oct"){
      selected_month=10
    }
    else if (selected_month==="Nov"){
      selected_month=11
    }
    else if (selected_month==="Dec"){
      selected_month=12
    }
    //console.log(current_year)
    //console.log(current_month)
    //console.log(current_date)
    //console.log(selected_year)
    //console.log(selected_month)
    //console.log(selected_date)
    //console.log(current_year>selected_year)
    //console.log(current_month>selected_month)
    //console.log(current_date>selected_date)
    // grey
    if(current_year>selected_year){
      document.getElementById('plus-todo').style.color="grey"
      document.getElementById('plus-events').style.color="grey"
      document.getElementById('plus-reminders').style.color="grey"
      document.getElementById('plus-todo').style.cursor="no-drop"
      document.getElementById('plus-events').style.cursor="no-drop"
      document.getElementById('plus-reminders').style.cursor="no-drop"
      setDisable(true)
    }
    // white
    else if(current_year<selected_year){
      document.getElementById('plus-todo').style.color="white"
      document.getElementById('plus-events').style.color="white"
      document.getElementById('plus-reminders').style.color="white"
      document.getElementById('plus-todo').style.cursor="pointer"
      document.getElementById('plus-events').style.cursor="pointer"
      document.getElementById('plus-reminders').style.cursor="pointer"
      setDisable(false)
    }
 // grey
    else if ( current_month>selected_month && current_year<=selected_year){
        document.getElementById('plus-todo').style.color="grey"
        document.getElementById('plus-events').style.color="grey"
        document.getElementById('plus-reminders').style.color="grey"
        document.getElementById('plus-todo').style.cursor="no-drop"
        document.getElementById('plus-events').style.cursor="no-drop"
        document.getElementById('plus-reminders').style.cursor="no-drop"
       
        setDisable(true)
      }
       // white
    else if( current_month>selected_month && current_year<=selected_year && current_date>selected_date){
          document.getElementById('plus-todo').style.color="white"
          document.getElementById('plus-events').style.color="white"
      document.getElementById('plus-reminders').style.color="white"
      document.getElementById('plus-todo').style.cursor="pointer"
      document.getElementById('plus-events').style.cursor="pointer"
      document.getElementById('plus-reminders').style.cursor="pointer"
          setDisable(false)
      }
      // grey
    else if(current_month==selected_month && current_year<=selected_year && current_date>selected_date){
      document.getElementById('plus-todo').style.color="grey"
      document.getElementById('plus-events').style.color="grey"
      document.getElementById('plus-reminders').style.color="grey"
      document.getElementById('plus-todo').style.cursor="no-drop"
      document.getElementById('plus-events').style.cursor="no-drop"
      document.getElementById('plus-reminders').style.cursor="no-drop"
      setDisable(true)
    }
  
    else{
      document.getElementById('plus-todo').style.color="white"
      document.getElementById('plus-events').style.color="white"
      document.getElementById('plus-reminders').style.color="white"
      document.getElementById('plus-todo').style.cursor="pointer"
      document.getElementById('plus-events').style.cursor="pointer"
      document.getElementById('plus-reminders').style.cursor="pointer"
      setDisable(false)
    }
    
  }
  // random quotes
  function quote(){
  fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
    if(result.content.length>=120){
      //console.log("runnin again")
      quote()
    }
    else{
       document.getElementById('quote').innerText='"'+result.content+'"'
       document.getElementById('quote-author').innerText='- '+result.author}
    });}
  // select money
  function SelectMoney() {
    var shower = document.getElementById("money-shower");
    let tot = 0;
    shower.innerHTML = " ";
    const dbref = ref(db);
    get(child(dbref, "users/" + user.userid))
      .then((snapshot) => {
        //console.log(snapshot.val().money);

        var length = Object.keys(snapshot.val().money).length;
        //console.log(length);

        for (let i = 0; i < length; i++) {
          let path = Object.keys(snapshot.val().money)[i];
          //console.log(path);
          get(child(dbref, "users/" + user.userid + "/money/" + path)).then(
            (snapshot) => {
              //console.log(path, snapshot.val());
              let innerpath_length = Object.keys(snapshot.val()).length;
              //console.log(path, innerpath_length);
              let date = document.createElement("div");
              date.classList = "p-5 text-left ";
              let date_text = document.createElement("h1");

              for (let j = innerpath_length; j >= 0; j--) {
                let innerpath = Object.keys(snapshot.val())[j];

                let trac = document.createElement("div");
                trac.classList = "flex mt-5 border-b-2  p-2 border-gray-500";
                //console.log(path, innerpath);

                get(
                  child(
                    dbref,
                    "users/" + user.userid + "/money/" + path + "/" + innerpath
                  )
                ).then((snapshot) => {
                  //console.log(path, snapshot.val());
                  let amount = snapshot.val().amount;

                  amount = parseInt(amount);
                  let money_shower = document.getElementById("money-shower");
                  if (snapshot.val().type === "decrement") {
                    tot = tot - amount;
                  } else {
                    tot = tot + amount;
                  }
                  setTotal(tot);

                  let date = path;
                  let name = snapshot.val().name;
                  let type = snapshot.val().type;
                  let date_shower = document.createElement("p");
                  date_shower.classList = "text-left";
                  let img = document.createElement("div");
                  let text = document.createElement("div");
                  text.classList = "w-[80%]";
                  img.classList = "flex";

                  let name_shower = document.createElement("p");
                  let total_shower = document.createElement("p");
                  total_shower.classList = "text-left";
                  total_shower.innerText = "Balance: ₹" + tot;

                  let left = document.createElement("div");
                  left.classList = "w-[80%] ";
                  date_shower.innerText = date;
                  name_shower.innerText = name;
                  let amount_shower = document.createElement("p");

                  amount_shower.classList =
                    "text-right  text-[20px] laptop:ml-[200px] tablet:[ml-0]";
                  name_shower.classList = "text-left text-[20px] w-[80%]";
                  if (snapshot.val().type === "increment") {
                    img.innerHTML =
                      '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-trend-up" class="svg-inline--fa fa-arrow-trend-up   mt cursor-pointer text-[55px] text-green-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="plus-notes "><path fill="currentColor" d="M384 160C366.3 160 352 145.7 352 128C352 110.3 366.3 96 384 96H544C561.7 96 576 110.3 576 128V288C576 305.7 561.7 320 544 320C526.3 320 512 305.7 512 288V205.3L342.6 374.6C330.1 387.1 309.9 387.1 297.4 374.6L191.1 269.3L54.63 406.6C42.13 419.1 21.87 419.1 9.372 406.6C-3.124 394.1-3.124 373.9 9.372 361.4L169.4 201.4C181.9 188.9 202.1 188.9 214.6 201.4L320 306.7L466.7 159.1L384 160z"></path></svg>';
                    amount_shower.classList =
                      "text-right  text-[20px] laptop:ml-[200px]  text-green-500 mt-20";
                    amount_shower.innerText = "+" + amount;
                  } else {
                    img.innerHTML =
                      '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-trend-down" class="svg-inline--fa fa-arrow-trend-down   mt cursor-pointer text-[55px] text-red-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="plus-notes "><path fill="currentColor" d="M466.7 352L320 205.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6L9.372 150.6C-3.124 138.1-3.124 117.9 9.372 105.4C21.87 92.88 42.13 92.88 54.63 105.4L191.1 242.7L297.4 137.4C309.9 124.9 330.1 124.9 342.6 137.4L512 306.7V223.1C512 206.3 526.3 191.1 544 191.1C561.7 191.1 576 206.3 576 223.1V384C576 401.7 561.7 416 544 416H384C366.3 416 352 401.7 352 384C352 366.3 366.3 352 384 352L466.7 352z"></path></svg>';
                    amount_shower.classList =
                      "text-right  text-[20px] laptop:ml-[200px]  text-red-500 mt-20";
                    amount_shower.innerText = "-" + amount;
                  }
                  text.appendChild(name_shower);
                  text.appendChild(date_shower);

                  left.appendChild(img);
                  left.appendChild(text);
                  trac.appendChild(left);
                  trac.appendChild(amount_shower);

                  money_shower.appendChild(trac);
                });
              }
            }
          );
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  var doRelocation = function() {
    
    var currentWidth = window.innerWidth
       var breakpoint = 1280
       

    if (currentWidth >= breakpoint) {
      document.getElementById('close').style.display='none'
      document.getElementById('open').style.display='none'
      document.getElementById('main-sec').style.display='flex'
      document.getElementById('side-bar').style.display='block'

    }
    else if(currentWidth<=475){

    }
    else{
    
      document.getElementById('close').style.display='none'
      
      document.getElementById('open').style.display='block'
      document.getElementById('main-sec').style.display='flex'
      document.getElementById('side-bar').style.display='none'
    }

}
function load(){
  document.getElementById('logo').scrollIntoView();
}
    // doRelocation();
    
    window.addEventListener('resize', doRelocation);
function feedbacks(){
  let input=document.getElementById('feedback').value
  let score=document.getElementById('star-rating')
  score=score.options[score.selectedIndex].value
  const dbref = ref(db);


  push(ref(db,"feedback/"), {
    feedback: input,
    score:score,
    username:user.name,
    email:user.email
   
  })
    .then(() => {
      toast.success("Feedback Sent Successfully.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    input=" "
    })
    .catch((error) => {
      alert(error);
    });
}
  if (localStorage.id !== undefined) {
    return (
      <div className="App ">
        <ToastContainer theme="dark"
        position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover ></ToastContainer>
        <div id="main" onLoad={quote}>
          {/* side bar */}
          <div className="bg-[#141432] laptop:w-full tablet:w-full ldesktop:h-full desktop:h-auto  ldesktop:w-auto desktop:w-auto desktop:h-full w-full shadow-sm absolute p-5 overflow-auto">
            <div>
              <FontAwesomeIcon
                className="mr-[5px] text-[25px] desktop:hidden text-white absolute left-0  ml-5 mt-3"
                icon={faBars}
                id="open"
                onClick={()=>{
                  document.getElementById('close').style.display='block'
                  document.getElementById('open').style.display='none'
                  document.getElementById('main-sec').style.display='none'
                  document.getElementById('side-bar').style.display='block'
                 
                  
                }}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="mr-[5px] text-[25px] text-white absolute left-0 hidden ml-5 mt-3"
                icon={faXmark}
                id="close"
                onClick={()=>{
                  document.getElementById('open').style.display='block'
                  document.getElementById('close').style.display='none'
                  document.getElementById('main-sec').style.display='block'
                  document.getElementById('side-bar').style.display='none'

            
                }}
              ></FontAwesomeIcon>
            </div>
           
            <h1 className="text-white text-[30px] ml-9 desktop:ml-0 text-left flex border-b-2 border-spacing-2 pb-2 " id="logo"> <img src={require('./vishlogo.png')} className="w-[80px] h-[40px] relative"/><p className="absolute ml-16">WORKFLOW</p></h1>

         

            <div className="hidden desktop:block" id="side-bar">
              <div className="mt-3 mx-auto pl-5 " id="date-shower">
                <p className="text-white text-left text-[20px] p-2  pb-0">
                  Selected Date : {value.toString().slice(0, 15)}
                </p>
              </div>
              <div className="w-50 h-50" id="calender-holder">
                <div id="calender" className="mt-5">
                  <ThemeProvider theme={darkTheme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={value}
                        onViewChange={(newValue) => {
                          
                          setValue(newValue);
                          //console.log(newValue);
                        }}
                        onChange={(newValue) => {
                          check(newValue.toString().slice(0, 15))
                          setValue(newValue.toString().slice(0, 15));
                          //console.log(newValue.toString().slice(0, 15));
                          SelectData(newValue.toString().slice(0, 15));
                          SelectEvent(newValue.toString().slice(0, 15));
                          SelectRemind(newValue.toString().slice(0, 15));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
              </div>

              {/* notes */}
              <div className="text-white text-left mt-5 border-b-2 border-t-2 cursor-pointer  hover:text-white  hover:border-white border-gray-600 p-5 overflow-y-auto">
                <div
                  className="cursor-pointer  "
                  onClick={() => {
                    SelectNotes();
                    shownotes();
                  }}
                >
                  <h1>
                    <FontAwesomeIcon
                      className="mr-[5px] hover:text-gray-200 "
                      icon={faNotesMedical}
                    />
                    Notes
                    <FontAwesomeIcon
                      className="ml-[220px] text-gray-500 hover:text-gray-200"
                      id="plus-notes "
                      onClick={ShowNewNotes}
                      icon={faPlus}
                    />
                    <FontAwesomeIcon
                      className="ml-[10px] text-gray-500 hover:text-gray-200"
                      icon={faCaretDown}
                    />
                  </h1>
                </div>
                <div
                  className="p-5 hidden h-[100px] overflow-auto"
                  id="notes-section"
                >
                  <h1
                    className=" border-b-2  border-gray-600"
                    icon={faCaretDown}
                  >
                    Notes one
                  </h1>
                  <h1 className=" border-b-2 mt-2 border-gray-600">
                    Notes one
                  </h1>
                  <h1 className=" border-b-2 mt-2 border-gray-600">
                    Notes one
                  </h1>
                  <h1 className=" border-b-2 mt-2 border-gray-600">
                    Notes one
                  </h1>
                </div>
              </div>
              {/* manage expenses */}
              <div className="text-white text-left mt-5 border-b-2 border-t-2 cursor-pointer  hover:text-white  hover:border-white border-gray-600 p-5 overflow-y-auto">
                <div
                  className="cursor-pointer flex flex-wrap"
                  onClick={() => {
                    document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                    var currentWidth = window.innerWidth
                    document.getElementById("expense").style.display = "block";
                  }}
                >
                  <div className="w-1/2">
                    <h1>
                      <FontAwesomeIcon
                        className="mr-[5px] hover:text-gray-200"
                        icon={faMoneyBillTrendUp}
                      />
                      Expense
                    </h1>
                  </div>
                  <div className="w-1/2  ">
                    <div className=" bg-orange-500 ml-[110px] inline-block pl-2 pr-2 rounded-full">
                      <p className="text-small ">
                        {total > 0 ? total : "new"}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left text-white mt-5 p-5 pt-0 ">
                <div className="flex ml-5">
                  <Avatar
                    src={user.pic}
                    alt={user.name}
                    sx={{ width: 44, height: 44 }}
                    className="mt-2"
                  />
                  <div className="ml-5 mt-2 w-1/2">
                    {user.name}
                    <br></br>
                    {user.email}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className=" bg-blue-600 px-7 text-[15px] py-2 rounded-lg text-white"
                    onClick={() => {
                      document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                      document.getElementById("settings").style.display =
                        "block";
                    }}
                  >
                    <FontAwesomeIcon className="mr-2" icon={faGear} />
                    Settings
                  </button>
                  <button
                    className=" bg-red-600 ml-5 px-7 text-[15px] py-2 rounded-lg text-white"
                    onClick={signout}
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faRightFromBracket}
                    />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* todos */}
          <div className="absolute mt-3 ml-0 desktop:ml-[32%]  desktop:mt-[1%] mt-[20%] ldesktop:ml-[27%] laptop:mt-[10%] tablet:mt-[15%] flex flex-wrap h-[80%] md:h-[auto] overflow-hidden"id="main-sec" >
            <div className="z-0  bg-[#141432] ml-2 rounded-md shadow-md pr-2 pt-0 h-[400px]  mt-10 tablet:mt-0 pl-2"id="todos">
              <div className="p-4 w-full border-b-2">
                <h1 className="text-white text-[20px] text-left flex">
                  {" "}
                  TODOS
                  <p className="demo bg-white text-blue-100" id="demo"></p>
                  <FontAwesomeIcon
                    className="ml-[200px] text-gray-200 hover:text-gray-200 cursor-pointer"
                    id="plus-todo"
                    onClick={()=>{if(disable==true){}else{openNewTodo()}}}
                    icon={faPlus}

                  />
                  <FontAwesomeIcon
                    className="ml-[10px] text-gray-200 hover:text-gray-200"
                    icon={faCaretDown}
                  />
                </h1>
              </div>

              <br></br>
              <div className="p-5  h-[300px] overflow-auto">
                <p id="shower" className="text-white">
                  {" "}
                </p>
              </div>
            </div>
            {/* events */}
            <div className="z-0  bg-[#141432] ml-2 rounded-md shadow-md pr-2 mt-5 tablet:mt-0 laptop:mt-0 pt-0 h-[400px] pl-2"id="events">
              <div className="p-4 w-full border-b-2" >
                <h1 className="text-white text-[20px] text-left flex">
                  {" "}
                  EVENTS
                  <FontAwesomeIcon
                    className="ml-[200px] text-gray-200 hover:text-gray-200 cursor-pointer"
                    id="plus-events"
                    onClick={()=>{if(disable==true){}else{openNewEvent()}}}
                    icon={faPlus}
                  />
                  <FontAwesomeIcon
                    className="ml-[10px] text-gray-200 hover:text-gray-200"
                    icon={faCaretDown}
                  />
                </h1>
              </div>

              <br></br>
              <div className="p-5  h-[300px] overflow-auto">
                <p id="event-shower" className="text-white">
                  {" "}
                </p>
              </div>
            </div>
            {/* reminders */}
            <div className="z-0  bg-[#141432] ml-2 rounded-md shadow-md pr-2 mt-5 ldesktop:mt-0  tablet:mt-2 laptop:mt-0  desktop:mt-5  pt-0 h-[400px] pl-2 w-[356px]" id="reminders">
              <div className="p-4 w-full border-b-2">
                <h1 className="text-white text-[20px] text-left flex">
                  {" "}
                  <p className="absol">REMINDERS</p>
                  <FontAwesomeIcon
                    className="ml-[160px] text-gray-200 hover:text-gray-200 cursor-pointer"
                    id="plus-reminders"
                    onClick={()=>{if(disable==true){}else{openNewRemind()}}}
                    icon={faPlus}
                  />
                  <FontAwesomeIcon
                    className="ml-[10px] text-gray-200 hover:text-gray-200"
                    icon={faCaretDown}
                  />
                </h1>
              </div>

              <br></br>
              <div className="p-5  h-[300px] overflow-auto">
                <p id="remind-shower" className="text-white">
                  {" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center h-screen bg-blue backdrop-blur-md   absolute w-full top-0 "
          id="login-holder"
        >
          <div className=" z-1 relative bg-white shadow-lg w-[350px] h-[550px] md:w-[700px] md:h-[550px] rounded text-center my-auto" alt="new-quotes" title="new-quotes" >
          <h1 className="flex border-b-2 pb-2 pt-2">
          <img src={require('./vishlogo.png')} className="w-[80px] relative "></img><p className="text-[30px] font-[700] absolute ml-16">Workflow</p> <FontAwesomeIcon
                className="mr-[5px] text-[20px]  text-gray-400 hover:text-gray-500 cursor-pointer absolute right-5  ml-5 mt-3"
                icon={faArrowsRotate} onClick={quote}
              /></h1>
         
          <Avatar
                    src={user.pic}
                    alt={user.name}
                    sx={{ width: 100, height: 100 }}
                    className="mt-5 mx-auto"
                  />
            <div className=" text-xl p-5 pt-2 pb-0 font-[500] " >Welcome {localStorage.username}</div>

             <p  ><p id="quote" className="text-[20px] md:text-[25px] font-[500] p-10" ></p></p>
         <p id="quote-author" className="font-[500] text-[18px] text-right pr-16">
          <p></p>
         </p>
            <button className="bg-blue-500 text-white px-5 rounded py-2 mt-5" onClick={getstarted}>
              Plan Your Day 
            </button>
          
          </div>
        </div>
        {/* new notes menu */}
        <div id="new-notes" className="hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[150px] md:w-[450px] md:h-[150px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Create New Notes
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeNewNotes}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter name of the new notes:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-32 pl-2 text-white mt-1 "
                  placeholder="Note's Name"
                  id="new-notes-name"
                ></input>
                <button
                  className="ml-5 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    let name=document.getElementById('new-notes-name').value
                    if(name==""){
                      toast.warn("Note's name cannot be empty.")
                    }
                    else{
                    new_notes();
                    SelectNotes();
                    closeNewNotes();
                    }
                  }}
                >
                  {" "}
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes main section */}
        <div id="notes-main" className="hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className="  z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px]  md:w-[750px] md:h-[450px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                {notesname}
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeMainNotes}
                />{" "}
                <FontAwesomeIcon
                  className=" float-right mr-5 cursor-pointer text-[25px] text-blue-500"
                  id="plus-notes "
                  title="Edit name of the note"
                  icon={faPenToSquare}
                  onClick={editNotes}
                />{" "}
                <FontAwesomeIcon
                  className=" float-right mr-5 cursor-pointer text-[25px] text-orange-500"
                  id="plus-notes "
                  title="Delete the note"
                  icon={faTrashCan}
                  onClick={openDeleteNotes}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">Content:</label>
                <textarea
                  className="bg-[#141432] border-2 rounded-md md:w-[700px] w-[300px] h-[300px] pl-2 p-5text-white mt-1 "
                  placeholder="Press on the edit icon in the bottom of the content page to edit the content of this note"
                  onChange={() => {
                    document.getElementById("save-shower").innerText =
                      "*Click on the save button to save the edited file*";
                  }}
                  id="note-content"
                ></textarea>
                <div className="flex">
                  <button
                    className="ml-1 mt-1 bg-blue-500 flex px-3.5 py-0.5 rounded-md"
                    onClick={() => {
                      update_notes_content(notesid);
                      SelectNotes();
                      closeMainNotes();
                    }}
                  >
                    SAVE
                  </button>
                  <p className="text-orange-500 ml-5 mt-1" id="save-shower"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit name of the notes section  */}
        <div id="edit-notes" className="hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[150px] md:w-[450px] md:h-[150px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Edit Notes ({notesname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeEditNotes}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter the new name of the note:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-32 pl-2 text-white mt-1 "
                  placeholder="Note's Name"
                  id="edit-notes-name"
                  defaultValue={notesname}
                ></input>
                <button
                  className="ml-5 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    editNotesName(notesid);
                    SelectNotes();
                    closeEditNotes();
                  }}
                >
                  {" "}
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete notes section  */}
        <div id="delete-notes" className="hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[120px] md:w-[450px] md:h-[120px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Delete Note ({notesname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeDeleteNotes}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Do you really want to delete this note?
                </label>

                <button
                  className=" bg-red-500 px-3.5 py-0.5 rounded-md ml-[34px]"
                  onClick={() => {
                    deleteNotes(notesid);
                    SelectNotes();
                    let deletenotes = document.getElementById("delete-notes");

                    var notesmain = document.getElementById("notes-main");
                    if (deletenotes.style.display === "block") {
                      deletenotes.style.display = "none";
                      notesmain.style.display = "none";
                    }
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className=" float-right ml-2 mt-1 cursor-pointer text-[15px] text-white"
                    id="plus-notes "
                    title="Delete the note"
                    icon={faTrashCan}
                  />{" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* new todo menu */}
        <div id="new-todo" className="hidden absolute w-full h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[147px] md:w-[450px] md:h-[147px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Add New TODO
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeNewTodo}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter name of the new TODO:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[8em] pl-2 text-white mt-1 "
                  placeholder="Todo's Name"
                  id="new-todo-name"
                ></input>

                <div className="mt-[15px] hidden" id="time-picker">
                  {/* <ThemeProvider theme={darkTheme} className="">
               <LocalizationProvider dateAdapter={AdapterDateFns}>
{ //console.log(time)}
      <TimePicker
        label="Set Time"
        value={time}
        onChange={(newValue) => {
          setTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      
      />
    </LocalizationProvider>
    </ThemeProvider> */}
                </div>
                <button
                  className="absolute right-5 bottom-5 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    let input = document.getElementById("new-todo-name").value;

                    if (input === "") {
                     toast.warn("Todo name cannot be empty.")
                    } 
                    else if(input.length>=23){
                      toast.warn("Todo's name cannot be this long.");
                    }
                    else {
                      insert();
                      SelectData(value);
                      closeNewTodo();
                    }
                  }}
                >
                  {" "}
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* edit todo name */}
        <div id="edit-todo" className=" absolute w-full top-0 hidden">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[150px] md:w-[450px] md:h-[150px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Edit Todo ({todoname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeEditTodos}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter the new name of the todo:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-32 pl-2 text-white mt-1 "
                  placeholder="Todo's Name"
                  id="edit-todo-name"
                  defaultValue={todoname}
                ></input>
                <button
                  className="ml-5 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    EditData(todoid);
                    SelectData(value);
                    closeEditTodos();
                  }}
                >
                  {" "}
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete todo section  */}
        <div id="delete-todo" className="hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[120px] md:w-[450px] md:h-[120px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Delete todo ({todoname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeDeleteTodo}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1 flex">
                <label className="text-[16px] mb-0">
                  Do you really want to delete this todo?
                </label>

                <button
                  className=" bg-red-500 px-3.5 py-0.5 rounded-md ml-[30px]"
                  onClick={() => {
                    DeleteData(todoid);
                    SelectData(value);
                    let delete_todo = document.getElementById("delete-todo");
                    document.getElementById('main-sec').style.height="auto"
                    if (delete_todo.style.display === "block") {
                      delete_todo.style.display = "none";
                    }
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className=" float-right ml-2 mt-1 cursor-pointer text-[15px] text-white"
                    id="plus-notes "
                    title="Delete the todo"
                    icon={faTrashCan}
                  />{" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* new event menu */}
        <div id="new-event" className=" hidden absolute w-full h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[230px] md:w-[450px] md:h-[230px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Add New EVENT
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeNewevent}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter name of the new event:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[13em] pl-2 text-white mt-1 "
                  placeholder="Event's Name"
                  id="new-event-name"
                ></input>

                <div className="mt-[25px] " id="time-picker">
                  <ThemeProvider theme={darkTheme} className="mt-5">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                   
                      <TimePicker
                        label="Set Time"
                        value={time}
                        onChange={(newValue) => {
                          let text = newValue.toString();
                          text = text.slice(16, 21);

                          setEventtime(text);
                          setTime(newValue);
                          //console.log(text);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                <button
                  className="absolute right-5 bottom-8 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    let input = document.getElementById("new-event-name").value;
                    if (input === "") {
                      toast.warn("Please type something");
                    } else {
                      insert_event();
                      SelectEvent(value);
                      closeNewevent();
                    }
                  }}
                >
                  {" "}
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* edit event menu */}
        <div id="edit-event" className="hidden  absolute w-full h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[230px] md:w-[450px] md:h-[230px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Edit Event ({eventname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeEditEvents}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter new name for the event:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[13em] pl-2 text-white mt-1 "
                  placeholder="Event's Name"
                  id="edit-event-name"
                  defaultValue={eventname}
                ></input>

                <div className="mt-[25px] " id="time-picker">
                  <ThemeProvider theme={darkTheme} className="mt-5">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      
                      <TimePicker
                        label="Set Time"
                        value={time}
                        onChange={(newValue) => {
                          setEditeventtime(true);
                          let text = newValue.toString();
                          text = text.slice(16, 21);
                          setEventtime(text);
                          setTime(newValue);
                          //console.log(text);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                <button
                  className="absolute right-5 bottom-8 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    let input =
                      document.getElementById("edit-event-name").value;
                    if (input === "") {
                      toast.warn("Please type something");
                    } else {
                      EditEvent(eventid);
                      SelectEvent(value);
                      closeEditEvents();
                    }
                  }}
                >
                  {" "}
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Events */}

        <div id="delete-event" className=" hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[120px] md:w-[450px] md:h-[120px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Delete event ({eventname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeDeleteEvent}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1 flex">
                <label className="text-[16px] mb-0">
                  Do you really want to delete this event?
                </label>

                <button
                  className=" bg-red-500 px-3.5 py-0.5 rounded-md ml-[27px]"
                  onClick={() => {
                    deleteEvents(eventid);
                    SelectEvent(value);
                    let delete_todo = document.getElementById("delete-event");

                    if (delete_todo.style.display === "block") {
                      delete_todo.style.display = "none";
                    }
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className=" float-right ml-2 mt-1 cursor-pointer text-[15px] text-white"
                    id="plus-notes "
                    title="Delete the event"
                    icon={faTrashCan}
                  />{" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* new reminder menu */}

        <div id="new-reminder" className=" hidden absolute w-full h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[230px] md:w-[450px] md:h-[230px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Add New REMINDER
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeNewRemind}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter name of the new Reminder:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[13em] pl-2 text-white mt-1 "
                  placeholder="Reminder's Name"
                  id="new-reminder-name"
                ></input>

                <div className="mt-[25px] " id="time-picker">
                  <ThemeProvider theme={darkTheme} className="mt-5">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      
                      <TimePicker
                        label="Set Time"
                        value={time}
                        onChange={(newValue) => {
                          let text = newValue.toString();
                          text = text.slice(16, 21);
                          setRemindtime(text);
                          setTime(newValue);
                          //console.log(text);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                <button
                  className="absolute right-5 bottom-8 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    let input =
                      document.getElementById("new-reminder-name").value;
                    if (input === "") {
                      toast.warn("Please type something");
                    } else {
                      insert_reminder();
                      SelectRemind(value);
                      closeNewRemind();
                    }
                  }}
                >
                  {" "}
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* edit remind menu */}
        <div id="edit-remind" className="  absolute w-full hidden h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[230px] md:w-[450px] md:h-[230px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Edit Event ({remindname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeEditRemind}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter new name for the Reminder:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[13em] pl-2 text-white mt-1 "
                  placeholder="Reminder's Name"
                  id="edit-remind-name"
                  defaultValue={remindname}
                ></input>

                <div className="mt-[25px] " id="time-picker">
                  <ThemeProvider theme={darkTheme} className="mt-5">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    
                      <TimePicker
                        label="Set Time"
                        value={time}
                        onChange={(newValue) => {
                          setEditremindtime(true);
                          let text = newValue.toString();
                          text = text.slice(16, 21);
                          setRemindtime(text);
                          setTime(newValue);
                          //console.log(text);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                <button
                  className="absolute right-5 bottom-8 bg-blue-500 px-3.5 py-0.5 rounded-md"
                  onClick={() => {
                    let input =
                      document.getElementById("edit-remind-name").value;
                    if (input === "") {
                      toast.warn("Please type something");
                    } else {
                      EditRemind(remindid);
                      SelectRemind(value);
                      closeEditRemind();
                    }
                  }}
                >
                  {" "}
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Events */}

        <div id="delete-remind" className=" hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px] h-[120px] md:w-[450px] md:h-[120px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                Delete Reminder ({remindname})
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={closeDeleteRemind}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1 flex">
                <label className="text-[16px] mb-0">
                  Do you really want to delete this Reminder?
                </label>

                <button
                  className=" bg-red-500 px-3.5 py-0.5 rounded-md ml-[27px]"
                  onClick={() => {
                    deleteRemind(remindid);
                    SelectRemind(value);
                    let delete_todo = document.getElementById("delete-remind");

                    if (delete_todo.style.display === "block") {
                      delete_todo.style.display = "none";
                    }
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className=" float-right ml-2 mt-1 cursor-pointer text-[15px] text-white"
                    id="plus-notes "
                    title="Delete the event"
                    icon={faTrashCan}
                  />{" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* track expenses */}
        <div id="expense" className=" hidden absolute w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className="  z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg  w-[350px]  laptop:w-[750px] laptop:h-[450px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                <FontAwesomeIcon
                  className="  mt cursor-pointer text-[25px]"
                  id="plus-notes "
                  icon={faMoneyBillTrendUp}
                />{" "}
                Track Expenses
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={() => {
                    document.getElementById("expense").style.display = "none";
                  }}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <div className="">
                  <div className=" border-b-2  laptop:w-[700px] p-5">
                    <div className="flex flex-wrap">
                      <div className="laptop:w-1/2">
                        <p className=" text-[30px]">Current Balance:</p>

                        <p className="text-[25px]"> {`₹ ` + total}</p>
                      </div>
                      <div className="flex laptop:block">
                        <button
                          className="mx-auto bg-green-500 laptop:ml-5 mt-10 text-white p-1 pl-5 pr-5 rounded-md"
                          onClick={() => {
                            document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                            //console.log("increment");
                            document.getElementById("new-expense-name").value =
                              " ";
                            document.getElementById("increment-amount").value =
                              " ";
                            document.getElementById("increment").style.display =
                              "block";
                          }}
                        >
                          <FontAwesomeIcon
                            className="  cursor-pointer text-"
                            icon={faPlus}
                          />{" "}
                          Increment
                        </button>
                        <button
                          className="mx-auto bg-red-500 laptop:ml-5 ml-2 mt-10 text-white p-1 pl-5 pr-5 rounded-md"
                          onClick={() => {
                            document.getElementById('logo').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                            //console.log("decrement");
                            document.getElementById("new-expense-name").value =
                              " ";
                            document.getElementById("increment-amount").value =
                              " ";
                            document.getElementById("decrement").style.display =
                              "block";
                          }}
                        >
                          <FontAwesomeIcon
                            className="  cursor-pointer text-"
                            icon={faMinus}
                          />{" "}
                          Decreament
                        </button>
                      </div>
                    </div>

                    <div></div>
                  </div>
                  {/* increment add */}
                  <div
                    id="money-shower"
                    className="text-center mt-5 overflow-scroll h-[200px] "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* increment value */}
        <div id="increment" className="hidden absolute w-full h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[390px]  md:w-[450px] md:h-[210px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                <FontAwesomeIcon
                  className="  cursor-pointer text-green-500 mr-1"
                  icon={faPlus}
                />
                Increment Amount
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={() => {
                    document.getElementById("increment").style.display = "none";
                  }}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter name of the expense:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[13em] pl-2 text-white mt-1 "
                  placeholder="Increment's Name"
                  id="new-expense-name"
                ></input>

                <div className="mt-[15px] ">
                  <ThemeProvider theme={darkTheme} className="mt-5">
                    <TextField
                      id="increment-amount"
                      label="Amount"
                      type="number"
                      min="0"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </ThemeProvider>
                </div>
                <button
                  className="absolute right-5 bottom-5 bg-green-500 tablet:px-3.5 py-0.5 px-2.5 rounded-md"
                  onClick={() => {
                    let input =
                      document.getElementById("new-expense-name").value;
                    if (input === "") {
                      toast.warn("Please type something");
                    } else {
                      insert_money_add();
                      SelectMoney();
                      document.getElementById("increment").style.display =
                        "none";
                    }
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className="  cursor-pointer text-"
                    icon={faPlus}
                  />{" "}
                  Increment
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* decrement value */}
        <div id="decrement" className="hidden absolute w-full h-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className=" z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[390px]  md:w-[450px] md:h-[210px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                <FontAwesomeIcon
                  className="  cursor-pointer text-red-500 mr-2"
                  icon={faMinus}
                />
                Decrement Amount
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="minus-notes "
                  icon={faXmark}
                  onClick={() => {
                    document.getElementById("decrement").style.display = "none";
                  }}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1">
                <label className="text-[16px] mb-0">
                  Enter name of the expense:
                </label>
                <input
                  className="bg-[#141432] border-2 rounded-md md:pr-[13em] pl-2 text-white mt-1 "
                  placeholder="Decrement's Name"
                  id="new-decrement-name"
                ></input>

                <div className="mt-[15px] ">
                  <ThemeProvider theme={darkTheme} className="mt-5">
                    <TextField
                      id="decrement-amount"
                      label="Amount"
                      type="number"
                      min="0"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </ThemeProvider>
                </div>
                <button
                  className="absolute right-5 bottom-5 bg-red-500 tablet:px-3.5 py-0.5 px-1.5 rounded-md"
                  onClick={() => {
                    let input =
                      document.getElementById("new-decrement-name").value;
                    if (input === "") {
                      toast.warn("Please type something");
                    } else {
                      insert_money_remove();

                      document.getElementById("decrement").style.display =
                        "none";
                    }
                    SelectMoney();
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className="  cursor-pointer text-"
                    icon={faMinus}
                  />{" "}
                  Decrement
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Settings */}
        <div id="settings" className=" hidden  w-full top-0">
          <div className="flex items-center justify-center h-screen bg-blue backdrop-blur-md ">
            <div className="  z-1 relative rounded-md text-white bg-[#141432] p-5 shadow-lg w-[350px]  md:w-[750px] md:h-[450px]  text-center my-auto">
              <div className=" text-1xl p-1 text-left border-b-2  text-[20px]">
                <FontAwesomeIcon
                  className="  mt cursor-pointer text-[25px]"
                  id="plus-notes "
                  icon={faGear}
                />{" "}
                Settings
                <FontAwesomeIcon
                  className=" float-right mt cursor-pointer text-[25px] text-red-600"
                  id="plus-notes "
                  icon={faXmark}
                  onClick={() => {
                    document.getElementById("settings").style.display = "none";
                  }}
                />{" "}
              </div>

              <div className="text-left mt-2 p-1 h-[350px] overflow-auto">
                <div className="">
                  <div className="">
                    <div className="p-5 border-b-2 flex flex-wrap">
                      {/* notifications */}
                      <h1 className="text-[25px] w-1/2">Notifications:</h1>
                      <p>
                        You will be getting email notifications for all the
                        events and reminders. You will be notified 30 min ahead
                        of the event. Notifications for the reminders will be
                        sent at the time mentioned.{" "}
                      </p>
                    </div>
                    <div className="p-5 border-b-2 ">
                      {/* notifications */}
                      <h1 className="text-[25px] w-1/2">FeedBack:</h1>
                      <p> How much would you rate us?</p>
                      <select
                        className=" text-white bg-[#0c0c21] border-2 rounded-lg mt-2"
                        id="star-rating"
                      >
                        <option value="">Select a rating</option>
                        <option value="5">Excellent</option>
                        <option value="4">Very Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Terrible</option>
                      </select>
                      <br></br>

                      <textarea
                        className="bg-[#141432] border-2 rounded-md w-full h-full pl-2 p-2 mt-5 text-white mt-1 "
                        placeholder="Please mention your valuable feedbacks/feature suggestions here."
                        id="feedback"
                      ></textarea>
                      <button className="mt-2 bg-blue-500 px-2 py-2 rounded-md"onClick={()=>{
                          let feedback=document.getElementById('feedback').value
                          let score=document.getElementById('star-rating')
                          score=score.options[score.selectedIndex].value
                          if (score==''){
                            toast.warn("Score can't be none")
                          }
                         
                          if (feedback!==""&&score!==''){
                            feedbacks()
                          }

                        
                        }}>Send Feedback</button>
                    </div>
                    <div className="p-5  ">
                      {/* notifications */}
                      <h1 className="text-[25px] w-1/2"></h1>
                      <p className="text-[25px] w-1/2 ">A <a href="http://techsparkling.github.io/" target="_blank">Vishwa</a>'s Build</p>
                      <p>The best is yet to come : )</p>
                    <p className="">
                     Logo By <a href="https://www.instagram.com/newdimensionalphotography/"  target="_blank">Nitin SV</a>
                      </p>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="flex items-center justify-center h-screen bg-blue">
          <img className="absolute w-auto h-auto" ></img>
          <div className=" bg-white rounded z-1 relative w backdrop-blur-sm shadow-lg w-[350px] h-[450px] md:w-[700px] md:h-[450px]  text-center my-auto">
            <img src={require("./vishlogo.png")} className="w-[300px] mx-auto"></img>
            <div className="  p-5"><p className=" text-xl font-[500]">Hello there, Welcome to Workflow.</p>
            <p>Your all in one productivity manager.</p>
            </div>

            <button className="bg-black rounded mt-5 text-white px-5 py-2" onClick={signin}>
             {/* <FontAwesomeIcon 
             icon={faGoogle} 
             className="mr-5"
             ></FontAwesomeIcon> */}
              Sign in with Google
            </button>
          {localStorage.Email}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
