import React, { useRef } from 'react';


const Home = () => {
    const inputRef = useRef()
    const inputCountRef = useRef()
    const outputRef = useRef()
    const outputCountRef = useRef()


    // scroll match of count and text editor
    const matchScroll = () => {
        inputCountRef.current.scrollTop = inputRef.current.scrollTop;
        inputRef.current.scrollTop = inputCountRef.current.scrollTop;


        inputCountRef.current.scrollLeft = inputRef.current.scrollLeft;

        
        outputCountRef.current.scrollTop = outputRef.current.scrollTop;
    }


    let lineCountCache = 0;

    const checkTabKey = (e) => {
        // e.preventDefault();

        // console.log(e.code)
        // console.log("Thsi is carret position satr", b)
        // console.log("Thsi is carret position end", bc)
        if (e.code === 'Tab') {
            // e.target.value += "    ";
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.setRangeText('    ', start, end);
            e.target.selectionStart += 4;
            e.preventDefault()
        }
    }

    const lineCountOut = (output) => {
        console.log("changed")
        let lineCount = output.split('\n').length;
        console.log('Line count', lineCount)
        let countArr = [];
        if (lineCountCache !== lineCount) {
            for (let i = 0; i < lineCount; i++) {
                countArr[i] = (i + 1) + '.';
            }
            // inputCountRef.current.value = countArr.join('\n')
            outputCountRef.current.value = countArr.join('\n')
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

            lineCountOut(outputRef.current.value)
            console.log("Output", outputRef.current.value)
        } catch (error) {
            outputRef.current.value = error
        }

    }
//Function to clear all data 
    const clearField = () => {
        inputRef.current.value = '';
        outputRef.current.value = '';
        inputCountRef.current.value = '';
        outputCountRef.current.value = '';

    }


    //Function to count input Line
    const lineCount = (e) => {
        let lineCount = e.target.value.split('\n').length;
        console.log('Line count', lineCount)
        let countArr = [];
        if (lineCountCache !== lineCount) {
            for (let i = 0; i < lineCount; i++) {
                countArr[i] = (i + 1) + '.';
            }
            inputCountRef.current.value = countArr.join('\n')
        }
    }



    return (
        <div className='container'>
            <div className='input-Field'>
                <textarea ref={inputCountRef} name="" id="" className='line-count' placeholder='1.' onScroll={matchScroll} readOnly></textarea>
                <textarea className='text-field' name="" id="" spellcheck="false" ref={inputRef} onKeyDown={checkTabKey} onInput={lineCount} onScroll={matchScroll} placeholder="Input JSON .." wrap='off' ></textarea>
            </div>
            <div className='btn'>
                <button onClick={formatJSON}>FORMAT JSON</button>
                <button onClick={clearField}>CLEAR DATA</button>
            </div>
            <div className='output-Field'>
                <textarea ref={outputCountRef} name="" id="" className='line-count' placeholder='1.' onScroll={matchScroll} readOnly></textarea>
                <textarea className='text-field' cols="30" rows="10" spellcheck="false" onScroll={matchScroll} ref={outputRef} readOnly  wrap='off' ></textarea>
            </div>
        </div>
    );
};

export default Home;