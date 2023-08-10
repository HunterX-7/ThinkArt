import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { FormInput, Loader } from '../components';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:5050/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please create an image with the correct details.')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImg = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:5050/api/v1/think', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: form.prompt 
          }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a search prompt')
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-[#030B11] text-[32px]'>Create</h1>
        <p className='mt-2 font-medium text-[#303136] text-[16px] lg:max-w-[750px] max-w-[500px]'>Create imaginative and visually breathtaking images through AI and share them with the community.</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormInput labelName='Your name' type='text' name='name' placeholder='John Smith' value={form.name} handleChange={handleChange} />
          <FormInput labelName='Search Prompt' type='text' name='prompt' placeholder='An oil painting of a serene forest with glowing fireflies' value={form.prompt} handleChange={handleChange} isSurpriseMe handleSurpriseMe={handleSurpriseMe} />
          <div 
            className='relative bg-terciary border border-gray-300 text-primary text-sm rounded-lg 
            focus:ring-[#303136] focus:border-[#303136] w-64 p-3 h-64 flex justify-center'
          >
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt="Preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button 
            type='button' 
            onClick={generateImg}
            className='font-medium bg-[#030B11] text-white w-full sm:w-auto px-5 py-2.5 rounded-[8px] hover:bg-[#303136]' 
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-secondary text-[14px]'>
            After creating an image, you have the option to share it with other members of the community.
          </p>
          <button 
            type='submit' 
            className='mt-3 font-medium bg-[#030B11] text-sm w-full sm:w-auto text-white px-5 py-2.5 rounded-[8px] hover:bg-[#303136]'
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost