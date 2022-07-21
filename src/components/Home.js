import React, { useRef } from 'react';

const Home = () => {
    const inputRef = useRef()
    const outputRef = useRef()
    const checkTabKey = (e) => {
        // e.preventDefault();

        // console.log(e.code)
        // console.log("Thsi is carret position satr", b)
        // console.log("Thsi is carret position end", bc)
        if (e.code === 'Tab') {
            // e.target.value += "    ";
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.setRangeText('    ',start,end);
            e.target.selectionStart += 4;
            e.preventDefault()
        }
    }


    const formatJSON = () => {
        const inputData = inputRef.current.value
        // const b = JSON.parse(inputData)
        // console.log('parse',b)
        // console.log(typeof('input is',))
        try {
            const formated = JSON.stringify(JSON.parse(inputData), null, 4);
            outputRef.current.value = formated;
            console.log(inputRef.current.value)
        } catch (error) {
            outputRef.current.value = error
        }

    }


    const clearField = () =>{
        inputRef.current.value = '';
        outputRef.current.value = '';

    }
    return (
        <div className='container'>
            <div className='input-Field'>
                <textarea name="" id="" spellcheck="false" ref={inputRef} onKeyDown={checkTabKey}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque alias provident iusto omnis perferendis ab cupiditate doloremque, vel quod rerum nulla odio ipsum rem dolorem incidunt doloribus. Praesentium, debitis amet.</textarea>
            </div>
            <div className='btn'>
                <button onClick={formatJSON}>FORMAT JSON</button>
                <button onClick={clearField}>CLEAR DATA</button>
            </div>
            <div className='output-Field'>
                <textarea name="" id="" cols="30" rows="10" spellcheck="false" ref={outputRef} readOnly ></textarea>
            </div>
        </div>
    );
};

export default Home;