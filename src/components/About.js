import React , {useContext, useEffect} from 'react'
// import noteContext from '../context/noteContext';

export default function About(props) {

// noteContext demo
//   const a = useContext(noteContext);
//   useEffect(()=>{
//     a.update();
//     // eslint-disable-next-line   
// }, [])
  return (
    <div style={{color: props.mode==="light"? "black" : "white" }}>
      This is Abouter and
    </div>
  )
}
