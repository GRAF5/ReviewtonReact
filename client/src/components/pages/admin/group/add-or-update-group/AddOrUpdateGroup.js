import { navigate } from '@reach/router';
import { useState, useEffect } from 'react';
import { createGroup, getGroup, updateGroup } from '../../../../../utils/services/groupService';
import FormErrors from '../../../../form-errors/FormErrors';
import Button from '../../../../input/button/Button';
import Checkbox from '../../../../input/checkbox/Checkbox';
import InputField from '../../../../input/input-field/InputField';
import useWindowSize from '../../../../../utils/useWindowSize';
import './AddOrUpdateGroup.css';

function AddOrUpdateGroup(params){
    const {width} = useWindowSize()
    const [group, setGroup] = useState();
    const [newGgroup, setNewGroup] = useState({
        name:"",
        categories:[]
    });
    const [selectedCategory, setSelectedCategory] = useState({
        name: null,
        index: -1
    });
    const [newCategory, setNewCategory] = useState({
        name:"",
        atributes:[]
    });
    const [catKey, setCatKey] = useState(1);
    const [errors, setErrors] = useState();
    const deleteCategoryButton = (category) => <Button  style="danger form-group-button" id={category.name} onClick={(e)=>deleteCategory(e)} value="Удалить" />;
    //Получение Группы из БД и копирование её в newGgroup
    useEffect(() => {
        if(params.id)
        getGroup(params.id)
            .then(group => {
                setGroup(group);
                setNewGroup(group);
                setCatKey(group.categories.length + 1);
            });
    }, []);
    //Копирование параметров выбранной категории в newCategory
    useEffect(() => {
        if(selectedCategory.name !== null)
        setNewCategory(newGgroup.categories[newGgroup.categories.findIndex((cat) => cat.name === selectedCategory.name)]);
    }, [selectedCategory]);

    //Изменение названия группы
    function onChangeGroupName(e){
        const {id, value} = e.target;
        setNewGroup({...newGgroup, [id]: value})
    }
    //Изменение названия категории
    function changeCategoryName(e){
        const {value} = e.target;
        setNewCategory({...newCategory, ["name"]: value})
    }

    function saveCategoryChange(){
        var arr = newGgroup.categories.slice();
        arr[selectedCategory.index] = newCategory;
        setNewGroup({...newGgroup, ["categories"]:arr});
        setNewCategory({
            name:"",
            atributes:[]
        });
        setSelectedCategory({name:null, index:-1});
    }
    //Удаление атрибута из категории
    function deleteAtribute(e){
        const {id} = e.target;
        var arr = newCategory.atributes.slice();
        arr.splice(arr.findIndex((atr)=>atr.name === id),1 );
        setNewCategory({...newCategory, ["atributes"]: arr});    
    }
    //Удаление категории из группы
    function deleteCategory(e){
        const {id} = e.target;
        var arr = newGgroup.categories.slice();
        arr.splice(arr.findIndex((category)=>category.name === id),1 );
        setNewGroup({...newGgroup, ["categories"]: arr});  
    }
    //Изменение имени или переменной isArray атрибута
    function changeAtribute(e){
        const {id, name, value} = e.target;
        var arr = newCategory.atributes.slice();
        var atrIndex = arr.findIndex((atr)=>atr.name === id);
        arr[atrIndex] = {...arr[atrIndex], [name]:value};
        setNewCategory({...newCategory, ["atributes"]: arr});  
    }
    //Добавление нового атрибута в категорию
    function addAtribite(){
        var arr = newCategory.atributes.slice();
        arr.push({name:"Атрибут "+(arr.length + 1)});
        setNewCategory({...newCategory, ["atributes"]: arr}); 
    }
    //Добавление новой категории в группу
    function addCategory(){
        var arr = newGgroup.categories.slice();
        arr.push({name:"Категория "+(catKey), atributes:[]});
        setNewGroup({...newGgroup, ["categories"]: arr}); 
        setCatKey(catKey+1);
    }
    function saveGroup(){
        if(params.id){
            updateGroup(newGgroup)
                .catch(err=>setErrors(err));
        }
        else{
            createGroup(newGgroup)
                .catch(err=>setErrors(err));
        }
    }
    const pageName = params.id ? 
                                group ? <h1 className="page-name">Изменение группы {group.name}</h1> 
                                        : <h1 className="page-name">Загрузка</h1>
                                : <h1 className="page-name">Добавление группы</h1>
    return(
        <div className="page-with">
        {width > 750 ?
            <div className="page-container">
                <div className="page-wrapper"> 
                    {pageName}
                    <FormErrors errors={errors} />
                    <InputField id="name" onChange={(e)=>onChangeGroupName(e)} label="Название группы" value={newGgroup.name}/>
                    <section className="indent-section">
                        <h3 className="section-name">Категории</h3>                        
                        {
                            newGgroup.categories? newGgroup.categories.map((category, index) =>
                                selectedCategory.name === category.name ?
                                    newCategory &&
                                        <div key={category.name +" "+ index} className="category">
                                            <div className="category-header">
                                                <div className="left-values">
                                                    <InputField onChange={(e) => changeCategoryName(e)} id="name" label="Название категории" value={newCategory.name}/>
                                                </div>
                                                <div className="right-values">
                                                    <Button onClick={()=>saveCategoryChange()} style="success" value="Сохранить" />
                                                    &nbsp;
                                                    <Button onClick={()=>setSelectedCategory({name:null,index:-1})} style="warning" value="Отменить" />
                                                    &nbsp;
                                                    {deleteCategoryButton(category)}
                                                </div>
                                            </div>
                                            <section className="indent-section">
                                                <h4 className="section-name">Атрибуты</h4> 
                                                {
                                                    newCategory.atributes ? newCategory.atributes.map((atr, index) => 
                                                        <div key={category.name +" "+ index} id={atr.name} className="atribute">
                                                            <div className="atribute-header">
                                                                <div className="left-values">
                                                                    <InputField onChange={(e)=>changeAtribute(e)} id={atr.name} name="name" value={atr.name}/>
                                                                    &nbsp;
                                                                    <Checkbox onChange={(e)=>changeAtribute(e)} id={atr.name} name="isArray" label="Множество?" checked={atr.isArray} />
                                                                </div>
                                                                <div className="right-values">
                                                                    <Button id={atr.name} onClick={(e)=>deleteAtribute(e)} style="danger" value="Удалить" />
                                                                </div>
                                                            </div>
                                                        </div>)
                                                        :null
                                                }
                                                <Button onClick={addAtribite} value="Добавить атрибут" /> 
                                            </section>                                                        
                                        </div>
                                : 
                                <div key={category.name +" "+ index} className="category">
                                    <div className="category-header">
                                        <div className="left-values">
                                            <p>{category.name}</p>
                                        </div>
                                        <div className="right-values">
                                            <Button onClick={()=>setSelectedCategory({name:category.name, index:index})} value="Изменить" />
                                            &nbsp;
                                            {deleteCategoryButton(category)}
                                        </div>
                                    </div>    
                                </div>)
                            :null
                        }
                        <Button onClick={addCategory} value="Добавить категорию" />
                    </section>
                    <div className="buttons">
                        <Button onClick={saveGroup} style="success" value="Сохранить" />
                        &nbsp;
                        <Button onClick={()=>navigate(-1)} style="warning" value="Отменить изменения" />
                    </div>
                </div>                
            </div>
            :
            <>
            <div className="box-shadow">
                <div className="wrapper">
                    {pageName}
                    <FormErrors errors={errors} />
                    <InputField id="name" onChange={(e)=>onChangeGroupName(e)} label="Название группы" value={newGgroup.name}/>
                </div>
            </div>
            <div className="box-shadow-additional">
                <div className="wrapper">
                    <h3 className="section-name">Категории</h3>
                    {
                        newGgroup.categories? newGgroup.categories.map((category, index) =>
                            selectedCategory.name === category.name ?
                                newCategory &&
                                    <div key={category.name +" "+ index} className="category">
                                        <InputField onChange={(e) => changeCategoryName(e)} id="name" label="Название категории" value={newCategory.name}/>
                                        
                                        <div className="box-shadow">
                                            <div className="wrapper">
                                            <h4 className="section-name">Атрибуты</h4> 
                                            {
                                                newCategory.atributes ? newCategory.atributes.map((atr, index) => 
                                                    <div key={category.name +" "+ index} id={atr.name} className="atribute">
                                                        <InputField onChange={(e)=>changeAtribute(e)} id={atr.name} label="Название атрибута" name="name" value={atr.name}/>
                                                        <Checkbox onChange={(e)=>changeAtribute(e)} id={atr.name} name="isArray" label="Множество?" checked={atr.isArray} />
                                                        <Button style="danger form-group-button" id={atr.name} onClick={(e)=>deleteAtribute(e)} value="Удалить" />
                                                        
                                                    </div>)
                                                    :null
                                            }
                                            <Button style="form-group-button" onClick={addAtribite} value="Добавить атрибут" /> 
                                            </div>
                                        </div>          
                                        <Button style="success form-group-button" onClick={()=>saveCategoryChange()} value="Сохранить" />
                                        <Button style="warning form-group-button" onClick={()=>setSelectedCategory({name:null,index:-1})} value="Отменить" />
                                        {deleteCategoryButton(category)}                                              
                                    </div>
                            : 
                            <div key={category.name +" "+ index} className="box-shadow">
                                <div className="wrapper">
                                        <p>{category.name}</p>
                                        <Button style="form-group-button" onClick={()=>setSelectedCategory({name:category.name, index:index})} value="Изменить" />
                                        {deleteCategoryButton(category)}                                    
                                </div>    
                            </div>)
                        :null
                    }
                    <Button style="form-group-button" onClick={addCategory} value="Добавить категорию" /> 
                </div>
            </div>
            <div className="box-shadow-additional">
                <div className="wrapper">
                    <Button style="success form-group-button" onClick={saveGroup}value="Сохранить" />
                    <Button style="warning form-group-button" onClick={()=>navigate(-1)} value="Отменить изменения" />
                </div>
            </div>
            </>
        }
        </div>
    )
}

export default AddOrUpdateGroup;