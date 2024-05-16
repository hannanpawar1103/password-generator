import { useState , useCallback , useEffect , useRef } from "react"; 

function App() {
    const [password , setpassword] = useState('')
    const [length, setlength] = useState(8)
    const [numberAllowed, setnumberAllowed] = useState(false);
    const [CharAllowed, setCharAllowed] = useState(false);
    const [iscopied, setiscopied] = useState(false);
    const [timer, setTimer] = useState(10);  
    const passwordref = useRef(null)
    
 
    useEffect(() => {
    const interval = setInterval(() => {
    if (timer > 0) {
    setTimer((prevTimer) => prevTimer - 1); 
    }else if(timer <=0){
        location.reload();
    }else{ 
    clearInterval(interval); 
    }
    }, 1000);

    return () => {
    clearInterval(interval);  
    };
    }, [timer]); 



    function copypasswordtoclipboard(event) {
        event.preventDefault();
        passwordref.current?.select();
        passwordref.current?.setSelectionRange(8, 20);
        window.navigator.clipboard.writeText(password);
        setiscopied(true) 
        } 

        function refresher(){ 
            passwordgenerator();
        }


    const passwordgenerator = useCallback(()=>{
        let pass = ''
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

        if (numberAllowed) str += '1234567890'
        if (CharAllowed) str += '!@#$%^&*-_+=[]{}~'

        for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)    
        }

        setpassword(pass)
        
    },[length,numberAllowed,CharAllowed,setpassword ])


    useEffect(()=>{
        passwordgenerator()
    },[length,setpassword,numberAllowed,CharAllowed])
 


    return(
        <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500"> 
            <h1 className="text-white text-center my-3">Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4 justify-between">
            <input 
            type="text" 
            readOnly
            placeholder="password"
            value={password}
            useref = {passwordref}
            className="rounded-lg outline-none w-full py-1 px-3 m-4"  
            />
            <button  onClick={copypasswordtoclipboard}  className="changebackground copytoclipboard outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 m-3 rounded-lg"> { iscopied ? 'copied': 'copy'}</button>
            <button class="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 m-3 rounded-lg" onClick={refresher}>New pass</button>
            </div>
            <div className="flex">
            <div>
            <input 
            type="range" 
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
          />
            <label className="mx-2 text-white">length:{length}</label>
            </div>
            <div>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
           let prevvalue = setnumberAllowed((prev)=>!prev) 
          }}
         />
        <label className="mx-2 text-white" htmlFor="numberInput">Numbers</label>
            </div>
            <div>
        <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="characterInput"
              onChange={() => { 
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label className="mx-2 text-white" htmlFor="characterInput">Characters</label>
            </div>
            </div>
        </div>
        <div className="App">
            <h1 className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 m-3 rounded-lg text-white px-3 py-0.5 shrink-0 m-3 rounded-lg max-w-sm mx-auto">New password will arrive in {timer} seconds</h1>
        </div>
        </>

    )

}

export default App