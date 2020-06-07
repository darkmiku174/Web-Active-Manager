import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm'
import Control from './Components/Control'
import TaskList from './Components/TaskList'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditor: null
        };
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')){
            this.setState({
            tasks : JSON.parse(localStorage.getItem('tasks'))
            });
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
        });
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
            taskEditor : null
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        if (data.id === ""){
            //Insert Item
            var randomstring = require("randomstring");
            data.id = randomstring.generate();
            tasks.push(data);
        }else{
            //Update item
            var index = this.findIndex(data.id);
            if(index !== -1){
                tasks[index]=data; 
            };
        }
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));

        };
    }

    onDelete = (id) => {
        var { tasks, isDisplayForm } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.pop(tasks[index]);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };
        if(isDisplayForm){
            this.onCloseForm();
        }
    }

    onUpdateItem = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            var taskEditor = tasks[index];
            this.setState({
                taskEditor : taskEditor
            });
        };
        this.onCloseForm();
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id){
                result=index;
            };
        });
        return result;
    }

    render() {
        var { tasks, isDisplayForm, taskEditor } = this.state;
        var displayForm = isDisplayForm ? <TaskForm 
                                                    onSubmit={ this.onSubmit }
                                                    onCloseForm = { this.onCloseForm } 
                                                    taskEditor = { taskEditor }/> : '';
        return (
            <div className="container" onLoad={ this.onGenerateData }>
                <div className="text-center">
                    <h1 id="tittle">Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
                        { displayForm }
                    </div>
                    <div className= { isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                        <button type="button" className="btn btn-primary" onClick={ this.onToggleForm }>
                            <span className="fa fa-plus mr-5" />
                            Thêm Công Việc
                        </button>
                        <Control />
                        <TaskList 
                                tasks = {tasks}
                                onUpdateStatus = { this.onUpdateStatus } 
                                onDelete = { this.onDelete }
                                onUpdateItem = { this.onUpdateItem } />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
