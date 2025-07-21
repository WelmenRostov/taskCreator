import {useState} from "react";
import PostItemEditor from "./PostItemEditor";
import type {Post} from "../../types/types";
import MyButton from "../UI/button/MyButton";


interface Props extends Post {
    index: number,
    removePost: (id: number) => void
    updatePost: (id: number, updatedPost: Post) => void;
    updateStatus: (id: number, updatedPost: Post) => void;
}

export const PostItem = (props: Props) => {

    const {id, data, text, title, index, removePost, status, updatePost, updateStatus} = props
    const [editableTitle, setEditableTitle] = useState(title);
    const [editableText, setEditableText] = useState(text);
    console.log('editableTitle', editableTitle)

    const changeStatus = () => {
        const updatedPost: Post = {
            id,
            title,
            text,
            data,
            status: 'editor'
        };
        updateStatus(id, updatedPost);
    }
    const handleSave = () => {

        const updatedPost: Post = {
            id,
            title: editableTitle,
            text: editableText,
            data,
            status: 'pending',
        };
        console.log('update', updatedPost)

        updatePost(id, updatedPost);
    };

    return (
        status == 'editor' ? (
            <PostItemEditor handleSave={handleSave} setEditableText={setEditableText} setEditableTitle={setEditableTitle} editableTitle={editableTitle} editableText={editableText} {...props}/>
        ) : (
            <form key={id}
                 className={'bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw]  mb-5 p-5 outline-black/5 dark:bg-gray-800 bg-opacity-10 overflow-hidden resize-none'}>
                <h1 className={'break-words'}>{index + 1}. {title}
                </h1>
                <p className={'min-h-[50px] w-full pt-2 rounded-[1vw] focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto resize-none flex-grow break-words'}>{text}
                </p>
                <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1 '}>
                    <MyButton className={'m-2 col-end-3 row'} onClick={changeStatus}>Изменить</MyButton>
                    <MyButton className={'m-2 col-end-4 row-end-1'} onClick={() => removePost(id)}>Удалить</MyButton>
                    <p className={'mr-2 col-end-4 row-end-3'}>{data.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }) + ' ' + data.toDateString()}</p>
                </div>
            </form>
        )
    )
}