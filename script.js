
        let Detailspara = document.getElementById("Details");
        
        
        function onSignIn(googleUser) {
                location.href = "inbox.html";
                var profile = googleUser.getBasicProfile();
                Detailspara.innerText = profile.getId();
                console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        }