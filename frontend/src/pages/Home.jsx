import React, {useState, useEffect} from 'react';
import { Card, FormInput, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if(data?.length > 0){
    return (
        data.map((post) => <Card key={post._id} {...post} />)
      );
  }

  return (
    <h2 className='mt-5 font-bold text-primary text-xl uppercase'>{title}</h2>
  );
}

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5050/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if(response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    }
  
    fetchPosts();
  }, [])
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
  
        setSearchedResults(searchResults)
      }, 500)
    );
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-[#030B11] text-[32px]'>Community Showcase</h1>
        <p className='mt-2 font-medium text-[#303136] text-[16px] lg:max-w-[750px] max-w-[500px]'>Explore a captivating assortment of imaginative and visually breathtaking images created by AI.</p>
      </div>

      <div className='mt-10'>
        <FormInput 
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {Loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-semibold text-secondary text-xl mb-3'>Showing results for "<span>{searchText}</span>"</h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={searchedResults} title={'No search results found'} />
              ) : (
                <RenderCards data={allPosts} title={'No posts found'} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home