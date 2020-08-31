import React, { Component } from "react";
import "./App.css";
import ManagerTask from "./components/ManagerTask";
import SearchSortControl from "./components/SearchSortControl";
import ManagerTaskList from "./components/ManagerTaskList";
import demo from "./training/demo"
// import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false, //an form
      taskEditing: null,
      filter:{
        name:'',
        status: -1
      },
      keyword:'',
      sortBy:'name',
      sortVl: 1
    };
  }

  componentDidMount = () => {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  };
  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: "chơi game",
  //       status: true,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "học lập trình",
  //       status: false,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "ăn và ngủ",
  //       status: true,
  //     },

  //     {
  //       id: this.generateID(),
  //       name: "cày rank",
  //       status: true,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "cày reactjs và angular",
  //       status: false,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "cày phim",
  //       status: true,
  //     },
  //   ];
  //   this.setState({
  //       tasks: localStorage.setItem('tasks', JSON.stringify(tasks))
  //       // tasks: tasks
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks))
  // };
  //   viblo với anh nghiepuit
  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
    ////////////////////////////////////
  generateID = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4() +
      this.s4()
    );
  };
    /////////////////////////////////////
  onDisplayForm = () => { ///thêm task// 
    if(this.state.isDisplayForm && this.state.taskEditing !== null){
      console.log("1");
      
        this.setState({
          isDisplayForm: this.state.isDisplayForm,
          taskEditing: null
        });
    }else{
        this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  };
    /////////////////////////////////////
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };
    /////////////////////////////////////
  onSubmit=(data /*name, status*/)=>{
    // var task = {
    //   id: this.generateID(),
    //   name: data.name,
    //   status: data.status
    // }
    var{tasks} = this.state;
    if(data.id ===''){
      data.id =this.generateID();
      tasks.push(data)
    }else{
      var Index =tasks.findIndex((item,index)=>{
        return item.id === data.id
        
      })
      tasks[Index] =data;
    }
    
    this.setState({
      tasks: tasks,
      taskEditing:null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    // console.log(data);
    
  }
    /////////////////////////////////////
    onUpdateStatus =(id)=>{
      var {tasks} = this.state;
      var changeDisplayForm = tasks.map((item, index)=>{
        if(item.id === id){
          item.status =! item.status;
        }
        return item;
      })
      this.setState({
        tasks: changeDisplayForm
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    ////////////////////////////////////
    onDelete=(id)=>{
      var{tasks} = this.state
      var onDelete = tasks.filter((item,index)=>{
        return item.id !== id
      })
     
      this.setState({
        tasks:onDelete
      })
      localStorage.setItem('tasks', JSON.stringify(onDelete))
     
      
    }
    ///////////////
    // function onShowform sẽ hiển thị ra form managertask khi click vào nút sửa của hàm onUpdate
    // khi bấm nút sửa sẽ hiện lên managertask
    onShowForm=()=>{
      this.setState({
        isDisplayForm: true // mặc định không hiện managerForm ở state (this.state.isDisplayForm:false)
      })
    }
    onUpdate=(id)=>{
     var{tasks} =this.state;
     var Index =tasks.findIndex((item,index)=>{
       return item.id === id
        
     })
      this.setState({
        taskEditing: tasks[Index]
      })
      this.onShowForm()
    }
    onFilter=(filterName, filterStatus)=>{
      // console.log(filterName +'-'+ filterStatus);
      // console.log(typeof filterStatus);
      filterStatus = parseFloat(filterStatus)
      // console.log(typeof filterStatus);
      this.setState({
        filter:{
          name:filterName.toLowerCase(),
          status:filterStatus
        }
      })
    }
    onSearch =(keyword)=>{
       console.log(keyword);
      this.setState({
        keyword: keyword
      },()=>{console.log(this.state.keyword);
      })
      
    }
    onSort =(sortBy, sortVl)=>{
     
      this.setState({
        sortBy: sortBy,
        sortVl: sortVl
      })
      
    }
  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortVl } = this.state;
    if(filter){
     if(filter.name){
          tasks = tasks.filter((task,index)=>{
            return task.name.toLowerCase().indexOf(filter.name) !== -1;
            
          })
     }
     tasks = tasks.filter((task,index)=>{
      if(filter.status === -1){
          return task
      }else{
          return task.status === (filter.status === 1 ? true: false) 
      }
  })
    }
    if(keyword){
        tasks = tasks.filter((task,index)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;  
      })
      // console.log(tasks);
      // tasks = _.filter( tasks, (task)=>{
      //   return  task.name.toLowerCase().indexOf(keyword) !== -1
      // })
      //lodash labrary
    }
    
    
    
   if(sortBy === 'name'){
    tasks.sort((a,b)=>{
        if(a.name > b.name)   return sortVl   
        else if(a.name < b.name)  return -sortVl; 
        else return 0
      
    })
   }else{
    tasks.sort((a,b)=>{
      if(a.status > b.status)   return -sortVl   
      else if(a.status < b.status)  return sortVl; 
      else return 0
    
  })
   }
  // console.log(sortBy, '-', sortVl);
  
    var elementTaskForm = isDisplayForm ? (
      <ManagerTask 
       onSubmit={this.onSubmit} 
       onCloseForm={this.onCloseForm}  
       task={taskEditing}
       />
    ) : (
      ""
    );
    return (
      <div className="container ">
        <div className="text-center allBg">
          <h1 className="designTag imgReact">List Manager Work of Daily </h1>
          <span className="designTag2">
            with
            <span className="reactBG">
              <a href="https://reactjs.org/">
                {" "}
                React
                <i className="fab fa-react mgl-5"></i>
              </a>{" "}
            </span>
          </span>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* task form */}
            {/* <ManagerTask  /> */}
            {elementTaskForm}
          </div>
          <div
            className={
              isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onDisplayForm}
            >
              <span className="fa fa-plus mr-5"></span>ADD Task
            </button>
            {/* <button
              type="button"
              className="btn btn-secondary ml-5"
              onClick={this.onGenerateData}
            >
              <span className="fa fa-plus mr-5"></span>Tạo Dữ liệu
            </button> */}
            <div className="row mt-15">
              {/* SearchSortControl */}
              <SearchSortControl onSearch={this.onSearch} onSort = {this.onSort}/>
            </div>
            {/* task list */}
            <ManagerTaskList 
            tasks={tasks}  
            onUpdateStatus ={this.onUpdateStatus} 
            onDelete={this.onDelete} 
            onUpdate={this.onUpdate}
            onFilter={this.onFilter}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
