function checkDuplicatePassword() {
    const username = document.getElementsByName('username')[0].value
    let flag = true
    if(username.length < 3){
        flag = false
        document.getElementsByClassName('error')[0].innerHTML = 'Username must be at least 3 characters'
    }
    const password = document.getElementsByName('password')[0].value
    if(password.length < 8 && flag){
        flag = false
        document.getElementsByClassName('error')[0].innerHTML = 'Password must be at least 8 characters'
    }
    const repassword = document.getElementsByName('repassword')[0].value
    if(password !== repassword && flag){
        flag = false
        document.getElementsByClassName('error')[0].innerHTML = 'Password must be duplicate'
    }
    if(flag){
        document.getElementsByName('signup')[0].submit()
    }
}

