import React, { useRef, useState } from 'react';


const Home = () => {
    const inputRef = useRef()
    const inputCountRef = useRef()
    const outputRef = useRef()
    const outputCountRef = useRef()

    const [output, setOutput] = useState();
    const [success, setSuccess] = useState(false)
    const [copyClipboard, setcopyClipboard] = useState()
    const[copySucced,setCopySucced] = useState(false)

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

    //Function for formating output
    const formatJSON = () => {
        const inputData = inputRef.current.value

        try {
            const formated = JSON.stringify(JSON.parse(inputData), null, 4);
            setcopyClipboard(formated)
            const splitedInput = formated.split('\n');

            let id = 0;
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

            // const splitOutput = mainArr.map(el => {
            //     let elemnt = el.map(n => {
            //         if (n.indexOf(':') > -1) {
            //             let index = n.indexOf(':');
            //             let key = n.slice(0, index)
            //             let value = n.slice(index + 1, n.length)
            //             let isNum = value.indexOf('"') === -1 && value.indexOf('{') === -1 ? true : false;
            //             let isStr = value.indexOf('"') !== -1 && value.indexOf('{') === -1 ? true : false;
            //             // console.log('index of',value)
            //             return isNum ? <> <span>{key + ':'}</span> <span style={{ 'color': '#3FA0CF' }}>{value + '\n'}</span> </> : isStr ? <> <span>{key + ':'}</span> <span style={{ 'color': '#A9B6D8' }}>{value + '\n'}</span> </> : <span>{n + '\n'}</span>

            //         } else {
            //             return <span >{n + '\n'}</span>
            //         }
            //     })
            //     return <> <input type="checkbox" onChange={handleChange} />   <p className='open' key={++id}>{elemnt} </p></>
            // })

            const colorSchema = splitedInput.map(singleLine => {
                if (singleLine.indexOf(':') !== -1) {
                    let index = singleLine.indexOf(':');
                    let key = singleLine.slice(0, index + 1)
                    let value = singleLine.slice(index + 1, singleLine.length)
                    let isNum = value.indexOf('"') === -1 && value.indexOf('{') === -1 && value.indexOf('[') === -1 ? true : false;
                    let isStr = value.indexOf('"') !== -1 && value.indexOf('{') === -1 ? true : false;
                    let isBrace = (value.indexOf('[') !== -1 || value.indexOf('{') !== -1 || value.indexOf('}') !== -1 || value.indexOf(']') !== -1) ? true : false;

                    setSuccess(true);
                    if (isNum) {
                        return <div>{key}<span style={{ 'color': '#C18FEB' }}>{value}</span></div>
                    } else if (isStr) {
                        return <div>{key}<span style={{ 'color': '#56E8FF' }}>{value}</span> </div>
                    }
                    else if(isBrace){
                        return  <div>{key}<span style={{ 'color': '#FFF97B' }}>{value}</span> </div>
                    }
                    else {

                        return <div>{singleLine}</div>
                    }


                }
                else {
                    let isBraec = (singleLine.indexOf('[') !== -1 || singleLine.indexOf(']') !== -1 || singleLine.indexOf('{') !== -1 || singleLine.indexOf('}') !== -1) ? true : false;
                    if (isBraec) {

                        return <div style={{ 'color': '#FFF22A' }}>{singleLine}</div>
                    }
                    else {
                        return <div style={{ 'color': '#ED8DB9' }}>{singleLine}</div>
                    }
                    // return <span style={{ 'color': '#ffffff' }}>{singleLine+'\n'}</span>
                }
            })
            outputRef.current.value = formated;
            setOutput(colorSchema);
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
          setTimeout(()=>setCopySucced(false),2000)  
        }
        console.log("copy response", )
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
            <div className={copySucced?'clipboard-notice':'clipboard-notice notice-hide'}>
                <p>Coppied to clipboard</p>
            </div>
        </div>
    );
};

export default Home;