import React, { useState } from 'react'
import Header from '../../Header';
import { Button } from '@mui/material';

const Blog = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submittedData, setSubmittedData] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault(); 
        setSubmittedData({ title, description });
        setTitle('');
    setDescription('');
      };
  return (
    <>
        <Header/>
        <div className='p-5'>
            <div>
                <h3 className='font-bold text-4xl mb-4 block'>Create Blog</h3>
            </div>
            <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input 
                        className='bg-gray-100 border border-gray-200 rounded-md p-2' 
                        name=''
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        placeholder='Blog title' 
                    />
                </div>
                <div className='mb-4'>
                    <textarea 
                        className='bg-gray-100 border border-gray-200 rounded-md p-2' 
                        name="" 
                        id="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Blog Desc...'
                    />
                </div>
                <Button type='submit' variant='outlined' color='primary'>Add Blog</Button>
            </form>

            {submittedData && (
                <div>
                    <h2>Submitted Content:</h2>
                    <h3>{submittedData.title}</h3>
                    <p>{submittedData.description}</p>
                </div>
            )}
            </div>
        </div>
    </>
  )
}
export default Blog;