import React, { useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFilterForm from './components/PostFilterForm';
import Clock from './components/Clock';

function App() {
    /*const [todoList, setTodoList] = useState([
        { id: 1, title: 'Easy Toeic' },
        { id: 2, title: 'Easy Aptis' }
    ]);

    function handleTodoClick(todo) {
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return;

        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    function handleTodoForm(formValue) {
        const newTodo = {
            id: todoList.length + 1,
            ...formValue
        }
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }*/

    const [postList, setPostList] = useState([]);

    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1
    });

    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: ''
    });

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination);
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchPostList();
    }, [filters]);

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            _page: newPage
        });
    };

    function handleFilterChange(newFilters) {
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm
        });
    }

    return (
        <div className="app">
            <h1>React hooks</h1>
            <Clock />
            <PostFilterForm onSubmit={handleFilterChange} />
            <PostList posts={postList} /><br />
            <Pagination pagination={pagination}
                onPageChange={handlePageChange} />
            {/*<TodoForm onSubmit={handleTodoForm} />
            <TodoList todos={todoList} onTodoClick={handleTodoClick} />*/}
        </div>
    )
}

export default App;