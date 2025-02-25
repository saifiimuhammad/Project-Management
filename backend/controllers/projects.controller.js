import Project from "../models/projects.model.js";
import User from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description, date, team } = req.body;

    const task = await Project.create({
      title,
      description,
      date,
      team,
      createdBy: userId,
    });

    res
      .status(201)
      .json({ status: true, task, message: "Project created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    // Fetch tasks based on user role
    const allTasks = isAdmin
      ? await Project.find().sort({ _id: -1 })
      : await Project.find({ team: userId }).sort({ _id: -1 });

    const totalTasks = allTasks.length;
    const last10Tasks = allTasks.slice(0, 10);

    const summary = {
      totalTasks,
      last10Tasks,
    };

    res.status(200).json({
      status: true,
      message: "Dashboard statistics fetched successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { view } = req.query;

    let query = isAdmin ? {} : { team: userId };

    let queryResult = Project.find(query)
      .populate({
        path: "team",
        select: "name email",
      })
      .sort({ _id: -1 });

    if (view !== "true" && isAdmin) {
      queryResult = queryResult.select("-team"); // Exclude team if view is not true for admins
    }

    const tasks = await queryResult.lean(); // lean() for plain JS objects
    console.log("Fetched tasks:", JSON.stringify(tasks, null, 2));

    res.status(200).json({ status: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

// export const getTasks = async (req, res) => {
//     try {
//         // const tasks = await Project.find({}, "title budget date status");

//         const { view } = req.query;

//         let queryResult = Project.find();

//         if (view === "true") {
//             queryResult = queryResult.populate({
//                 path: "team",
//                 select: "name title email",
//             });
//         }

//         queryResult = queryResult.sort({ _id: -1 });

//         const tasks = await queryResult;
//         res.status(200).json({ status: true, tasks });
//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const view = req.query.view === "true";
    const { userId, isAdmin } = req.user;
    // const { view } = req.query;
    // const task = await Project.findById(id, "title description budget date status team");

    let query;
    if (isAdmin) {
      query = Project.findById(id);
    } else {
      // Only return the project if the user is in the team array.
      query = Project.findOne({ _id: id, team: userId });
    }

    // if (view) {
    //   query = query.populate({
    //     path: "team",
    //     select: "name email",
    //   });
    // }

    if (isAdmin ? view : true) {
      query = query.populate({
        path: "team",
        select: "name email",
      });
    }

    const task = await query;
    console.log("Fetched", task);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Project not found",
      });
    }

    res.status(200).json({ status: true, task });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// export const getTask = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const view = req.query.view === "true"; // Ensure boolean conversion

//         let query = Project.findById(id);

//         // Always populate team if view is true
//         if (view) {
//             query = query.populate("team", "name title role email");
//         }

//         const task = await query;

//         console.log("Fetched Task:", task);

//         if (!task) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Project not found",
//             });
//         }

//         res.status(200).json({ status: true, task });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: false, message: "Internal Server Error" });
//     }
// };

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, team } = req.body;

    // const task = await Project.findByIdAndUpdate(id, { title, budget, date, status }, { new: true });

    const task = await Project.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found." });
    }

    // Update fields only if provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (date) task.date = date;
    if (team) task.team = team;

    await task.save();

    // if (!task) {
    //     return res.status(404).json({ status: false, message: "Task not found" });
    // }

    res
      .status(200)
      .json({ status: true, task, message: "Project updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Project.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
