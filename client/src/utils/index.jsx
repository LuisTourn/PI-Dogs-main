const validateForm = (input) => {
    let errors = {};
    
    if(!input.name){
      errors.name = "Name is required";
    }
    else if (!/\S+@\S+\.\S+/.test(input.name)){
      errors.name = "Name is invalid";
    }
    else if(!input.weight){
      errors.weight = "Password is required";
    }
    else if (!/(?=.*[0-9])/.test(input.weight)){
      errors.weight = "Password is invalid";
    }
    return errors;
    }

export {
    validateForm
}