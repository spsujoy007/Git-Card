import Image from 'next/image';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { FaGithubAlt } from 'react-icons/fa';
import { createFileName, useScreenshot } from 'use-react-screenshot';
import { createRef, useState } from 'react';
import { Inter } from 'next/font/google';
import bgimg from '../../public/gitcardbg.jpg';
import avatar_url from '../../public/spprofile.png';
import { FaCircle } from "react-icons/fa6";
import html2canvas from 'html2canvas';

export default function Home() {

    const [username, setUserName] = useState(null);
    const [error, setError] = useState(true);
    const [userData, setUserData] = useState({});
    
    const createCard = () =>{
      const api = `https://api.github.com/users/${username}`;
      fetch(api)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        console.log(data)
        if(error===false)setError(true);
      })
      .catch(error => {
        setError(false) 
        console.error('Error fetching data:', error)}
        );
    }

     const captureScreenshot = () => {
        const element = document.getElementById('targetDiv'); // Replace 'targetDiv' with the id of your div
        if (element) {
          html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'screenshot.png';
            link.click();
          });
        }
      };
      
  return (
    <div className='p-20  h-[100vh]'>
      <div className='flex  justify-center '>
        <div>
          <h2 className='text-2xl  text-black mb-3  text-center'>Github Profile Card</h2>
          <input defaultValue="spsujoy007" onChange={(e)=> setUserName(e.target.value)} className='px-4 py-3 border-2 border-black text-md w-[500px] outline-none rounded-md' type="text"  placeholder='user name' /> <br />
          {
            error === false && <p className='text-red-500 pl-2'>user name not found!</p>
          }

          <div className='flex justify-center'>
            <button onClick={createCard} className='mt-5 flex items-center rounded-md text-white gap-2 text-md uppercase bg-black px-4 py-2 hover:bg-gray-700 duration-200'><FaGithubAlt className='text-xl'></FaGithubAlt>  Create Card</button>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center mt-16'>
        {
          userData.login && 
          <div className='relative' id='targetDiv'>
            <Image src={bgimg} className='w-[600px] ' alt="" />
            <div className='absolute top-0 flex gap-5 pt-7 pr-3'>
              <Image src={userData?.avatar_url}
                  alt="User Avatar"
                  width={110}
                  height={110}
                  className='ml-7 rounded-full  w-[110px] h-[110px] border-4 borderl border-slate-100' />
              
              <div className=''>
                <div className='inline-block'>
                  <p className='text-xs  text-white bg-black font px-3 py-[2px] rounded-full tag'><RiAccountPinCircleFill /> <span className='-mt-[15px]'>{userData?.login}</span> </p>
                </div>
                <h2 className='text-2xl font-semibold text-black'>{userData?.name}</h2>
                {
                  userData?.bio?.length > 0 && <p className='mt-2'>{userData.bio.length > 80 ? <span className='mt-[15px]'> {userData?.bio.slice(0,80)+'...'}</span> :userData.bio}</p>
                }

                <div className='mt-20 flex space-x-1'>
                  
                  <p className=' text-white  flex rounded-sm overflow-hidden  '>
                    <span className='p-1  bg-white text-black '>Followers:</span> 
                    <span className='p-1  bg-black'>{userData.followers}</span>
                  </p>
                  <p className='text-white -mt-[60px] rounded-sm overflow-hidden block '>
                    <span className='p-3 bg-white text-black'>Following:</span> 
                    <span className='p-3 bg-black'>{userData.following}</span>
                  </p>
                  
                </div>
                <div className='bg-white border-l-4 w-[340px] border-black shadow-xl mt-3'>
                  <p className='text-black px-2 py-[5px]  '>Total Repos: <span className='text-black font-semibold'>{userData.public_repos}</span> </p>
                </div>

                <h1 className='text-3xl mt-10 uppercase flex gap-3 items-center'>let's Connect <FaGithubAlt className='text-4xl' /> </h1>
                <a className='text-sm mt-10'>{userData.html_url.split('https://')[1]}</a>

              </div>
            </div>
          </div>
        }
      </div>
      {
        userData.login && <div className='flex justify-center'>
        <button onClick={captureScreenshot} className='mt-5 flex items-center rounded-md text-white gap-2 text-md uppercase bg-black px-4 py-2 hover:bg-gray-700 duration-200'><FaGithubAlt className='text-xl'></FaGithubAlt>Download Card</button>

        {/* <Image src={image && image} width={400} height={300}/> */}
  </div>
      }
      
    </div>
  )
}
