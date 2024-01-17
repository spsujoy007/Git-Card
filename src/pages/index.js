import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { FaGithubAlt } from "react-icons/fa";
import {createFileName, useScreenshot} from "use-react-screenshot";

export default function Home() {

  const [username, setUserName] = useState(null);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState({});

    console.log(username)
    const ref = createRef(null)
    const [image, takeScreenshot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
    });
    const download = (image, {name='mygithub', extension='jpg'} = {}) => {
        const a = document.createElement('a');
        a.href=image;
        a.download=createFileName(extension, name);
        a.click();
    }
    const downLoadScreenshot = ()=>{
        takeScreenshot(ref.current).then(download)
    }

    const createCard = () =>{
      const api = `https://api.github.com/users/${username}`;
      fetch(api)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        if(error===false)setError(true);
      })
      .catch(error => console.error('Error fetching data:', error));
    }

  return (
    <div className='p-20'>
      <div className='flex items-center justify-center min-h-[100vh]'>
        <div>
          <h2 className='text-2xl  text-black mb-3  text-center'>Github Profile Card</h2>
          <input onChange={(e)=> setUserName(e.target.value)} className='px-4 py-3 text-md w-[500px] outline-none rounded-md' type="text"  placeholder='user name' /> <br />
          {
            error === false && <p className='text-red-500 pl-2'>user name not found!</p>
          }

          <div className='flex justify-center'>
            <button onClick={createCard} className='mt-5 flex items-center rounded-md text-white gap-2 text-md uppercase bg-indigo-500 px-4 py-2 hover:bg-black duration-200'><FaGithubAlt className='text-xl'></FaGithubAlt>  Create Card</button>
          </div>
        </div>
      </div>

      <div>
        {
          userData && 
          <>
            <h2>{userData.login}</h2>
            <img src={userData.avatar_url} className='w-[100px]' alt="" />
          </>
        }
      </div>
    </div>
  )
}
