import "./rightBar.scss";
import { useQuery } from '@tanstack/react-query';
import { apiConfig } from "../../API/apiConfigs";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading: fIsLoading, error: fError, data: friends } = useQuery({
    
    queryKey: ['friends'],
    queryFn: async () => {
      try {
        const res = await apiConfig.get("/v1/unfriends?userId=" + currentUser.id);
        console.log("Current User ID:", currentUser?.id);

        return res.data;
      } catch (err) {
        console.error("Error fetching friends:", err);
        
        throw new Error("Failed to fetch friends."); 
      }
    }
  });

  return (
    <div className="rightBar">
      <div className="container">
        <div className="yourFriends">
          <span className="menuFriend">Suggestions</span>
         <hr />
          {fIsLoading ? (
            "Loading..."
          ) : fError ? (
            <div>Error loading friends: {fError.message}</div>
          ) : (friends && Array.isArray(friends)) ? (
            friends.map(friend => (
              <Link to={'/profile/' + friend.userId} style={{ textDecoration: "none" }} key={friend.userId}>
                <div className="friend">
                  <div className="friendInfo">
                    <img
                      src={friend.profilePicture ? "/upload/" + friend.profilePicture : "/upload/user.png"}
                      alt=""
                    />
                    <div  />
                    <span className="friendName">{friend.name}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>No friends found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
