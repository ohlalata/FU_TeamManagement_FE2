import axios from "axios";

export const getCourse = async () => {
  try {
    const studentId = localStorage.getItem("stuId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/${studentId}/Active-for-student`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          studentId: studentId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentCourse = async () => {
  try {
    const studentId = localStorage.getItem("stuId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/${studentId}/list-course`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          studentId: studentId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTeam = async () => {
  try {
    const studentId = localStorage.getItem("stuId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Student/${studentId}/list-team`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          studentId: studentId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInfoTeam = async (teamId) => {
  try {
    //const teamId = localStorage.getItem("teamId");
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Team/${teamId}/Details`,
      {
        headers: {
          //Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          teamId: teamId,
        },
      }
    );
    //return response.data;
    let data = response.data;
    if (Array.isArray(data)) {
      // rawData is an array
      return data;
    } else {
      // rawData is not an array, wrap it in an array
      return [data];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMember = async (teamId) => {
  try {
    const response = await axios.get(
      `https://befuprojectteammanagementdemo.azurewebsites.net/api/Team/${teamId}/Details`,
      {
        headers: {
          //Authorization: `Bearer ${localStorage.getItem("stntoken")}`,
          teamId: teamId,
        },
      }
    );
    //return response.data;
    let data = response.data.students;
    if (Array.isArray(data)) {
      // rawData is an array
      return data;
    } else {
      // rawData is not an array, wrap it in an array
      return [data];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
