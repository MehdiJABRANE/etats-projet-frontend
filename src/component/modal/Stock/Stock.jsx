/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Stock(){
    const dispatch = useDispatch();
    const distinctValues = useSelector((state) => state.distinctValues);
    const selectedOptions = useSelector((state) => state.selectedOptions);
    const data = useSelector((state) => state.data);

    const getStock = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/etats/stock',{
                withCredentials: true
            });
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});

        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const PostStock = async (conditions) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/etats/poststockdata', {conditions},{
                withCredentials: true
            });
            console.log(response.data);
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            dispatch({type: 'EMPTY_SELECTED'});
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const handleApercu = () =>{
        PostStock(selectedOptions);
        dispatch({type: 'MODAL_SHOW', payload: {show: false}});
    }

    useEffect(()=>{
        dispatch({type: 'LOADING', payload: {value: true}});
        getStock();
        dispatch({type: 'LOADING', payload: {value: false}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "fSelectEntre", value: "prix_vente"}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "sSelectEntre", value: "SupTotale"}});
    }, [])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log("value", value);
        dispatch({type: 'ADD_SELECTED', payload: {key: id, value: value}});
    }

    useEffect(()=>{
        dispatch({type: 'DISTINCT_VALUES', payload: {array: data, keys: ['Societe','Projet','Tranche','GH','Immeuble','Etage','Nature','Standing']}});
        console.log("Distinct: ", distinctValues);
    },[data]);

    return(
        <>
            <div className='stock-container'>
                <div className="div-select-entre2">
                    <div className='select-container2'>
                        <div className='select-container2-child'>
                            <div className='select-container2-child-label'>
                                <label htmlFor="sSelectEntre">Superficie: </label>
                            </div>
                            <select id='sSelectEntre' className='form-select entre-select' onChange={(e) => handleInputChange(e)} >
                                    <option value="SupTotale">Totale</option>
                                    <option value="SupConstruite">Construite</option>
                                    <option value="SupJardin">Jardin</option>
                                    <option value="SupTitre">Titré</option>
                                    <option value="SupTerCouverte">Terrasse couverte</option>
                                    <option value="SupTerNonCouverte">Terrasse non couverte</option>
                                    <option value="SupMezzanine">Mezzanine</option>
                            </select> 
                        </div>       
                        <div className="form-floating">
                            
                            <input type="text" className="form-control" id="sEntre" onChange={(e) => handleInputChange(e)}/>
                            <label htmlFor="fEntre">Entre</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="sEt" onChange={(e) => handleInputChange(e)} />
                            <label htmlFor="fEt">Et</label>
                        </div>
                    </div>
                </div>
                <div className="modal-body-content-bottom">
                    
                    <div className="div-label">
                        <label htmlFor="">Prix: </label>
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="fEntre" onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="fEntre">Entre</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="fEt" onChange={(e) => handleInputChange(e)} />
                        <label htmlFor="fEt">Et</label>
                    </div>
                </div>
            </div>
            <div className='btn-parent'>
                <Link to="/datatable" className='modal-submit-btn'onClick={()=>{handleApercu()}}>Aperçu</Link>
            </div>
        </>
    )
}