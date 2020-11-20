    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        let Id = profile.getId();
    
        
        let MainContainer = document.getElementById("main")
        let Inbox = document.getElementById("inbox")
        let labels = document.getElementById("labels")
        let Nav = document.getElementById("nav")
        Nav.classList.remove("hide")
        MainContainer.classList.add("hide")
        Inbox.classList.remove("hide")
        labels.classList.remove("hide")


        let ProfilePic = document.getElementById("profile");
        ProfilePic.setAttribute("src",profile.getImageUrl())
        let UserName = document.getElementById("Name")
        UserName.innerText = profile.getName();
        let Email = document.getElementById("email")
        Email.innerText = profile.getEmail()

        function CreateMail(msg){
            let SingleMail = document.createElement("p");
            SingleMail.classList.add("mails")
            SingleMail.innerText = String(msg).substr(0,150);
            Inbox.appendChild(SingleMail)

            SingleMail.addEventListener("click", ()=>{
                alert("clicked")
            })
        }

        function Createlabels(msg){
            let SingleLabel = document.createElement("p");
            SingleLabel.innerText = String(msg)
            SingleLabel.classList.add("Labels")
            labels.appendChild(SingleLabel)
        }

        function authenticate() {
            return gapi.auth2.getAuthInstance()
                .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
                .then(function() { console.log("Sign-in successful"); },
                    function(err) { console.error("Error signing in", err); });
        }
        function loadClient() {
            gapi.client.setApiKey("AIzaSyCL3tu8G68zXRgjJJQD55TXsGP6_ztlmVI");
            return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
                .then(function() {  },
                    function(err) { console.error("Error loading GAPI client for API", err); });
        }

        let Label = "INBOX"

        function GetLabels() {
            return gapi.client.gmail.users.labels.list({
            "userId": Id
            })
                .then(function(response) {
                    for(let i=0; i<response.result.labels.length; i++){
                            labelid = response.result.labels[i].name
                            Createlabels(labelid)
                        }
                    
                        let AllLabel = document.querySelectorAll("p");
                        AllLabel.forEach(currentLabel => {
                            currentLabel.addEventListener("click", ()=>{
                               Label = currentLabel.innerText
                                LoadInbox(Label)
                            })

                        });
                    },
                    function(err) { console.error("Execute error", err); });

        }


      


        let messageid;

        function LoadInbox(labelid) {
            Inbox.innerHTML = "";
            return gapi.client.gmail.users.messages.list({
                "userId": Id,
                "labelIds": [
                    labelid
            ]
            })
                .then(function(response) {
                        for(let i=0; i<response.result.messages.length; i++){
                            messageid = response.result.messages[i].id
                            LoadMsg(messageid)
                        }
                    },
                function(err) { console.error("Execute error", err); });
        }


          function LoadMsg(messageid) {
            return gapi.client.gmail.users.messages.get({
            "userId": Id,   
            "id": messageid,
            "format": "raw"
            }).then(function(response) {
                    // if(response.result.payload.parts[0].body.data){
                    //     let raw = response.result.payload.parts[0].body.data
                    //     console.log(raw);
                    // }
                    
                    console.log(response.result.snippet)
                    CreateMail(response.result.snippet)
            },
            function(err) { console.error("Execute error", err); });
        }
        
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "949258149932-60i8eajtnv5q35cl0amcn7q7qgpl6ihv.apps.googleusercontent.com"});
        });

        let InputText;

        let Searchbar = document.getElementById("search");
        Searchbar.addEventListener("change", ()=>{
            InputText = Searchbar.value
        })

        Searchbar.addEventListener("keyup", function(event) {
            if (event.code === "Enter") {
                event.preventDefault();
                SearchMessages();
            }
        });


        function SearchMessages() {
                Inbox.innerHTML = "";
                return gapi.client.gmail.users.messages.list({
                "userId": Id,
                "q": InputText
                })
                    .then(function(response) {
                    for(let i=0; i<response.result.messages.length; i++){
                            messageid = response.result.messages[i].id
                            LoadMsg(messageid)
                        }
                },
                        function(err) { console.error("Execute error", err); });
            }

        let Search = document.getElementById("search-icon")
        Search.addEventListener("click", ()=>{
            SearchMessages();
        })


        let TOEmail = document.getElementById("compose-to")
        let EmailSubject = document.getElementById("compose-subject")
        let EmailMsg = document.getElementById("compose-message")



        function sendEmail()
            {
            sendMessage(
                {
                'To': TOEmail.value,
                'Subject': EmailSubject.value
                },
                EmailMsg.value,
            );

            return false;
            }

            function sendMessage(headers_obj, message, callback)
            {
            var email = '';

            for(var header in headers_obj)
                email += header += ": "+headers_obj[header]+"\r\n";
                email += "\r\n" + message;

            var sendRequest = gapi.client.gmail.users.messages.send({
                'userId': Id,
                'resource': {
                'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
                }
            });

            return sendRequest.execute(callback);
            }





        authenticate().then(loadClient)

        

        let Exec = document.getElementById("GetMail")
        Exec.addEventListener("click", ()=>{
            LoadInbox(Label)
            GetLabels();
        })


        let SendMail = document.getElementById("send-button")
        SendMail.addEventListener("click", ()=>{
            sendEmail();
        })

        let SignOut = document.getElementById("signOut");

        SignOut.addEventListener("click", ()=>{
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            location.reload();
        });

        })

        const nightMode = document.getElementById("night-mode");
        nightMode.addEventListener("click",()=>{
            if(document.body.style.backgroundColor === "white"){
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
            }else{
            document.body.style.backgroundColor = "white";
            document.body.style.color = "#686d76";
            }


        })


        
        
}
