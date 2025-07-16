import MyButton from "./UI/button/MyButton.tsx";
import type {Post} from "../types/types.tsx";
import MyTextarea from "./UI/textarear/MyTextarea.tsx";
import React, {useState} from "react";


interface Props extends Post {
    index: number,
    removePost: (id: number) => void
    updatePost: (id: number, updatedPost: Post) => void;
    updateStatus: (id: number, updatedPost: Post) => void;
}

export const PostItem = ({id, data, text, title, index, removePost, status, updatePost, updateStatus}: Props) => {
    const [editableTitle, setEditableTitle] = useState(title);
    const [editableText, setEditableText] = useState(text);

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
        // Создаем обновленный объект поста
        const updatedPost: Post = {
            id,
            title: editableTitle,
            text: editableText,
            data,
            status: 'pending',
        };

        // Вызываем функцию для обновления поста
        updatePost(id, updatedPost);
    };

    return (
        status == 'editor' ? (
            <div>
                <div key={id}
                     className={'bg-indigo-500 shadow-lg shadow-orange-400/50 border-2 border-orange-400 rounded-[1vw]  mb-5 p-5 outline-black/5 dark:bg-gray-800 bg-opacity-10 overflow-hidden resize-none'}>
                    <h1 className={'flex'}>{index + 1}.
                        <MyTextarea
                            name="title"
                            type="text"
                            scroll="editor"
                            className="text-gray-300 mb-2 h-auto w-full ml-[15px] border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
                            text={editableTitle}
                            value={editableTitle}
                            onChange={(e) => setEditableTitle(e.target.value)}
                        />
                    </h1>
                    <MyTextarea
                        text={editableText} // Используем локальное состояние
                        size='base'
                        className="border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
                        value={editableText} // Используем локальное состояние
                        onChange={(e) => setEditableText(e.target.value)} // Обновляем локальное состояние
                    />
                    <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1'}>
                        <MyButton className={'m-2 col-end-3 row'} onClick={handleSave}>Сохранить</MyButton>
                        <MyButton className={'m-2 col-end-4 row-end-1'}
                                  onClick={() => removePost(id)}>Отмена</MyButton>
                        <p className={'mr-2 col-end-4 row-end-3'}>{data.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        }) + ' ' + data.toDateString()}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div key={id}
                 className={'bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw]  mb-5 p-5 outline-black/5 dark:bg-gray-800 bg-opacity-10 overflow-hidden resize-none'}>
                <h1>{index + 1}. {" "}
                    {status == 'editor' ? (
                        <input
                            type="text"
                            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        title
                    )}
                </h1>
                <p className={'min-h-[50px] w-full pt-2 rounded-[1vw] focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto resize-none flex-grow break-words'}>{text}
                </p>
                <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1 '}>
                    <MyButton className={'m-2 col-end-3 row'} onClick={() => changeStatus}>Изменить</MyButton>
                    <MyButton className={'m-2 col-end-4 row-end-1'} onClick={() => removePost(id)}>Удалить</MyButton>
                    <p className={'mr-2 col-end-4 row-end-3'}>{data.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }) + ' ' + data.toDateString()}</p>
                </div>
            </div>
        )
    )
}