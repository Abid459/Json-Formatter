import React from 'react';

const Home = () => {
    return (
        <div className='container'>
            <div className='input-Field'>
                <textarea name="" id="" spellcheck="false">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque alias provident iusto omnis perferendis ab cupiditate doloremque, vel quod rerum nulla odio ipsum rem dolorem incidunt doloribus. Praesentium, debitis amet.</textarea>
            </div>
            <div className='btn'>
                <button>FORMAT JSON</button>
                <button>CLEAR DATA</button>
            </div>
            <div className='output-Field'>
            <textarea name="" id="" cols="30" rows="10" spellcheck="false" readOnly></textarea>
            </div>
        </div>
    );
};

export default Home;