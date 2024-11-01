import "./listFriend.scss";
import { useQuery } from '@tanstack/react-query';
import { apiConfig } from "../../API/apiConfigs";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const ListFriend = ({ userId }) => { 
  const { currentUser } = useContext(AuthContext);
  const queriedUserId = userId || currentUser?.id;  

  const { isLoading: fIsLoading, error: fError, data: friends } = useQuery({
    queryKey: ['friends', queriedUserId],
    queryFn: async () => {
      try {
        const res = await apiConfig.get("/v1/friends?userId=" + queriedUserId);
        console.log("Queried User ID:", queriedUserId);
        return res.data;
      } catch (err) {
        console.error("Error fetching friends:", err);
        throw new Error("Failed to fetch friends."); 
      }
    },
    enabled: !!queriedUserId  
  });

  return (
    <div className="listFriend">
      <div className="container">
        <div className="yourFriends">
          <span className="menuFriend">Friends</span>
          <hr />
          {fIsLoading ? (
            "Loading..."
          ) : fError ? (
            <div>Error loading friends: {fError.message}</div>
          ) : (friends && Array.isArray(friends)) ? (
            friends.map(friend => (             
                <div className="friend">
                  <div className="friendInfo">
                    <img
                      src={friend.profilePicture ? "/upload/" + friend.profilePicture : "/upload/user.png"}
                      alt=""
                    />
                    <div />
                    <span className="friendName">{friend.name}</span>
                  </div>
                </div>             
            ))
          ) : (
            <div>No friends found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListFriend;
