import React, { useReducer, useRef, useState } from 'react';
import ReactDOM from 'react-dom';


const Home = () => {
    const inputRef = useRef()
    const inputCountRef = useRef()
    const outputRef = useRef()
    const outputCountRef = useRef()
    const aaa = useRef(false)
    const [output, setOutput] = useState();
    const [success, setSuccess] = useState(false)
    const [copyClipboard, setcopyClipboard] = useState()
    const [copySucced, setCopySucced] = useState(false)


    let id = 0;

    // scroll match of count and text editor
    const matchScroll = () => {
        inputCountRef.current.scrollTop = inputRef.current.scrollTop;
        inputRef.current.scrollTop = inputCountRef.current.scrollTop;
        inputCountRef.current.scrollLeft = inputRef.current.scrollLeft;
        outputCountRef.current.scrollTop = outputRef.current.scrollTop;
    }

    //Tab key functionallity
    const checkTabKey = (e) => {
        if (e.code === 'Tab') {
            // e.target.value += "    ";
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.setRangeText('    ', start, end);
            e.target.selectionStart += 4;
            e.preventDefault()
        }
    }

    //Function that count line
    let lineCountCache = 0;
    const lineCountOut = (output) => {
        // console.log("changed")
        let lineCount = output.split('\n').length;
        // console.log('Line count', lineCount)
        let countArr = [];
        if (lineCountCache !== lineCount) {
            for (let i = 0; i < lineCount; i++) {
                countArr[i] = (i + 1) + '.';
            }
            outputCountRef.current.value = countArr.join('\n')
        }
    }


    const handleClick = (e) => {
        let node = ReactDOM.findDOMNode(e.target);
        node.classList.toggle("caret-down");
        console.log('nodeList', node)
        node.querySelector(".nested").classList.toggle("hide");
        node.querySelector(".nested-hiden-object").classList.toggle("active");
        console.log("Thsi is node list", node.parentElement)
    }
    const handleClickArray = (e) => {
        aaa.current = !aaa.current;
        let node = ReactDOM.findDOMNode(e.currentTarget.parentElement.querySelector(".caretArray"));
        node.classList.toggle("caretArray-down");
        node.parentElement.querySelector(".nestedArr").classList.toggle("hide");
        node.parentElement.querySelector(".nested-heden-array").classList.toggle("active");
        // console.log('parent element', node.parentElement.querySelector(".nested"))

    }


    //Function for formating output
    const formatJSON = () => {
        const inputData = inputRef.current.value

        try {
            const formated = JSON.stringify(JSON.parse(inputData), null, 4);
            const parse = JSON.parse(inputData);
            console.log('after parse', JSON.parse(inputData), null, 4)

            let objectArrr = [];
            const a = typeof (parse);
            console.log(a)
            let arrayEl = [];

            function formatArray(key, value = null, tab = '    ') {
                if (value === null) {
                    const uu = parse.map(el => {
                        console.log('this is iterating element', el)
                        return formatObject(el, '        ')
                    })
                    arrayEl = [...uu];
                    return <div><span style={{ 'color': '#FFF97B' }}>[</span>{arrayEl.map(e => <div>{e}</div>)}</div>
                } else {

                    arrayEl = [...value];
                }
                return <div onClick={handleClickArray} className='caretArray' >{tab}"{key}": <span style={{ 'color': '#FFF97B' }} >[</span><span className='nestedArr'> {arrayEl.map(e => <div className='nestedArr' style={{ 'color': '#ED8DB9' }}>{tab}{tab}"{e}",</div>)}</span>{tab}<span className='nested-heden-array hide'>...</span> <span style={{ 'color': '#FFF97B' }} >]</span></div>
            }

            function formatObject(items, tab = '    ') {
                for (const item in items) {
                    if (typeof (items[item]) === 'string') {
                        objectArrr.push(<div>{tab}"{item}": <span style={{ 'color': '#56E8FF' }}>{JSON.stringify(items[item])},</span></div>)
                    }
                    else if (typeof (items[item]) === 'number') {
                        objectArrr.push(<div>{tab}"{item}": <span style={{ 'color': '#C18FEB' }}>{items[item]},</span></div>)
                    }
                    else if (Array.isArray(items[item])) {
                        objectArrr.push(formatArray(item, items[item], tab))
                    }
                    else if (typeof((items[item])) ==='object' && !Array.isArray(items[item])) {
                        // console.log('we found a object',formatObject(items[item]))
                        // formatObject(items[item])
                    }

                }
                let objecTab = tab.length > 4 ? tab.slice(0, tab.length / 2) : '';

                const output = <div key={++id} className='caret' onClick={handleClick}><span style={{ 'color': '#FFF97B' }}>{objecTab}&#123;</span><span className='nested'>{objectArrr}</span><span className='nested-hiden-object hide'>...</span>{objecTab}<span style={{ 'color': '#FFF97B' }} >&#125;</span>  </div>;
                objectArrr = [];
                return output;
            }

            if (a === 'object' && !Array.isArray(parse)) {
                setOutput(formatObject(parse))

            } else if (Array.isArray(parse)) {
                const displayArray = formatArray(parse)
                setOutput(displayArray)
                console.log("Inside array element")
            }


            setcopyClipboard(formated)
            const splitedInput = formated.split('\n');


            let mainArr = []
            let objectArr = [];
            for (let i = 0; i < splitedInput.length; i++) {
                if (splitedInput[i].indexOf('[') !== -1 || splitedInput[i].indexOf(']') !== -1) {
                    objectArr.push(splitedInput[i])
                    mainArr.push(objectArr)
                    objectArr = []
                    continue
                }

                else if (splitedInput[i].indexOf('{') !== -1) {
                    objectArr.push(splitedInput[i])
                } else if (splitedInput[i].indexOf('}') === -1) {
                    objectArr.push(splitedInput[i])
                    continue

                } else if (splitedInput[i].indexOf('}') !== -1) {
                    objectArr.push(splitedInput[i])
                    mainArr.push(objectArr)
                    objectArr = []
                }
            }
            console.log('This is main array', mainArr);

            outputRef.current.value = formated;
            // setOutput(output);
            lineCountOut(outputRef.current.value)
        } catch (error) {
            setOutput(error.message)
        }

    }
    //Function to clear all data 
    const clearField = () => {
        inputRef.current.value = '';
        outputRef.current.value = '';
        inputCountRef.current.value = '';
        outputCountRef.current.value = '';
        setOutput('')
        setSuccess(false);

    }

    //Function to count input Line
    const lineCount = (e) => {
        let lineCount = e.target.value.split('\n').length;
        // console.log('Line count', lineCount)
        let countArr = [];
        if (lineCountCache !== lineCount) {
            for (let i = 0; i < lineCount; i++) {
                countArr[i] = (i + 1) + '.';
            }
            inputCountRef.current.value = countArr.join('\n')
        }
    }

    //
    const handleCopy = () => {
        const res = navigator.clipboard.writeText(copyClipboard);
        if (res ? true : false) {
            setCopySucced(true)
            setTimeout(() => setCopySucced(false), 2000)
        }
        console.log("copy response",)
    }


    return (
        <div className='container'>
            <div className='input-Field'>
                <textarea ref={inputCountRef} name="" id="" className='line-count' placeholder='1.' onScroll={matchScroll} readOnly></textarea>
                <textarea className='text-field' name="" id="" spellCheck="false" ref={inputRef} onKeyDown={checkTabKey} onInput={lineCount} onScroll={matchScroll} placeholder="Input JSON .." wrap='off' >
                </textarea>
            </div>
            <div className='btn'>
                <button onClick={formatJSON}>FORMAT JSON</button>
                <button onClick={clearField}>CLEAR DATA</button>
                {success && <button class="btn" onClick={handleCopy}>COPY TO CLIPBOARD</button>}
            </div>
            <div className='output-Field'>
                <textarea ref={outputCountRef} className='line-count' placeholder='1.' onScroll={matchScroll} readOnly></textarea>
                <pre className='text-field' spellCheck="false" onScroll={matchScroll} ref={outputRef} wrap={false} >{output}</pre>
            </div>
            <div className={copySucced ? 'clipboard-notice' : 'clipboard-notice notice-hide'}>
                <p>Coppied to clipboard</p>
            </div>
        </div>
    );
};

export default Home;