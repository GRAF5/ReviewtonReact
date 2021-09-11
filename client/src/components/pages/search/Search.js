import { Link } from '@reach/router';
import { useEffect, useState } from 'react';
import { getAllGroups } from '../../../utils/services/groupService';
import useWindowSize from '../../../utils/useWindowSize';
import Breadcrumb from '../../breadcrumbs/Breadcrumbs';
import CustomLink from '../../link/CustomLink';
import InputStarRating from '../../star-rating/input-star-rating/InputStarRating';
import StarRating from '../../star-rating/StarRating';
import './Search.css';

function Search(props){
    const {width} = useWindowSize();
    const [rating, setRating] = useState(5);
    const [data, setData] = useState();
    useEffect(() => {
        getAllGroups()
            .then(groups => {
                setData(groups);
            });
    }, []);

    //Обработчик изменения рейтинга
    function hE(e){
        setRating(e.target.value);
    }

    return(
        <div className="page-with">
            {/*<InputStarRating rating={rating} handleClick={hE} />
               <div className="rating-wrapper">
                    <StarRating rating={3.45} />
                </div>*/
            }
            <div className="page-container">
                <div className="page-wrapper">      
                    <Breadcrumb>
                        <CustomLink to="/search" value="Поиск"/>
                        <CustomLink to="/search" value="Группы"/>
                    </Breadcrumb>
                    <h1 className="page-name">Поиск статей</h1>
                    <div>
                        <h3>Выберите группу</h3>
                        <div className="data-list">                            
                            {width > 750 ? 
                                <>
                                {data ? 
                                    <div className="row c4">
                                        {data.map((d) => <div key={d.name} className="card"><h4>{d.name}</h4></div>)}
                                    </div>
                                : <h1 className="loading">Загрузка</h1>}
                                </>                             
                            :
                                <>
                                {data ? 
                                    <div className="row c2">
                                        {data.map((d) => <div key={d.name}  className="card"><h4>{d.name}</h4></div>)}
                                    </div>
                                : <h1 className="loading">Загрузка</h1>}
                                </> 
                            }                    
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    );
}

export default Search;