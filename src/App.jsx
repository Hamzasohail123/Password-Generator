import React, { useCallback, useState, useEffect, useRef } from 'react'

const App = () => {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [charactor, setCharactor] = useState(false);
    const [password, setPassword] = useState('');

    const passwordRef = useRef();

    const passwordGenerator = useCallback( ()=>{
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if (number) str = str + '0123456789';
        if (charactor) str += ': ~! @#$%^&*()_-+={[}]|\:;<,>.?/';

        for (let i = 1; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass  += str.charAt(char);
        }


    setPassword(pass);
     
    }, [length,number,charactor,setPassword]);

    const copyPasswordToClipboard = ()=> {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
    }

    useEffect(() => {
      passwordGenerator();
    }, [length,number,charactor,passwordGenerator]);
    


  return (
    <>
    <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        ref={passwordRef}
        readOnly />
      <button className='bg-gray-500 rounded-lg text-white' onClick={copyPasswordToClipboard}>Copy text</button>        
        </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={8}
          max={25}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
           />
           <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input type="checkbox"
         defaultChecked={number}
         id='numberInput'
         onChange={() => setNumber((prev) => !prev)}
        />
           <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input type="checkbox"
         defaultChecked={charactor}
         id='numberInput'
         onChange={() => setCharactor((prev) => !prev)}
        />
           <label htmlFor='numberInput'>Charactor</label>

        </div>


      </div>



    </div>
    </>
  )
}

export default App