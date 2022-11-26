var { initializeApp } = require("firebase/app");
var {
    get,
    getDatabase,
    ref,
    set,
    child,
    remove,
    update,
    push,
} = require("firebase/database");
//   const dbref = ref(db);
console.log(Date())
let text = Date()
text = text.slice(0, 15)

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

const dbref = ref(db)

const interval = setInterval(function() {
    
    console.log(Date())
    // reminders
    get(child(dbref, "/notifications/" + text + "/reminders"))
    .then((snapshot) => {
        if (snapshot.val()) {
            var length = Object.keys(snapshot.val()).length;
            console.log(length);

            for (let i = 0; i < length; i++) {
                var path = Object.keys(snapshot.val())[i];
                console.log(path);
                const dbref = ref(db);
                get(
                    child(
                        dbref,
                        "/notifications/" + text + "/reminders/" + path
                    )
                )
                    .then((snapshot) => {
                        time = Date()
                        time = time.slice(16, 21)
                        if (time == snapshot.val().remindertime) {
                            var nodemailer = require('nodemailer');
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'svishwa75@gmail.com',
                                    pass: 'rupspvxsmpwxzqxx'
                                }
                            });

                            var mailOptions = {
                                from: 'svishwa63@gmail.com',
                                to: snapshot.val().email,
                                subject: `WorkFlow Notification Reminder:${snapshot.val().name}`,
                                text: `Hello ${snapshot.val().username} this is a notification for your reminder ${snapshot.val().name} for ${text} at ${snapshot.val().remindertime} `,
                               
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                        else {
                            console.log("nope")
                        }

                    }
                    )
            }
        }
    }
    )

// events
    get(child(dbref, "/notifications/" + text + "/events"))
    .then((snapshot) => {
        if (snapshot.val()) {
            var length = Object.keys(snapshot.val()).length;
            console.log(length);

            for (let i = 0; i < length; i++) {
                var path = Object.keys(snapshot.val())[i];
                console.log(path);
                const dbref = ref(db);
                get(
                    child(
                        dbref,
                        "/notifications/" + text + "/events/" + path
                    )
                )
                    .then((snapshot) => {
                        time = Date()
                        time = time.slice(16, 21)
                        // to notify 30 min before the event
                        let notify=new Date()
                        notify=notify.toString()
                        let hr=snapshot.val().eventtime
                        hr=hr.slice(0,2)
                        hr=parseInt(hr)
                        console.log(hr)
                        let min=snapshot.val().eventtime
                        min=min.slice(3,5)
                        min=parseInt(min)
                        console.log(min)
                        notify= new Date()
                        notify.setHours(hr)
                        notify.setMinutes(min)
                        notify.setMinutes ( notify.getMinutes() - 30 );
                        console.log("notify: " + notify)
                        notify=notify.toString()
                        notify=notify.slice(16,21)




                       
                        if (time == notify) {
                            var nodemailer = require('nodemailer');
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'svishwa75@gmail.com',
                                    pass: 'rupspvxsmpwxzqxx'
                                }
                            });

                            var mailOptions = {
                                from: 'svishwa63@gmail.com',
                                to: snapshot.val().email,
                                subject: `WorkFlow Notification Event:${snapshot.val().name}`,
                                text: `Hello ${snapshot.val().username} this is a notification for the event ${snapshot.val().name} for ${text} at ${snapshot.val().eventtime} (in 30 min)`,
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                        else {
                            console.log("nope")
                        }

                    }
                    )
            }
        }
    }
    )
    // events direct notify
    get(child(dbref, "/notifications/" + text + "/events"))
    .then((snapshot) => {
        if (snapshot.val()) {
            var length = Object.keys(snapshot.val()).length;
            console.log(length);

            for (let i = 0; i < length; i++) {
                var path = Object.keys(snapshot.val())[i];
                console.log(path);
                const dbref = ref(db);
                get(
                    child(
                        dbref,
                        "/notifications/" + text + "/events/" + path
                    )
                )
                    .then((snapshot) => {
                        time = Date()
                        time = time.slice(16, 21)
                        // to notify 30 min before the event
                        // let notify=new Date()
                        // notify=notify.toString()
                        // let hr=snapshot.val().eventtime
                        // hr=hr.slice(0,2)
                        // hr=parseInt(hr)
                        // console.log(hr)
                        // let min=snapshot.val().eventtime
                        // min=min.slice(3,5)
                        // min=parseInt(min)
                        // console.log(min)
                        // notify= new Date()
                        // notify.setHours(hr)
                        // notify.setMinutes(min)
                        // notify.setMinutes ( notify.getMinutes() - 30 );
                        // console.log("notify: " + notify)
                        // notify=notify.toString()
                        // notify=notify.slice(16,21)




                       
                        if (time == snapshot.val().eventtime) {
                            var nodemailer = require('nodemailer');
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'svishwa75@gmail.com',
                                    pass: 'rupspvxsmpwxzqxx'
                                }
                            });

                            var mailOptions = {
                                from: 'svishwa63@gmail.com',
                                to: snapshot.val().email,
                                subject: `WorkFlow Notification Event:${snapshot.val().name}`,
                                text: `Hello ${snapshot.val().username} this is a notification for the event ${snapshot.val().name} for ${text} at ${snapshot.val().eventtime} (now)`,
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                        else {
                            console.log("nope")
                        }

                    }
                    )
            }
        }
    }
    )

  }, 60000);
 

