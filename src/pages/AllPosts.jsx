import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, LoadingPost, PostCard } from '../components/index'
function AllPosts() {
    const [posts , setPosts] = useState([])
    const [isLoading , setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        service.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
                setIsLoading(false)
            }
        })  
    },[])
    if(isLoading){
        return (
            <LoadingPost/>
        )
    }
  return (
    <div className='w-full py-8'> 
      <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    </div>
  )
}

export default AllPosts
