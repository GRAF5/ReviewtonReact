import './AdminGroup.css';
import { useEffect, useState } from 'react';
import { deleteById, getAllGroups } from '../../../../utils/services/groupService';
import CustomLink from '../../../link/CustomLink';
import Button from '../../../input/button/Button';

function AdminGroup(props){
    const [data, setData] = useState();
    useEffect(() => {
        getAllGroups()
            .then(groups => {
                setData(groups);
            });
    }, []);

    function handleDelete(e){
        const res = confirm("Вы уверены что хотите удалить группу "+e.target.name+"?");
        if(res){
            deleteById(e.target.id)
                .then(()=>document.getElementById(e.target.id).remove())
                .catch((err)=>console.log(err));
        }
    }
    return (
        <div className="page-with">
            <div className="page-container">
                <div className="page-wrapper"> 
                    <h1 className="page-name">Администрирование групп</h1>
                    <div className="link">
                        <CustomLink to="/admin/group/add" value="Добавить группу" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Название</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? data.map((d) => 
                                <tr key={d.id} id={d.id}>
                                    <td>{d.name}</td>
                                    <td className="right">
                                        <CustomLink to={"/admin/group/update/"+d.id} variant="contained" value="Изменить" />
                                        &nbsp;
                                        <Button onClick={(e)=>handleDelete(e)} id={d.id} name={d.name} style="danger" value="Удалить" />
                                    </td>
                                    
                                </tr>
                            )
                            :null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminGroup;