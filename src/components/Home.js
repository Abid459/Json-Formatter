import React, { useEffect, useRef, useState } from 'react';


const Home = () => {
    const inputRef = useRef()
    const inputCountRef = useRef()
    const outputRef = useRef()
    const outputCountRef = useRef()

    const [output, setOutput] = useState();
    const [collapse, setCollapse] = useState(true);


    const handleChange = (e) => {
        // setCollapse(!collapse);
        // console.log(collapse)
        console.dir("Reading checked",e.target.checked)
    }

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
            // inputCountRef.current.value = countArr.join('\n')
            outputCountRef.current.value = countArr.join('\n')
        }
    }


    //Function for formating output
    const formatJSON = () => {
        // setOutput('auesdaihsud')
        const inputData = inputRef.current.value
        // const inputData = '{"name" : "abid","age":23, "others":{"hobby":"mango eating"}}'
        // const b = JSON.parse(inputData)
        // console.log('parse',b)
        // console.log(typeof('input is',))
        try {
            const formated = JSON.stringify(JSON.parse(inputData), (key, value) => {
                return typeof value === 'number' ? value : value
            }, 4);
            const nn = formated.split('\n');

            // console.log("This is array",nn.split('}'))

            let id = 0;
            let mainArr = []
            let objectArr = [];
            let output
            for (let i = 0; i < nn.length; i++) {
                if (nn[i].indexOf('[') !== -1 || nn[i].indexOf(']') !== -1) {
                    objectArr.push(nn[i])
                    mainArr.push(objectArr)
                    objectArr = []
                    continue
                }

                else if (nn[i].indexOf('{') !== -1) {
                    objectArr.push(nn[i])
                } else if (nn[i].indexOf('}') === -1) {
                    objectArr.push(nn[i])
                    continue

                } else if (nn[i].indexOf('}') !== -1) {
                    objectArr.push(nn[i])
                    mainArr.push(objectArr)
                    objectArr = []

                    //  setOutput(<li className='open' key={++id}>{ objectArr.join('\n')}</li>);
                    //  objectArr =[]
                }
            }
{/* <div> <input type="checkbox" for={el[0]} />   <p id={el[0]} className='open' onClick={handleClick} key={++id}>{el.join('\n')} </ p></div> */}
            const splitOutput = mainArr.map(el => {
                let elemnt = el.map(n => {
                    if (n.indexOf(':') > -1) {
                        let index = n.indexOf(':');
                        let key = n.slice(0, index)
                        let value = n.slice(index + 1, n.length)
                        let isNum = value.indexOf('"') === -1 && value.indexOf('{') === -1 ? true : false;
                        let isStr = value.indexOf('"') !== -1 && value.indexOf('{') === -1 ? true : false;
                        // console.log('index of',value)
                        return isNum ? <> <span>{key + ':'}</span> <span style={{ 'color': '#3FA0CF' }}>{value + '\n'}</span> </> : isStr ? <> <span>{key + ':'}</span> <span style={{ 'color': '#A9B6D8' }}>{value + '\n'}</span> </> : <span>{n + '\n'}</span>

                    } else {
                        return <span >{n + '\n'}</span>
                    }
                })
                return <> <input type="checkbox" onChange={handleChange} />   <p className='open' key={++id}>{elemnt} </p></>
            })
            console.log('class', collapse)
            console.log("Thisi main array", mainArr)
            // const ss = nn.split(':')
            const mm = nn.map(n => {
                if (n.indexOf(':') > -1) {
                    let index = n.indexOf(':');
                    let key = n.slice(0, index)
                    let value = n.slice(index + 1, n.length)
                    let isNum = value.indexOf('"') === -1 && value.indexOf('{') === -1 ? true : false;
                    let isStr = value.indexOf('"') !== -1 && value.indexOf('{') === -1 ? true : false;
                    // console.log('index of',value)
                    return isNum ? <> <span>{key + ':'}</span> <span style={{ 'color': '#3FA0CF' }}>{value + '\n'}</span> </> : isStr ? <> <span>{key + ':'}</span> <span style={{ 'color': '#A9B6D8' }}>{value + '\n'}</span> </> : <span>{n + '\n'}</span>

                }
                else {
                    return <span>{n + '\n'}</span>
                }
            })
            // const mm = nn.map(n=> <span style={{'color':'#004297f7'}}>{n+'\n'}</span>)
            outputRef.current.value = formated;
            setOutput(splitOutput);
            lineCountOut(outputRef.current.value)
            // console.log("Output", outputRef.current.value)
        } catch (error) {
            outputRef.current.value = error
            console.dir(error)
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



    return (
        <div className='container'>
            <div className='input-Field'>
                <textarea ref={inputCountRef} name="" id="" className='line-count' placeholder='1.' onScroll={matchScroll} readOnly></textarea>
                <textarea className='text-field' name="" id="" spellcheck="false" ref={inputRef} onKeyDown={checkTabKey} onInput={lineCount} onScroll={matchScroll} placeholder="Input JSON .." wrap='off' >
                </textarea>
            </div>
            <div className='btn'>
                <button onClick={formatJSON}>FORMAT JSON</button>
                <button onClick={clearField}>CLEAR DATA</button>
            </div>
            <div className='output-Field'>
                <textarea ref={outputCountRef} name="" id="" className='line-count' placeholder='1.' onScroll={matchScroll} readOnly></textarea>
                <pre className='text-field' spellcheck="false" onScroll={matchScroll} ref={outputRef} wrap={false} >{output}</pre>
            </div>
        </div>
    );
};

export default Home;