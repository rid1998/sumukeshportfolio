function validateForm() {
    let fName, lname, email, phoneNum, address, websiteFeedback ,comment, form, apiUrl;
    fName = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    email = document.getElementById("email").value;
    phoneNum = document.getElementById("number").value;
    address = document.getElementById("address").value;
    comment = document.getElementById("comment").value;  
    apiUrl = ''
    form = true;

    const httpRequestBody = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: 0,
        address: '',
        websiteFeedback: false,
        comment: ""
    }
    
    
    // if(!fName) {
    //     alert('First name is required!');
    //     form = false;
    // }

    var emailCheckerRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(!emailCheckerRegEx.test(email)) {
        alert('Please enter a valid email');
        form = false;
    }

    var phonenoRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!phoneNum.match(phonenoRegEx))
        {
        alert("Please enter the phone number in any of xxx-xxx-xxxx or xxx xxx xxxx or xxx.xxx.xxxx formats");
         form = false;
        };

    if(document.getElementsByName('website-feedback')[0].checked) {
        websiteFeedback = true;
    } else if(document.getElementsByName('website-feedback')[1].checked) {
        websiteFeedback = false;
    } else if(document.getElementsByName('website-feedback')[0].checked == false && document.getElementsByName('website-feedback')[1].checked ==false) {
        websiteFeedback = null;
    }   

    if (websiteFeedback == true) {
        alert(fName + ', We are glad to know that you liked our website.');
    } else if(websiteFeedback == false) {
        alert(fName + ', We appreciate your valuable feedback, please feel free to comment what you havent liked in our website.');
     } 
    //else if(websiteFeedback == null){
    //     alert(fName + ', Please take a moment to provide feedback to my website')
    // }
    
    if(form) {
        httpRequestBody.firstName = fName;
        httpRequestBody.lastName = lname;
        httpRequestBody.address =address;
        httpRequestBody.phoneNumber = phoneNum;
        httpRequestBody.email = email;
        httpRequestBody.websiteFeedback = websiteFeedback;
        httpRequestBody.comment = comment;
        window.localStorage.setItem('User-Data', JSON.stringify(httpRequestBody))

        const userData = window.localStorage.getItem('User-Data')
       // console.log(userData)
       }
    alert(fName + ', Thank You For Submitting the Form. Please check your email.');
          return true;
}

const feedbackForm = document.querySelector('.form');


feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    console.log('Submit captured');
    fName = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    email = document.getElementById("email").value;
    phoneNum = document.getElementById("number").value;
    address = document.getElementById("address").value;
    comment = document.getElementById("comment").value; 

    const userData = window.localStorage.getItem('User-Data')


    let formData = {
        firstName: fName,
        lname: lname,
        email: email,
        phoneNum: phoneNum,
        address: address,
        comment: comment,
        websiteFeedback: userData.websiteFeedback
    }

    console.log(formData);

    // fetch('http://localhost:3000/form', {
    //     mode: 'no-cors',
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json',
    //         //'Accept': 'application/json'
    //     },
    //     body: JSON.stringify(formData),
    // })
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log('Error:' , err);
    // })

    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3000/form');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == 'Success') {
            console.log("Response recieved");
            alert('email sent')
            document.location.reload()
        } else {
            alert('something went wrong')
        }
    }

    xhr.send(JSON.stringify(formData))
})

function postFormData () {
    
}

function validateEmail () {
    email = document.getElementById("email").value;
    var emailCheckerRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(!emailCheckerRegEx.test(email)) {
        alert('Please enter a valid email');
    }

}

function validatePhoneNumber() {
    phoneNum = document.getElementById("number").value;
    var phonenoRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!phoneNum.match(phonenoRegEx))
        {
        alert("Please enter the phone number in any of xxx-xxx-xxxx or xxx xxx xxxx or xxx.xxx.xxxx formats");
         false;
        };
}