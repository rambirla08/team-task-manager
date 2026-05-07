import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {

        fetchProjects();
        fetchTasks();

    }, []);

    const fetchProjects = async () => {

        try {

            const res = await API.get('/projects');

            setProjects(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const fetchTasks = async () => {

        try {

            const res = await API.get('/tasks');

            setTasks(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const createProject = async () => {

        try {

            await API.post('/projects/create', {
                name: projectName,
                description: projectDescription
            });

            toast.success('Project Created');

            setProjectName('');
            setProjectDescription('');

            fetchProjects();

        } catch (err) {

            console.log(err);

        }

    };

    const createTask = async () => {

        try {

            await API.post('/tasks/create', {
                title: taskTitle,
                description: taskDescription,
                project: selectedProject
            });

            toast.success('Task Created');

            setTaskTitle('');
            setTaskDescription('');
            setSelectedProject('');

            fetchTasks();

        } catch (err) {

            console.log(err);

        }

    };

    const updateTask = async (id) => {

        try {

            await API.put(`/tasks/update/${id}`, {
                status: 'Completed'
            });

            fetchTasks();

        } catch (err) {

            console.log(err);

        }

    };

    const deleteTask = async (id) => {

        try {

            await API.delete(`/tasks/delete/${id}`);

            toast.success('Task Deleted');

            fetchTasks();

        } catch (err) {

            console.log(err);

        }

    };

    const logout = () => {

        localStorage.removeItem('token');

        window.location.href = '/';

    };

    return (

        <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-10">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-5xl font-extrabold text-gray-800">
                        Team Task Manager
                    </h1>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-2xl shadow-lg"
                    >
                        Logout
                    </button>

                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">

  <div className="bg-blue-500 text-white p-3 rounded-xl shadow">

    <h2 className="text-sm font-semibold">
      Projects
    </h2>

    <p className="text-2xl mt-1 font-bold">
      {projects.length}
    </p>

  </div>

  <div className="bg-green-500 text-white p-3 rounded-xl shadow">

    <h2 className="text-sm font-semibold">
      Tasks
    </h2>

    <p className="text-2xl mt-1 font-bold">
      {tasks.length}
    </p>

  </div>

  <div className="bg-purple-500 text-white p-3 rounded-xl shadow">

    <h2 className="text-sm font-semibold">
      Completed
    </h2>

    <p className="text-2xl mt-1 font-bold">
      {
        tasks.filter(
          (task) => task.status === 'Completed'
        ).length
      }
    </p>

  </div>

</div>

                 <div className="grid md:grid-cols-3 gap-6 mb-10">


                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">

                    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-3xl font-bold mb-6 text-blue-700">
                            Create Project
                        </h2>

                        <input
                            type="text"
                            placeholder="Project Name"
                            value={projectName}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 mb-5 outline-none focus:ring-4 focus:ring-blue-300"
                            onChange={(e) => setProjectName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Project Description"
                            value={projectDescription}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 mb-5 outline-none focus:ring-4 focus:ring-blue-300"
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />

                        <button
                            onClick={createProject}
                            className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl shadow-lg"
                        >
                            Create Project
                        </button>

                    </div>

                    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-3xl font-bold mb-6 text-green-700">
                            Create Task
                        </h2>

                        <input
                            type="text"
                            placeholder="Task Title"
                            value={taskTitle}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 mb-5 outline-none focus:ring-4 focus:ring-green-300"
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Task Description"
                            value={taskDescription}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 mb-5 outline-none focus:ring-4 focus:ring-green-300"
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />

                        <select
                            value={selectedProject}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 mb-5 outline-none focus:ring-4 focus:ring-green-300"
                            onChange={(e) => setSelectedProject(e.target.value)}
                        >

                            <option value="">
                                Select Project
                            </option>

                            {
                                projects.map((project) => (

                                    <option
                                        key={project._id}
                                        value={project._id}
                                    >
                                        {project.name}
                                    </option>

                                ))
                            }

                        </select>

                        <button
                            onClick={createTask}
                            className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-2xl shadow-lg"
                        >
                            Create Task
                        </button>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-3xl font-bold mb-6 text-purple-700">
                            Projects
                        </h2>

                        {
                            projects.map((project) => (

                                <div
                                    key={project._id}
                                    className="bg-white p-5 rounded-2xl shadow mb-4 hover:scale-105 transition"
                                >

                                    <p className="text-xl font-bold text-gray-800">
                                        {project.name}
                                    </p>

                                    <p className="text-gray-500 mt-2">
                                        {project.description}
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-3xl font-bold mb-6 text-pink-700">
                            Tasks
                        </h2>

                        {
                            tasks.map((task) => (

                                <div
                                    key={task._id}
                                    className="bg-white p-5 rounded-2xl shadow mb-4 hover:scale-105 transition"
                                >

                                    <p className="text-xl font-bold text-gray-800">
                                        {task.title}
                                    </p>

                                    <p className="text-gray-500 mt-2 mb-4">
                                        Status: {task.status}
                                    </p>

                                    <button
                                        onClick={() => updateTask(task._id)}
                                        className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2 rounded-xl"
                                    >
                                        Mark Completed
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl ml-3"
                                    >
                                        Delete
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;