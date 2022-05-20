import axios from "axios";
import { updateUsers, updateFollowing, addUser } from "../redux";
import { toast } from "react-toastify";

const fetchUsers = async (dispatcher) => {
  try {
    const response = await axios.get("/api/users");
    dispatcher(updateUsers(response.data.users));
  } catch (error) {
    console.log(error);
  }
};

const fetchUserById = async (userId, dispatcher) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    dispatcher(response.data.user);
  } catch (error) {
    console.log(error);
  }
};

const editUserDetails = async (userData, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/users/edit",
      headers: { authorization: token },
      data: { userData },
    });
    dispatcher(addUser(response.data.user));
    return "SUCCESS";
  } catch (e) {
    console.log(e);
    toast.error("Facing just a little bit of an issue");
    return "FAILED";
  }
};
const followUser = async (followUserId, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/users/follow/${followUserId}`,
      headers: { authorization: token },
    });
    dispatcher(updateFollowing(response.data.following));
  } catch (error) {
    console.log(error);
    toast.error("Facing just a little bit of an issue!");
  }
};

// This API call is responsible for unfollow action by the user
const unfollowUser = async (followUserId, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/users/unfollow/${followUserId}`,
      headers: { authorization: token },
    });
    dispatcher(updateFollowing(response.data.following));
  } catch (error) {
    console.log(error);
    toast.error("Dave, our server, isn't that great!");
  }
};

export { fetchUsers, fetchUserById, followUser, unfollowUser, editUserDetails };
