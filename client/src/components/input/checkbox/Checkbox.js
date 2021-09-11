import './Checkbox.css';

function Checkbox({id, name, value, label, onChange, checked}){
    const labelComp = label ? <label>{label}</label> :null;

    function handleClick(e){
        const ev = {
            target:{
                name: e.target.name,
                value: e.target.checked,
                id: e.target.id
            }
        }
        onChange(ev)
    }

    return(
        <div className="checkbox-form">
            {labelComp}
            <input id={id} name={name} onChange={(e)=>handleClick(e)} className="checkbox" type="checkbox" checked={checked} />
        </div>
    )
}

export default Checkbox;