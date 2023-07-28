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
  const [searchText, setSearchText] = useState('')

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-[#030B11] text-[32px]'>Community Showcase</h1>
        <p className='mt-2 font-medium text-[#303136] text-[16px] lg:max-w-[750px] max-w-[500px]'>Explore a captivating assortment of imaginative and visually breathtaking images created by AI.</p>
      </div>

      <div className='mt-16'>
        <FormInput />
      </div>

      <div className='mt-10'>
        {Loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-semibold text-secondary text-xl mb-3'>Showing results for <span>{searchText}</span></h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={[]} title={'No search results found'} />
              ) : (
                <RenderCards data={[]} title={'No posts found'} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home