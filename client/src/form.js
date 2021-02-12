import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {createLogEntry} from './api';

const LogEntryForm = ({onClose , location}) => {
const {register,handleSubmit}= useForm();

const onSubmit = async (data) => {
        try{
            data.longitude=location.longitude;
            data.latitude=location.latitude;
            await createLogEntry(data);
            onClose()

        }catch(error){
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
            <label htmlFor="name">Naslov</label>
            <input type="text" name="title" required ref={register}></input>
            <label htmlFor="description">opis</label>
            <input type="textarea" name="description" rows="3" required ref={register}></input>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LogEntryForm;