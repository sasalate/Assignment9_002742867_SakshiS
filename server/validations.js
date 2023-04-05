const validateName = (fullname) =>
{
  var name=  /^[A-Za-z]+$/;
  if(fullname.match(name)) 
  { 
    return true;
  } else { 
    return false;
  }
}

const validateEmail = (mail)  =>
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }

  return (false)
}

const checkPassword = (inputtxt) => { 
  var passw=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if(inputtxt.match(passw)) 
  { 
    return true;
  } else { 
    return false;
  }
}

module.exports = { validateName, validateEmail, checkPassword };