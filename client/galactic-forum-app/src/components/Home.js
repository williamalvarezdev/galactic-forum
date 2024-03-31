import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from './Nav';


const Home = () => {
    //Added list this way we can hold all the posts
    const [thread, setThread] = useState([]);

    const navigate = useNavigate();

    const [threadList, setThreadList] = useState([]);

    //Verification if use is authenticated, ensuring is protected
    useEffect(() => {
        const checkUser = () => {
            if(!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                console.log("Authenticated")
                fetch("http://localhost:4000/api/all/threads")
                    .then((res) => res.json())
                    .then((data) => setThreadList(data.threads))
                    .catch((err) => console.error(err))
            }
        };
        checkUser();
    }, [navigate]);

    //retrievs all the post available within app and saves into threadlist datastructure
    const createThread = () => {
        fetch("http://localhost:4000/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.message);
                setThreadList(data.threads);
            })
            .catch(err => console.error(err));
    };

     //Triggered here, from form
     const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        //calls the function
        createThread();
        setThread("");
    };
 


    return (
        <>
        <Nav />
        <main className="home">
            <h2 className="homeTitle">Crate a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className="home__container">
                        <label htmlFor="thread">Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>Create Thread</button>
                </form>
                
                
                <div className='thread__container'>
                    {threadList.map((thread) => (
                    <div className = 'thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        <div className='react_container'>
                        <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                        <Comments
                            numberOfComments={thread.replies.length}
                            threadId={thread.id}
                            title={thread.title}
                            />
                        </div>
                    </div>
                    ))}
                </div>
        </main>
        </>
    );
}

export default Home;