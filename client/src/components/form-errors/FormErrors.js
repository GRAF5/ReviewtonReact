import './FormErrors.css';

function FormErrors({errors}) {
    var errorsComp = "";
    if(errors){
        errorsComp = errors.map((err) => <li key={err} className="form-error">{err}</li>);
    }

    return(
        <>
            {errors? <ul className="form-errors">
                        {errorsComp}
                     </ul>
                    :""}
        </>
    )
}

export default FormErrors;