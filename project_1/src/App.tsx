import React, {useState} from 'react';
import Navigation from "./components/Navigation.tsx";
import TaskForm from "./components/TaskForm.tsx";
import PostList from "./components/PostList.tsx";
import type {Post} from "./types/types.tsx";


export const App: React.FC = () => {
    const [modal, setModal] = useState(false)

    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            count: 1,
            title: "Проснуться",
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error est eveniet facere facilis hic magni nesciunt omnis praesentium quaerat ut!',
            data: new Date(),
            status: 'pending'
        },
        {
            id: 2,
            count: 2,
            title: "Поесть",
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, beatae commodi consectetur consequatur corporis cumque dignissimos distinctio dolores dolorum eligendi hic illo inventore minima minus necessitatibus nisi nobis perferendis quaerat recusandae, rerum temporibus, ut vel veniam. A.',
            data: new Date(),
            status: 'pending'
        },
        {
            id: 3,
            count: 3,
            title: "Поспать",
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi debitis explicabo facilis fugit illo maiores perferendis, quas tempore. Excepturi iure iusto modi mollitia nihil, nobis obcaecati odio quasi sed tenetur! Itaque, maxime sunt! Asperiores impedit ipsa nemo quo! Amet aspernatur consectetur deserunt dolores facilis iusto natus, nihil nisi, nobis quibusdam recusandae rem repellat voluptas? Assumenda exercitationem quidem sit veniam voluptatem!',
            data: new Date(),
            status: 'pending'
        },
        {
            id: 4,
            count: 4,
            title: "Авто",
            text: 'Бетта',
            data: new Date(),
            status: 'pending'
        },
        {
            id: 5,
            count: 5,
            title: "Гамма",
            text: 'Артоз',
            data: new Date(),
            status: 'pending'
        },

    ]);

    const handleAddPost = (post: Post) => {
        setPosts((prev) => {
            return [...prev, post]
        })
        setModal(false)
    }

    const removePost = (id: number) => {
        setPosts(posts.filter(p => p.id !== id));
    };


    return (
        <>
            <Navigation setVisible={setModal}/>
            <PostList posts={posts} removePost={removePost}/>
            <TaskForm handleAddPost={handleAddPost} modal={modal} setModal={setModal}/>
        </>
    );
};